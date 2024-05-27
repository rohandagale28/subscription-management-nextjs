import { connectDB } from "@/lib/mongoose";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
    if (!user) {
      return NextResponse.json({ error: "user doesn't exist" }, { status: 400 });
    }
    console.log(user);  
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({ message: "email verified successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
