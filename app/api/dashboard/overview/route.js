// app/api/dashboard/overview/route.js
import { connectDB } from "@/utils/database";
import UserDetails from "@/models/UserDetails";
import { TEvent, NTEvent } from "@/models/EventDetails";
import { Workshop } from "@/models/WorkshopDetails";
import Transaction from "@/models/Transaction";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    // Get total users count
    const totalUsers = await UserDetails.countDocuments();

    // Get registered users (users who have registered for at least one event or workshop)
    const usersRegistered = await UserDetails.countDocuments({
      $or: [
        { teventsRegistered: { $gt: 0 } },
        { nteventsRegistered: { $gt: 0 } },
        { workshopsRegistered: { $gt: 0 } },
      ],
    });

    // Get successful transactions count for technical events
    const technicalEvents = await Transaction.countDocuments({
      status: "success",
      eventId: { $gte: 300, $lt: 400 },
    });

    // Get successful transactions count for non-technical events
    const nonTechnicalEvents = await Transaction.countDocuments({
      status: "success",
      eventId: { $gte: 400, $lt: 500 },
    });

    // Get successful transactions count for workshops
    const workshops = await Transaction.countDocuments({
      status: "success",
      eventId: { $gte: 200, $lt: 300 },
    });

    return NextResponse.json({
      totalUsers,
      usersRegistered,
      technicalEvents,
      nonTechnicalEvents,
      workshops,
    });
  } catch (error) {
    console.error("Error fetching overview data:", error);
    return NextResponse.json(
      { message: "Error fetching overview data" },
      { status: 500 }
    );
  }
}
