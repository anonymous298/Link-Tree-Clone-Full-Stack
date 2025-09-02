import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import connectDb from "@/db/connectDB";
import User from "@/models/User";

const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {

            if (account) {

                // const client = await clientPromise;
                // const db = client.db("linktree")
                // const collection = db.collection("users")

                await connectDb();

                const currentUser = await User.findOne({ email: user.email })

                if (!currentUser) {
                    // const client = await clientPromise;
                    // const client = await MongoClient('http://localhost:3000/linktree')
                    // const db = client.db("linktree")
                    // const collection = db.collection("users")

                    const userObj = {
                        email: user.email,
                        username: user.email.split('@')[0]
                    }

                    // await collection.insertOne(userObj)

                    await User.create(userObj);
                }

                return true

            }
        },

        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            await connectDb()
            
            const currentUser = await User.findOne({email : session.user.email})

            session.user.username = currentUser.username

            return session
        }
    }
}

// Export route handlers for NextAuth
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
