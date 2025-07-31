
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connect } from "@/utils/db";
import User from "@/model/User";

// You need to import your authOptions from your NextAuth config
// Adjust the path based on your project structure
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
  try {
    // Step 1: Get the authenticated user's session
    const session = await getServerSession(authOptions);
    
    // Step 2: Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized - Please login first" }, 
        { status: 401 }
      );
    }

    // Step 3: Parse the request body
    const body = await request.json();
    const { handle } = body;

    // Step 4: Validate the handle
    if (!handle) {
      return NextResponse.json(
        { error: "Handle is required" }, 
        { status: 400 }
      );
    }

    // Validate handle format (3-20 characters, alphanumeric + underscore)
    const handleRegex = /^[a-z0-9_]{3,20}$/;
    if (!handleRegex.test(handle)) {
      return NextResponse.json(
        { error: "Handle must be 3-20 characters long and contain only letters, numbers, and underscores" }, 
        { status: 400 }
      );
    }

    // Step 5: Connect to database
    await connect();

    // Step 6: Check if handle is already taken by another user
    const existingUser = await User.findOne({ 
      handle: handle,
      _id: { $ne: session.user.id } // Exclude current user
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: "Handle is already taken" }, 
        { status: 400 }
      );
    }

    // Step 7: Update the user's handle using their ID from the session
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id, // This comes from the authenticated session
      { handle: handle },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found" }, 
        { status: 404 }
      );
    }

    // Step 8: Return success response
    return NextResponse.json({
      message: "Handle set successfully",
      handle: updatedUser.handle,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        handle: updatedUser.handle
      }
    });

  } catch (error) {
    console.error("Error setting handle:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}