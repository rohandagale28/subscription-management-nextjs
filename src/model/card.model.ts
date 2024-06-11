import { Schema, Document, Model, model, models, Types } from "mongoose";
import { UserType } from "./user.model";

export interface CardType extends Document {
    userId: Types.ObjectId | UserType;
    name: string;
    description: string;
    image: string;
    method: string;
    date: Date;
    amount: number;
}

const CardSchema: Schema<CardType> = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        ref: "User",
        required: true,
    }
})

const Card: Model<CardType> = models.Card || model<CardType>("Card", CardSchema)

export default Card