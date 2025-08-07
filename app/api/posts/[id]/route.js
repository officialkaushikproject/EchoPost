import { connect } from "@/utils/db";
import { NextResponse } from "next/server";
import Post from "@/model/Post";

// Put request for update 
export async function PUT(req, { params }) {
  try {
    await connect();
    const Params = await params;
    const id = Params.id;
    const { title, description } = await req.json();

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update post", error },
      { status: 500 }
    );
  }
}

// For delete Post
export async function DELETE(req, { params }) {
  try {
    await connect();
    const Params = await params;
    const id = Params.id;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete post", error },
      { status: 500 }
    );
  }
}