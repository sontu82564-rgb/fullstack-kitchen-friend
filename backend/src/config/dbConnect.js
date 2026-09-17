import "dotenv/config";
import mongoose from "mongoose";

const url = process.env.DB_STRING;

export default async function dbConnect() {
  try {
    await mongoose.connect(url);

    console.log("Connected to MongoDB Server");
    console.log("Database:", mongoose.connection.name);

  } catch (error) {
    console.error("Failed to Connect to MongoDB:", error);
  }
}

