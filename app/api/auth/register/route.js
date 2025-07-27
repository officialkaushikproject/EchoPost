import { connect } from "@/utils/db";
import User from "@/model/User";
import { NextResponse } from "next/server";
import { userSchema } from "@/lib/zodSchema";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const data = await request.json();
  const result = userSchema.safeParse(data);
  if (!result.success) {
    const errorMessages = result.error.flatten().fieldErrors;
    return Response.json(
      { message: "Validation failed", errors: errorMessages },
      { status: 400 }
    );
  }

  try {
    await connect();
    const exists_user = await User.findOne({ email: data.email });
    const exists_handle = await User.findOne({ handle: data.handle });

    if (exists_handle) {
      return NextResponse.json(
        { error: "Handle already taken" },
        { status: 400 }
      );
    }
    if (exists_user) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    const saltrounds = parseInt(process.env.saltRounds || "10", 10);

    const hashedPassword = await bcrypt.hash(data.password, saltrounds);

    const user = await User.create({
      name: data.name,
      handle: data.handle,
      email: data.email,
      password: hashedPassword,
    });
    if (user) {
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
