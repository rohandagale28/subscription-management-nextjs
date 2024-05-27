import { connectDB } from "@/lib/mongoose";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/lib/getDataFromToken";

connectDB();

export async function POST(request: NextRequest) {
  try {
    //extract data from token
    const userId = await getDataFromToken(request);
    console.log(userId);
    const user = await User.findOne({ _id: userId }).select("-password");

    console.log(user);
    return NextResponse.json({
      message: "user found",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ error: "something went wrong" }, { status: 404 });
  }
}
