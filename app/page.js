import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div className="flex justify-center items-center">
      <div className="container flex justify-center items-center min-h-screen max-[1030px]:mt-20 min-[1400px]:mt-20 max-[800px]:flex-col-reverse">
        <div className="w-[40%] flex flex-col justify-start gap-y-5 max-[800px]:w-[80%]">
          <h2 className="text-[#d2e823] font- font-extrabold text-[55px] w-[90%]">Everything you are. In one, simple link in bio.</h2>
          <p className="text-white font-sans text-[19px]">A simple way to share all your important links in one place — connect your audience to your website, social profiles, and content with a single link.</p>
          <Link href={'/login'} className="bg-[#ff85ff] font-bold self-start p-4 px-10 rounded-3xl font-sans text-[17px] hover:bg-[#e9c0e9] cursor-pointer">Get Started</Link>
        </div>

        {/* Illustration */}
        <div className="w-[50%] max-[800px]:w-[70%]">
          <Image
            src="/undraw_social-growth_osro.svg"
            alt="Login Illustration"
            width={700}
            height={700}
            className="rounded-2xl object-contain"
          />
        </div>
      </div>
    </div>
  );
}
