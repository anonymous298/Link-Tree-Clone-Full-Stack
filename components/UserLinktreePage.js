"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const UserLinktreePage = () => {
    const { data: session } = useSession();
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState();
    const [socialLinks, setSocialLinks] = useState([])

    console.log(socialLinks)

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/getuserdata', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(session.user)
            })

            const data = await res.json();
            setCurrentUser(data);
            setSocialLinks(data.links)
        }

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
            <div className="container w-[35%] flex items-center flex-col gap-y-10">
                {session && <div className="profilepic rounded-full border-3 border-white">
                    {/* < Image 
                        src="https://lh3.googleusercontent.com/a/ACg8ocJyKv5VxmaV7NFmyIWRjdp1UuYsuuURE5Ce-LrUXAXmlQjX5OxeXg=s96-c"
                        width={100}
                        height={100}

                    /> */}
                    <img src={session.user.image} alt="profilPic" className='size-30 rounded-full object-cover'/>
                </div>}
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
