"use server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface FormData {
  email: string;
  password: string;
}

const secretKey = "rohanworkspace";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(key); // Set expiration time to 10 minutes
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(request: NextRequest, response: NextResponse) {
  const { email, password } = await request.json() as FormData;

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
  }

  await connectDB();

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Compare the provided password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  // Create a session token
  const session = await encrypt({ email, userId: user._id });
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  // Set the session cookie
  cookies().set("session", session, { expires, httpOnly: true });

  return NextResponse.json({ message: "Login successful" });
}

export async function getSession(request: NextRequest) {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function validateEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

