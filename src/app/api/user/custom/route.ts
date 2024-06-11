import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import data from "@/app/dashboard/_sidebar/_NavigationMenu/data";

connectDB();

export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const { email, password } = await request.json();
        console.log({ email, password }, "this is coming from backend")

        // Fetch user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Validate password
        const passwordValidation = await bcryptjs.compare(password, user.password);
        if (!passwordValidation) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }
        return NextResponse.json({ message: 'sucess', data: user }, { status: 200 })

        // Prepare token data
        // const tokenData = {
        //   id: user._id,
        //   email: user.email,
        // };

        // // Sign JWT token
        // const token = jwt.sign(tokenData, process.env.NEXT_PUBLIC_JWT_SECRET!, {
        //   expiresIn: "1d",
        // });

        // // Prepare response with token in httpOnly cookie
        // const response = NextResponse.json({
        //   message: "Login successful",
        //   success: true,
        // });

        // response.cookies.set("token", token, {
        //   httpOnly: true,
        // });

        // return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
