// pages/not-found.js
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#254f1a] px-4">
      {/* Container with glowing background and border */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-md p-10 rounded-2xl border-4 border-[#ff13ff] 
                      bg-[#254f1a] 
                      shadow-[0_0_100px_40px_rgba(255,19,255,0.25)]">
        {/* Full-container spotlight effect */}
        <div className="absolute inset-0 bg-[#ff13ff] opacity-10 blur-3xl rounded-2xl"></div>

        {/* Content above spotlight */}
        <h1 className="relative text-[8rem] font-bold text-[#ff13ff] mb-4 z-10">404</h1>
        <h2 className="relative text-3xl md:text-4xl font-semibold mb-2 z-10 text-white">
          Page Not Found
        </h2>
        <p className="relative text-lg md:text-xl text-white/80 mb-6 text-center z-10">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="relative z-10 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff13ff] to-white text-[#254f1a] font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
