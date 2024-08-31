import mongoose from "mongoose";

export async function connectDB() {
  const mongoUrl = process.env.MONGODB_URI!

  if (!mongoUrl) {
    throw new Error("Environment variable NEXT_PUBLIC_MONGO_URL is not defined");
  }

  try {
    // Set up mongoose connection event listeners
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully"); 
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });

    // Attempt to connect to MongoDB
    await mongoose.connect(mongoUrl);

  } catch (error) {
    console.error("Connection to database failed:", error);
    process.exit(1);
  }
}
