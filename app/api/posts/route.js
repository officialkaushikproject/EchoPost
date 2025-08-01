import { connect } from "@/utils/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import Post from "@/model/Post";
// POST	Create new post
export async function POST(request) {
  const data = await request.json();
  console.log("Requst here");

  try {
    await connect();
    const exists_title = await Post.findOne({ title: data.title });

    if (exists_title) {
      return NextResponse.json(
        { message: "Title is already use" },
        { status: 400 }
      );
    }

    const post = await Post.create({
      title: data.title,
      description: data.description,
      author: data.author,
    });
    if (post) {
      return NextResponse.json(
        {
          message: "Post submitted successfully!",
          receivedData: data,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to create post!", error: error.message },
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
export async function GET() {
  const session = await getServerSession(authOptions);
  const auther_id = session.user.id;
  try {
    await connect();
    const allPosts = await Post.find({ author: auther_id });
    return Response.json(allPosts);
  } catch (error) {
    return Response.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
