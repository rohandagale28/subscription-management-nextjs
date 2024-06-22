import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/utils/mailer";

//Database connection
connectDB();

export async function POST(request: NextRequest) {
  try {
    const { email, password, username } = await request.json();

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email: email,
      password: hashedPassword,
      username: username
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send verification email
    await sendMail({ email, emailType: "verify", userId: savedUser._id });

    return NextResponse.json({ message: "User registered successfully", success: true, savedUser });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
