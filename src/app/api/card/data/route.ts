import { connectDB } from "@/dbConfig/dbConfig";
import Card from "@/model/card.model";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function POST(request: NextRequest, response: NextResponse) {

    const data = await request.json()
    console.log(data, 'this is coming at backend')
    if (!data) {
        return NextResponse.json({ message: 'userId not found' }, { status: 404 })
    }
    try {
        const cards = await Card.find({ userId: data.userId })
        console.log(cards)
        return NextResponse.json({ message: "all cards are here", data: cards }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'something went wrong' }, { status: 500 })
    }
}