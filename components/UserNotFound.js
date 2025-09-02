// components/UserNotFound.js
import Link from "next/link";

export default function UserNotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 bg-[#1a254f]">
      {/* Container with glowing background and border */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-md p-10 rounded-2xl border-4 border-[#8c13ff] 
                      bg-[#1a254f] 
                      shadow-[0_0_100px_40px_rgba(140,19,255,0.25)]">
        {/* Full-container spotlight effect */}
        <div className="absolute inset-0 bg-[#8c13ff] opacity-10 blur-3xl rounded-2xl pointer-events-none"></div>

        {/* Content above spotlight */}
        <h1 className="relative text-[7rem] font-bold text-[#8c13ff] mb-4">404</h1>
        <h2 className="relative text-3xl md:text-4xl font-semibold mb-2 text-white">
          User Not Found
        </h2>
        <p className="relative text-lg md:text-xl text-white/80 mb-6 text-center">
          Oops! The user you're looking for doesn’t exist or has been removed.
        </p>
        <Link
          href="/"
          className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-[#8c13ff] to-white text-[#1a254f] font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
