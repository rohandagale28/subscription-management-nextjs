import { connectDB } from "@/dbConfig/dbConfig";
import Card from "@/model/card.model";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, response: NextResponse) {
    await connectDB()

    const { name, description, image, method, date, amount, userId } = await request.json();
    console.log(userId)
    if (!userId) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User not Exist" }, { status: 404 });
        }

        const newCard = new Card({
            name,
            description,
            image,
            method,
            date,
            amount,
            userId,
        });

        const savedCard = await newCard.save();
        return NextResponse.json({ message: "card created successfully" }, { status: 201 });
    } catch (error) {
        console.error('Error saving card:', error);
       return NextResponse.json({ message: "internal server error" }, { status: 500 });
    }
}