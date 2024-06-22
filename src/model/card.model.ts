import { Schema, Document, Model, model, models, Types } from "mongoose";
import { UserType } from "./user.model";

export interface CardType extends Document {
    userId: Types.ObjectId | UserType;
    platform: string;
    description: string;
    image: string;
    method: string;
    date: Date;
    amount: number;
    isActive: boolean
}

const CardSchema: Schema<CardType> = new Schema({
    platform: {
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
    },
    isActive: {
        type: Boolean,
        default: true,
    }
})

const Card: Model<CardType> = models.Card || model<CardType>("Card", CardSchema)

export default Card