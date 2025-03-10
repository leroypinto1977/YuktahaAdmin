// app/api/dashboard/department/route.js
import { connectDB } from "@/utils/database";
import UserDetails from "@/models/UserDetails";
import { TEvent, NTEvent } from "@/models/EventDetails";
import Workshop from "@/models/WorkshopDetails";
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

    // Get total students count for the department
    const students = await UserDetails.countDocuments({ department: dept });

    // Get users from the department who registered for technical events
    const technicalRegistrations = await UserDetails.countDocuments({
      department: dept,
      teventsRegistered: { $gt: 0 },
    });

    // Get users from the department who registered for non-technical events
    const nonTechnicalRegistrations = await UserDetails.countDocuments({
      department: dept,
      nteventsRegistered: { $gt: 0 },
    });

    // Get users from the department who registered for workshops
    const workshopRegistrations = await UserDetails.countDocuments({
      department: dept,
      workshopsRegistered: { $gt: 0 },
    });

    // Get event distribution data for the department
    // First get all users from this department with their event registrations
    const departmentUsers = await UserDetails.find({ department: dept });

    // Extract yuktahaIds for these users
    const userIds = departmentUsers.map((user) => user.yuktahaId);

    // Get successful transactions for these users
    const transactions = await Transaction.find({
      yuktahaId: { $in: userIds },
      status: "success",
    });

    // Get all event and workshop IDs from successful transactions
    const eventIds = transactions.map((t) => t.eventId);

    // Categorize by event type and fetch counts
    const techEvents = await TEvent.find({
      eventid: { $in: eventIds.map((id) => parseInt(id)) },
    });
    const nonTechEvents = await NTEvent.find({
      eventid: { $in: eventIds.map((id) => parseInt(id)) },
    });
    const workshopEvents = await Workshop.find({
      workshopid: { $in: eventIds.map((id) => parseInt(id)) },
    });

    // Create event distribution data
    const eventDistribution = [];

    // Group technical events
    const techEventCounts = techEvents.reduce((acc, event) => {
      if (!acc[event.name]) acc[event.name] = 0;
      acc[event.name]++;
      return acc;
    }, {});

    // Group non-technical events
    const nonTechEventCounts = nonTechEvents.reduce((acc, event) => {
      if (!acc[event.name]) acc[event.name] = 0;
      acc[event.name]++;
      return acc;
    }, {});

    // Group workshops
    const workshopCounts = workshopEvents.reduce((acc, workshop) => {
      if (!acc[workshop.name]) acc[workshop.name] = 0;
      acc[workshop.name]++;
      return acc;
    }, {});

    // Add to event distribution
    Object.keys(techEventCounts).forEach((name) => {
      eventDistribution.push({ name, count: techEventCounts[name] });
    });

    Object.keys(nonTechEventCounts).forEach((name) => {
      eventDistribution.push({ name, count: nonTechEventCounts[name] });
    });

    Object.keys(workshopCounts).forEach((name) => {
      eventDistribution.push({ name, count: workshopCounts[name] });
    });

    return NextResponse.json({
      students,
      technicalRegistrations,
      nonTechnicalRegistrations,
      workshopRegistrations,
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
