// app/api/dashboard/department-optimized/route.js
import { connectDB } from "@/utils/database";
import UserDetails from "@/models/UserDetails";
import { TEvent, NTEvent } from "@/models/EventDetails";
import Workshop from "@/models/Workshop";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dept = searchParams.get("dept");

  if (!dept) {
    return NextResponse.json(
      { message: "Department is required" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    // Get department statistics with single aggregation query
    const departmentStats = await UserDetails.aggregate([
      { $match: { department: dept } },
      {
        $group: {
          _id: null,
          students: { $sum: 1 },
          technicalRegistrations: {
            $sum: {
              $cond: [{ $gt: ["$teventsRegistered", 0] }, 1, 0],
            },
          },
          nonTechnicalRegistrations: {
            $sum: {
              $cond: [{ $gt: ["$nteventsRegistered", 0] }, 1, 0],
            },
          },
          workshopRegistrations: {
            $sum: {
              $cond: [{ $gt: ["$workshopsRegistered", 0] }, 1, 0],
            },
          },
          yuktahaIds: { $push: "$yuktahaId" },
        },
      },
    ]);

    const stats = departmentStats[0] || {
      students: 0,
      technicalRegistrations: 0,
      nonTechnicalRegistrations: 0,
      workshopRegistrations: 0,
      yuktahaIds: [],
    };

    // Get event distribution data
    const eventDistribution = [];

    if (stats.yuktahaIds && stats.yuktahaIds.length > 0) {
      // Get successful transactions for these users
      const transactions = await Transaction.find({
        yuktahaId: { $in: stats.yuktahaIds },
        status: "success",
      });

      // Create a map of event types
      const eventCounts = {};

      // Process all transactions to count event occurrences
      for (const transaction of transactions) {
        const eventId = parseInt(transaction.eventId);
        let eventName = "";

        // Determine event type by ID range and fetch the name
        if (eventId >= 200 && eventId < 300) {
          // Workshop
          const workshop = await Workshop.findOne({ workshopid: eventId });
          if (workshop) eventName = workshop.name;
        } else if (eventId >= 300 && eventId < 400) {
          // Technical event
          const techEvent = await TEvent.findOne({ eventid: eventId });
          if (techEvent) eventName = techEvent.name;
        } else if (eventId >= 400 && eventId < 500) {
          // Non-technical event
          const nonTechEvent = await NTEvent.findOne({ eventid: eventId });
          if (nonTechEvent) eventName = nonTechEvent.name;
        }

        if (eventName) {
          if (!eventCounts[eventName]) eventCounts[eventName] = 0;
          eventCounts[eventName]++;
        }
      }

      // Convert counts to required format
      Object.keys(eventCounts).forEach((name) => {
        eventDistribution.push({ name, count: eventCounts[name] });
      });
    }

    // Remove yuktahaIds from response to reduce payload size
    delete stats.yuktahaIds;

    return NextResponse.json({
      ...stats,
      eventDistribution,
    });
  } catch (error) {
    console.error(`Error fetching data for department ${dept}:`, error);
    return NextResponse.json(
      { message: `Error fetching data for department ${dept}` },
      { status: 500 }
    );
  }
}
