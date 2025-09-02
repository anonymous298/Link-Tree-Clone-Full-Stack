import { NextResponse } from "next/server";
import connectDb from "@/db/connectDB";
import User from "@/models/User";

export async function POST(request) {
  try {
    await connectDb();
    const data = await request.json();

    const userEmail = data.user.email;

    // Remove `user` key before updating
    const updatedData = { ...data };
    delete updatedData.user;

    // ✅ Use findOneAndUpdate for simplicity
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      { $set: updatedData },
      { new: true } // return updated document
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
