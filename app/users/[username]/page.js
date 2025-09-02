import React from 'react'
import UserLinktreePage from '@/components/UserLinktreePage'
// import { notFound } from 'next/navigation';
import UserNotFound from '@/components/UserNotFound';
import User from '@/models/User';
import connectDb from '@/db/connectDB';

const Page = async ({ params }) => {
    await connectDb()
    const { username } = await params;

    const currentUser = await User.findOne({username : username})

    if (!currentUser) {
        return <UserNotFound />
    }

    // notFound()

    return (
        <div>
            <UserLinktreePage username={username} />
        </div>
    )
}

export default Page
