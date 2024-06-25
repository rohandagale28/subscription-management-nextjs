import { connectDB } from "@/dbConfig/dbConfig";
import Card from "@/model/card.model";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connectDB();

    try {
        const { platform, description, image, method, date, amount, userId } = await request.json();
        console.log({ platform, description, image, method, date, amount, userId })
        if (!userId) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Check if user exists
        // const user = await User.findOne({ _id: userId });
        // console.log(user)
        // if (!user) {
        //     return NextResponse.json({ message: "User not Exist" }, { status: 404 });
        // }

        const newCard = new Card({
            platform: platform,
            description: "no yet set",
            image: platform,
            method: method,
            date: date || Date.now(), // Use provided date or current date
            amount: amount,
            userId: userId,
        });

        const savedCard = await newCard.save();
        console.log(savedCard)
        return NextResponse.json({ message: "Card created successfully", card: savedCard }, { status: 201 });
    } catch (error) {
        console.error('Error saving card:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
