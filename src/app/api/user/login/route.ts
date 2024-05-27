import { connectDB } from "@/lib/mongoose";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    console.log({ email, password });

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    console.log("user exist");

    const passwordValidation = await bcryptjs.compare(password, user.password);
    if (!passwordValidation) {
      return NextResponse.json({ message: "Check your credential" }, { status: 404 });
    }
    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.NEXT_PUBLIC_JWT_SECRET!, { expiresIn: "1d" });
    const response = NextResponse.json({
      message: "logged in success",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
