import { connect } from "@/utils/db";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json([], { status: 400 });
  }

  try {
    await connect();
    const suggestions = await User.find({
      handle: { $regex: `^${query}`, $options: "i" },
    })
      .limit(5)
      .select("handle");
    return NextResponse.json(suggestions, { status: 200 });
  } catch (error) {
    console.error("Error fetching handle suggestions:", error);
    return NextResponse.json(
      { error: "Failed to fetch suggestions" },
      { status: 500 }
    );
  }
}
