import { connectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/lib/getDataFromToken";
import Card from "@/model/card.model";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function GET(request: NextRequest, response: NextResponse) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')
    const data = await getDataFromToken(request)
    console.log(data)
    if (!userId) {
        return NextResponse.json({ message: 'userId not found' }, { status: 404 })
    }
    try {
        const cards = await Card.find({ userId: userId })
        console.log(cards)
        return NextResponse.json({ message: "all cards are here", data: cards }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'something went wrong' }, { status: 500 })
    }
}