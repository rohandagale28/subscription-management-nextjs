import { connectDB } from "@/dbConfig/dbConfig";
import Card from "@/model/card.model";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function DELETE(request: NextRequest, response: NextResponse) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')

    if (!userId) {
        return NextResponse.json({ message: 'userId not found' }, { status: 404 })
    }
    try {
        const cards = await Card.findByIdAndDelete({ _id: userId })
        return NextResponse.json({ message: "all cards are here" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'something went wrong' }, { status: 500 })
    }
}