"use server";
import axios from "axios";
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
  return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("10 sec from now").sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  const user = { formData };
  const expires = new Date(Date.now() + 10 * 10000);
  const session = await encrypt({ user, expires });
  cookies().set("session", session, { expires, httpOnly: true });
}

export async function getSession() {   //check cookies while at login page
  const session = await cookies().get("next-auth.session-token")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function validateEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}