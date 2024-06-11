import mongoose from "mongoose";

export async function connectDB() {
  const mongoUrl = "mongodb+srv://workspacex28:fZCytgKpY4lMYbt2@cluster-subscription-da.rovymye.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-subscription-dashboard"

  if (!mongoUrl) {
    throw new Error("Environment variable NEXT_PUBLIC_MONGO_URL is not defined");
  }

  try {
    console.log("Connecting to MongoDB...");

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
