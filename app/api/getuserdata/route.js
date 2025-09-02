import { NextResponse } from "next/server";
// import clientPromise from "@/db/connectDB";
// // import { MongoClient } from "mongodb";
import connectDb from "@/db/connectDB";
import User from "@/models/User";

export async function POST(request) {
    await connectDb()

    const sendedEmail = await request.json()

    // const client = await clientPromise;
    // const db = client.db("linktree")
    // const collection = db.collection("users")

    const currentUser = await User.findOne({email : sendedEmail.email})

    return NextResponse.json(currentUser)
}