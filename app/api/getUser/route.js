// app/api/getUser/route.js
import { connectToDatabase } from "@/lib/mongodb";
import UserDetails from "@/models/UserDetails";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectToDatabase();

    // const API_KEY = process.env.API_KEY; // Store API key in environment variable

    // const apiKey = req.headers.get("x-api-key");

    // // Validate API key
    // if (!apiKey || apiKey !== process.env.API_KEY) {
    //   return Response.json(
    //     { success: false, error: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }

    // Get email from the URL using searchParams
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await UserDetails.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
