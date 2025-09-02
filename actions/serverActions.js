"use server"
import connectDb from "@/db/connectDB";
import User from "@/models/User";

export const updateUserData = async (data) => {
    await connectDb();

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

    console.log(updatedUser)
}