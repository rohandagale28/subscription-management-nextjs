import { connectDB } from "@/dbConfig/dbConfig";
import Card from "@/model/card.model";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, response: NextResponse) {
    await connectDB()

    try {
        const cards = await Card.find({})
        console.log(cards)
        return NextResponse.json({ message: "all cards are here", data: cards })
    } catch (error) {
        return NextResponse.json({ message: 'something went wrong' }, { status: 500 })
    }
}