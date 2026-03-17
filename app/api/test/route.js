import connectDB from "@/lib/connectdb";
import mongoose from "mongoose";

// Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

// Model (prevent overwrite error)
const User = mongoose.models.User || mongoose.model("User", userSchema);

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    if (!body?.name || !body?.email) {
      return Response.json(
        { message: "Name and Email are required" },
        { status: 400 }
      );
    }

    // Insert
    const newUser = await User.create({
      name: body.name,
      email: body.email,
    });

    // Fetch all
    const users = await User.find();

    return Response.json(
      {
        message: "User created successfully",
        data: users,
        newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);

    return Response.json(
      {
        message: "Failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}