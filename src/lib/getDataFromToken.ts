import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!);
    console.log(decodedToken.id);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
