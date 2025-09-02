"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { updateUserData } from '@/actions/serverActions'
import { Toaster, toast } from 'react-hot-toast'

const Page = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [formValues, setFormValues] = useState({});
    const [links, setLinks] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [isNotUpdated, setIsNotUpdated] = useState(true)

    // console.log(formValues)

    // console.log(currentUser.links.length === 0)
    // console.log(formValues)
    // console.log(session.user.email)

    console.log(currentUser)


    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/getuserdata', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'username' : session.user.username})
            })

            const data = await res.json();
            setCurrentUser(data);
            setFormValues({ 'username': data.username, 'fullname': data.fullname ? data.fullname : '', 'profilepic' : data.profilepic ? data.profilepic : '' })
            setLinks(data.links)
        }

        // const temp = async () => {
        //     const res = await fetch('/api/updateuserdata')
        //     const data = await res.json()
        //     console.log(data)
        // }

        if (!session) {
            router.push('/login')
        }

        else {
            fetchUser()
            // temp()
        }



    }, [session])

    useEffect(() => {
        if (currentUser?.links && currentUser.links.length > 0) {
            // User already has links → show update button
            setIsNotUpdated(false)
            console.log("Update")

        } else {
            // No links → show generate button
            setIsNotUpdated(true)
            console.log("Generate")
        }


    }, [currentUser])

    const onChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
        // console.log(formValues)
    }

    // const onChangeLinks = (e) => {
    //     setLinks({...links, [e.target.name] : })
    // }

    const handleSubmit = async () => {
        // const updateUserDataOnDb = async (fdata) => {
        //     const res = await fetch('/api/updateuserdata', {
        //         method : "POST",
        //         headers : {
        //             'Content-Type' : 'application/json'
        //         },
        //         body : JSON.stringify(fdata)
        //     })

        //     const data = await res.json();
        //     // console.log(data)
        // }

        const finalData = { ...formValues }
        finalData['links'] = links
        finalData['user'] = currentUser
        // console.log('submitting data to updation', finalData)

        updateUserData(finalData)

        // await updateUserDataOnDb(finalData)
        // console.log('updated')
        // setLinkIsZero(false)

        if (isNotUpdated) {
            const toastId = toast.loading("Generating...");
            // toast('Congrats! You Just Created Your Linktree')
            setTimeout(() => {
                // Update the toast to success
                toast.success("Congrats! You Just Created Your Linktree", {
                    id: toastId, // this replaces the previous loading toast
                });
            }, 2000); // 3 seconds

            setTimeout(() => {
                router.push(`/users/${session.user.username}`)
            }, 4000);
        }

        else {
            toast.success('Successfully Updated You Linktree')
            setTimeout(() => {
                router.push(`/users/${session.user.username}`)
            }, 3000);
        }

        // setTimeout(() => {
        //     router.push(`/users/${session.user.username}`)
        // }, 5000);


    }

    const addLinks = () => {
        setLinks([...links, { title: '', url: '' }]);
        // console.log({formValues})
    }

    const deleteLink = (idx) => {
        console.log(idx)
        setLinks(links.filter((_, index) => index !== idx));
        console.log(links.length)
    }

    return (
        <div className='min-h-screen flex justify-center items-center mt-22'>
            <div><Toaster /></div>
            <div className="container flex justify-evenly p-2 max-[1022px]:flex-col items-center">
                {/* Illustration */}
                <div className="w-[50%] max-[1022px]:hidden self-center">
                    <Image
                        src="/complete-form.svg"
                        alt="Login Illustration"
                        width={600}
                        height={800}
                        className="rounded-2xl object-contain"
                    />
                </div>

                <div className="w-[50%] bg-white shadow-lg rounded-2xl p-8 max-[1022px]:w-[85%]">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Create Your Linktree</h2>

                    <div className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                required={true}
                                placeholder="Enter your full name"
                                className="w-full px-4 py-2 border rounded-lg bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
                                onChange={onChange}
                                name='fullname'
                                value={formValues.fullname ? formValues.fullname : ''}
                            />
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                required={true}
                                placeholder="Choose a username"
                                className="w-full px-4 py-2 border rounded-lg bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
                                onChange={onChange}
                                name='username'
                                value={formValues.username ? formValues.username : ''}
                            />
                        </div>

                        {/* ProfilePic */}
                        <div>
                            <label className="block text-gray-700 mb-1">Profile Picture</label>
                            <input
                                type="text"
                                placeholder="Enter URL for profile picture"
                                className="w-full px-4 py-2 border rounded-lg bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
                                onChange={onChange}
                                name='profilepic'
                                value={formValues.profilepic ? formValues.profilepic : ''}
                            />
                        </div>

                        {/* Social Media Links
                        <div>
                            <label className="block text-gray-700 mb-1">Facebook Link</label>
                            <input
                                type="url"
                                placeholder="https://facebook.com/yourprofile"
                                className="w-full px-4 py-2 border rounded-lg bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
                                onChange={onChange}
                                name='facebook'
                                value={formValues.facebook ? formValues.facebook : ''}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Twitter Link</label>
                            <input
                                type="url"
                                placeholder="https://twitter.com/yourhandle"
                                className="w-full px-4 py-2 border rounded-lg bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
                                onChange={onChange}
                                name='twitter'
                                value={formValues.twitter ? formValues.twitter : ''}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Instagram Link</label>
                            <input
                                type="url"
                                placeholder="https://instagram.com/yourhandle"
                                className="w-full px-4 py-2 border rounded-lg bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
                                onChange={onChange}
                                name='instagram'
                                value={formValues.instagram ? formValues.instagram : ''}
                            />
                        </div> */}

                        {/* Dynamic Links Portion */}

                        {links[0] && links.map((val, idx) => {
                            return (
                                <div key={idx} className='flex justify-between gap-x-4 items-center'>
                                    <div className='flex gap-x-3 w-full max-[600px]:flex-col '>
                                        <input
                                            value={val.title ? val.title : ''}
                                            type="text"
                                            placeholder='Enter Social Media Name'
                                            name='title'
                                            className=" px-2 w-[50%] max-[600px]:w-full py-2 border rounded-lg bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
                                            onChange={(e) => {
                                                const newLinks = [...links]
                                                console.log(e.target.value)
                                                newLinks[idx].title = e.target.value
                                                // console.log(newLinks)
                                                setLinks(newLinks)
                                            }}
                                        />

                                        <input
                                            value={val.url ? val.url : ''}
                                            type="text"
                                            name='url'
                                            placeholder='Enter Social Media Link'
                                            className="px-2 w-[50%] max-[600px]:w-full py-2 border rounded-lg bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
                                            onChange={(e) => {
                                                // console.log(val)
                                                const newLinks = [...links]
                                                newLinks[idx].url = e.target.value
                                                setLinks(newLinks)
                                            }}
                                        />
                                    </div>

                                    <button type='button' onClick={() => deleteLink(idx)} className='size-5 relative'>
                                        <Image src="/delete.png" alt="delete" fill={true} className='cursor-pointer max-[600px]:size-8' />
                                    </button>
                                </div>
                            )
                        })}

                        <button
                            type='button'
                            onClick={addLinks}
                            className="px-5 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 hover:from-black hover:to-gray-800 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                        >
                            Add Links
                        </button>

                        {/* Submit Button */}

                        {isNotUpdated && <button
                            type="submit"
                            className="cursor-pointer w-full py-3 rounded-xl text-white font-semibold shadow-lg bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 hover:from-sky-500 hover:via-sky-600 hover:to-sky-700 transition-all duration-300 transform hover:scale-105"
                            onClick={handleSubmit}
                        // onClick={() => router.push(`/users/${session.user.username}`)}
                        >
                            Generate Your Linktree
                        </button>}

                        {!isNotUpdated && <button
                            type="submit"
                            className="cursor-pointer w-full py-3 rounded-xl text-white font-semibold shadow-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
                            onClick={handleSubmit}
                        // onClick={() => router.push(`/users/${session.user.username}`)}
                        >
                            Update Your Linktree
                        </button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
