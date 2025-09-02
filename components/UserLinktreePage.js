"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
// import { fetchUserForLinktreePage } from '@/actions/serverActions'
// import { fetchData } from 'next-auth/client/_utils'


const UserLinktreePage = ({ username }) => {
    const { data: session } = useSession();
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState();
    const [socialLinks, setSocialLinks] = useState([])

    console.log(currentUser)

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/getuserdata', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'username': username })

            })

            const data = await res.json();
            setCurrentUser(data)
            setSocialLinks(data.links)
        }
        // setCurrentUser(data);
        // setFormValues({ 'username': data.username, 'fullname': data.fullname ? data.fullname : '' })
        // setLinks(data.links)
        // const temp = async () => {
        //     const res = await fetch('/api/updateuserdata')
        //     const data = await res.json()
        //     console.log(data)
        // }

        if (!session) {
            router.push('/')
        }

        else {
            fetchUser()
            // temp()
        }
    }, [session])

    // console.log(session.user.image)

    return (
        <div className=' min-h-screen flex justify-center mt-20'>
            <div className="container w-[35%] flex items-center flex-col gap-y-10 max-[850px]:w-[60%] max-[500px]:w-[75%]">
                <div className="profilepic rounded-full size-40 border-3 border-white relative max-[850px]:size-37 max-[500px]:size-30">
                    {currentUser?.profilepic ? (
                        <Image
                            src={currentUser.profilepic}
                            fill={true}
                            alt="User profile picture"
                            className='rounded-full'
                        />
                    ) : (
                        <p>No profile pic</p>
                    )}
                    {/* <img src={session.user.image} alt="profilPic" className='size-30 rounded-full object-cover' /> */}
                </div>
                {/* <img src={session.user.image} alt="" /> */}

                <div className="links-portion w-full text-center flex flex-col gap-y-2">
                    {socialLinks.map((val, idx) => {
                        return (
                            <div
                                key={idx}
                                // className='bg-white p-5 font-bold font-mono text-[20px] rounded-2xl cursor-pointer hover:bg-gray-200 transition-all'
                                className="h-20 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#d813ff] via-[#ff66ff] to-[#ff99ff] text-white font-bold text-[22px] shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                            >
                                <a href={val.url} target='_blank'>{val.title}</a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserLinktreePage
