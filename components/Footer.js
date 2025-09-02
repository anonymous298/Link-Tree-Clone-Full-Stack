// components/Footer.js
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0c3601] border-t border-[#8c13ff]/30 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        
        {/* Logo / App Name */}
        <Link href={'/'} className="text-2xl font-bold text-[#a749ff] cursor-pointer">Connecto</Link>
        
        {/* Links */}
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="/about" className="text-white/80 hover:text-[#8c13ff] transition">About</a>
          <a href="/features" className="text-white/80 hover:text-[#8c13ff] transition">Features</a>
          <a href="/contact" className="text-white/80 hover:text-[#8c13ff] transition">Contact</a>
        </div>
        
        {/* Copyright */}
        <p className="mt-4 md:mt-0 text-white/50 text-sm">
          © {new Date().getFullYear()} Connecto. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
