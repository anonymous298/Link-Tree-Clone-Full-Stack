"use client"
import Link from 'next/link'
import React, { useState, useEffect, act } from 'react'
import { useSession, signOut } from "next-auth/react"

const Navbar = () => {
    const { data: session } = useSession();
    const [show, setShow] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [active, setActive] = useState('home');

    // console.log(session)
    useEffect(() => {
        const controlNavbar = () => {
            if (window.scrollY > 5) { // 👈 adjust height here
                if (window.scrollY > lastScrollY) {
                    // scrolling down
                    setShow(false)
                } else {
                    // scrolling up
                    setShow(true)
                }
            } else {
                setShow(true)
            }
            setLastScrollY(window.scrollY)
        }
        
        window.addEventListener("scroll", controlNavbar)
        
        return () => {
            window.removeEventListener("scroll", controlNavbar)
        }
    }, [lastScrollY])
    

    const updateActive = (currentTab) => {
        setActive(currentTab);
    } 

    return (
        <div className={`flex justify-center items-center p-10 transition-transform duration-500 ${show ? "translate-y-0" : "-translate-y-full"}`}>
            <div className="container w-[97%] bg-white rounded-full flex justify-between items-center fixed top-5 shadow-md">
                <div className='flex justify-center items-center'>
                    <div className="logo text-black font-bold text-[30px] p-3 px-9 cursor-pointer">Connecto</div>
                    <ul className='flex gap-x-10'>
                        <li><Link onClick={() => updateActive('home')} href={'/'} className={`text-[17px] font-semibold decoration-[3px] ${active === 'home'?'underline':''}`}>Home</Link></li>
                        {session && <li><Link onClick={() => updateActive('dashboard')} href={'/dashboard'} className={`text-[17px] font-semibold  transition-all decoration-[3px] ${active === 'dashboard'?'underline':''} `}>Dashboard</Link></li>}
                        {session && <li><Link onClick={() => updateActive('page')} href={`/users/${session.user.username}`} className={`text-[17px] font-semibold transition-all decoration-[3px] ${active === 'page'?'underline':''} `}>Your Linktree</Link></li>}
                    </ul>
                </div>

                <div className='p-3'>
                    {!session && <Link href={'/login'} className='bg-[#1e2330] text-white font-bold text-[17px] p-4 px-10 rounded-full hover:bg-black transition-all cursor-pointer'>Log In</Link>}
                    {session && <button onClick={() => signOut()} className='bg-[#ff13ff] text-white font-bold text-[17px] p-4 px-10 rounded-full hover:bg-[#ff85ff] transition-all cursor-pointer'>Log Out</button>}
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar
