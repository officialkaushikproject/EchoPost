import User from "@/model/User";
import { connect } from "@/utils/db";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
  const Params = await params;
  const id = Params.id;
  await connect();
  try {
    const user = await User.findOne({ _id: id }).lean();
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch users!", error: error.message },
      { status: 400 }
    );
  }
}
