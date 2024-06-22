import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (request: NextRequest): Promise<string | null> => {
  try {
    const token = request.cookies.get("next-auth.session-token")?.value || "";
    if (!token) {
      throw new Error("No token found");
    }
    const decodedToken = jwt.verify(token, "rohanworkspace");
    console.log((decodedToken as any).id);
    return (decodedToken as any).id;
  } catch (error: any) {
    console.error("Failed to decode token:", error.message);
    return null;
  }
};
