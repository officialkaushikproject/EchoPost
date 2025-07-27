import { connect } from "@/utils/db";
import User from "@/model/User";
import { NextResponse } from "next/server";

// POST	Create new post
export async function POST(request) {
  const data = await request.json();

  try {
    await connect();
    const exists_title = await User.findOne({ title: data.title });

    if (exists_title) {
      return NextResponse.json(
        { error: "Title is already use" },
        { status: 400 }
      );
    }

    const post = await User.create({
      title: data.title,
      description: data.description,
      author: author,
    });
    if (post) {
      return NextResponse.json(
        {
          message: "Data submitted successfully!",
          receivedData: data,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to create user!", error: error.message },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create user!", error: error.message },
      { status: 400 }
    );
  }
}

// GET	Get all posts (or filter)
