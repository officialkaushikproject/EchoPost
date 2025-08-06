import { NextResponse } from "next/server";
import { connect } from "@/utils/db";
import Post from "@/model/Post";

export async function GET(request, { params }) {
  try {
    await connect();
    const Params = await params;
    const id = Params.id;
    const posts = await Post.find({ author: id }).lean(); //lean best for readonly document
    return NextResponse.json(posts);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch posts!", error: error.message },
      { status: 400 }
    );
  }
}
