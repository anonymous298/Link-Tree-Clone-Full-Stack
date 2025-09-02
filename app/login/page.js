"use client"

import Image from "next/image";
import { FaGoogle, FaGithub, FaFacebook, FaApple, FaMicrosoft } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const {data : session} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push('/dashboard')
        }
    }, [session])

    return (
        <div className="flex items-center justify-center min-h-screen gap-10 px-6 max-[830px]:flex-col-reverse mt-20">
            {/* Login Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 w-[40%] text-center max-[830px]:w-[70%] max-[600px]:w-[95%]">
                <h1 className="text-[27px] font-extrabold mb-6 text-gray-800">Login</h1>

                <div className="flex flex-col gap-y-3">
                    <button onClick={() => signIn('google')} className="flex items-center justify-center gap-2 w-full bg-red-500 text-white py-4 px-6 rounded-lg hover:bg-red-600 transition-all cursor-pointer max-[400px]:text-[14px]">
                        <FaGoogle className="text-lg" />
                        Continue with Google
                    </button>

                    <button onClick={() => signIn('github')}  className="flex items-center justify-center gap-2 w-full bg-gray-800 text-white py-4 px-6 rounded-lg hover:bg-black transition-all cursor-pointer max-[400px]:text-[14px]">
                        <FaGithub className="text-lg" />
                        Continue with GitHub
                    </button>

                    <button onClick={() => signIn('facebook')}  className="flex items-center justify-center gap-2 w-full bg-[#1877F2] text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-all cursor-pointer max-[400px]:text-[14px]">
                        <FaFacebook className="text-lg" />
                        Continue with Facebook
                    </button>

                    <button onClick={() => signIn('apple')}  className="flex items-center justify-center gap-2 w-full bg-[#000000] text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-all cursor-pointer max-[400px]:text-[14px]">
                        <FaApple className="text-lg" />
                        Continue with Apple
                    </button>

                    <button onClick={() => signIn('google')}  className="flex items-center justify-center gap-2 w-full bg-[#00A4EF] text-white py-4 px-6 rounded-lg hover:bg-[#3cc1ff] transition-all cursor-pointer max-[400px]:text-[14px]">
                        <FaMicrosoft className="text-lg" />
                        Continue with Microsoft
                    </button>
                </div>
            </div>

            {/* Illustration */}
            <div className="w-[40%] max-[830px]:w-[70%]">
                <Image
                    src="/vector.png"
                    alt="Login Illustration"
                    width={600}
                    height={600}
                    className="rounded-2xl object-contain"
                />
            </div>
        </div>
    );
}
