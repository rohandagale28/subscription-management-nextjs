import { connectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/lib/getDataFromToken";
import Card from "@/model/card.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    const active = searchParams.get('active');
    console.log(typeof (active));

    if (!userId) {
        return NextResponse.json({ message: 'userId not found' }, { status: 404 });
    }

    try {
        const aggregationPipeline = [
            {
                $match: {
                    userId: userId,
                },
            },
        ];

        if (active == "true") {
            aggregationPipeline.push({
                $match: {
                    isActive: true,
                },
            });
        }

        const cards = await Card.aggregate(aggregationPipeline);
        console.log(cards);
        return NextResponse.json({ message: "all cards are here", data: cards }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'something went wrong' }, { status: 500 });
    }
}
