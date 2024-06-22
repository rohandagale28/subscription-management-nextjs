import { Schema, Document, Model, model, models } from "mongoose";

export interface UserType extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  verifyToken: string | undefined;
  verifyTokenExpiry: Date | undefined;
  isVerified: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
}

const UserSchema: Schema<UserType> = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true, // Trim whitespace
    lowercase: true, // Store emails in lowercase
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verifyToken: {
    type: String,
    required: false,
  },
  verifyTokenExpiry: {
    type: Date,
    required: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: {
    type: String,
  },
  forgotPasswordTokenExpiry: {
    type: Date,
  },
});

// Check if the model already exists before defining it
const User: Model<UserType> = models.User || model<UserType>("User", UserSchema);

export default User;
