import { connectDB } from "@/dbConfig/dbConfig";
import Card from "@/model/card.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await connectDB();

    try {
        const { cardId, title, method, amount, date } = await request.json();

        if (!cardId) {
            return NextResponse.json({ message: "Card ID not provided" }, { status: 400 });
        }

        // Check if the card exists and update
        const updatedCard = await Card.findByIdAndUpdate(
            cardId,
            { $set: { title, method, amount } },
            { new: true } // Return the updated document
        );

        if (!updatedCard) {
            return NextResponse.json({ message: "Card not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Card updated successfully", card: updatedCard }, { status: 200 });

    } catch (error) {
        console.error('Error updating card:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
