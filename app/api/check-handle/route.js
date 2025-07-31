import { NextResponse } from "next/server";
import { connect } from "@/utils/db";
import User from "@/model/User";

export async function GET(request) {
  try {
    // Get the handle from URL search params
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get('handle');

    // Validate if handle is provided
    if (!handle) {
      return NextResponse.json(
        { error: "Handle parameter is required" }, 
        { status: 400 }
      );
    }

    // Validate handle format (same as your setHandle schema)
    const handleRegex = /^[a-z0-9_]{3,20}$/;
    if (!handleRegex.test(handle)) {
      return NextResponse.json(
        { 
          available: false, 
          error: "Invalid handle format. Must be 3-20 characters with only letters, numbers, and underscores" 
        }, 
        { status: 400 }
      );
    }

    // Connect to database
    await connect();
    
    // Check if handle already exists
    const existingUser = await User.findOne({ handle: handle });
    
    // Return availability status
    return NextResponse.json({
      available: !existingUser, // true if no user found, false if user exists
      handle: handle
    });

  } catch (error) {
    console.error("Error checking handle availability:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}