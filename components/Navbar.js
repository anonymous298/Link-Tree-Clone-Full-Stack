"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { Menu, X } from "lucide-react" // icons for hamburger

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [active, setActive] = useState('home');
  const [searchValue, setSearchValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 2) {
        if (window.scrollY > lastScrollY) {
          setShow(false);
        } else {
          setShow(true);
        }
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const updateActive = (currentTab) => setActive(currentTab);
  const onChange = (e) => setSearchValue(e.target.value);

  return (
    <div
      className={`flex justify-center items-center p-6 transition-transform duration-500 relative z-200 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container w-[97%] bg-white rounded-full flex justify-between items-center fixed top-5 shadow-md px-6 py-3 z-50">
        {/* Logo + Hamburger */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link href={'/'} className="logo text-black font-bold text-[30px] cursor-pointer">
            Connecto
          </Link>

          {/* Hamburger visible below 1025px */}
          <button
            className="lg:hidden text-black p-2 rounded-md hover:bg-gray-200 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-x-8">
          <ul className="flex gap-x-10">
            <li>
              <Link
                onClick={() => updateActive("home")}
                href={"/"}
                className={`text-[17px] font-semibold decoration-[3px] ${
                  active === "home" ? "underline" : ""
                }`}
              >
                Home
              </Link>
            </li>
            {session && (
              <li>
                <Link
                  onClick={() => updateActive("dashboard")}
                  href={"/dashboard"}
                  className={`text-[17px] font-semibold transition-all decoration-[3px] ${
                    active === "dashboard" ? "underline" : ""
                  }`}
                >
                  Dashboard
                </Link>
              </li>
            )}
            {session && (
              <li>
                <Link
                  onClick={() => updateActive("page")}
                  href={`/users/${session.user.username}`}
                  className={`text-[17px] font-semibold transition-all decoration-[3px] ${
                    active === "page" ? "underline" : ""
                  }`}
                >
                  Your Linktree
                </Link>
              </li>
            )}
          </ul>

          {/* Searchbar */}
          {session && <div className="flex items-center gap-2 bg-[#1e2d1a] rounded-full shadow-inner p-1 px-3">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-[#154e07] text-white placeholder-[#a0a0a0] outline-none px-4 py-2 rounded-full shadow-inner"
              onChange={onChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                    router.push(`/users/${searchValue}`)
                    setMenuOpen(false)
                }
              }}
            />
            <button
              className="cursor-pointer bg-gradient-to-r from-[#ff13ff] via-[#ff66ff] to-[#ff99ff] text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
              onClick={() => router.push(`/users/${searchValue}`)}
            >
              Search
            </button>
          </div>}
        </div>

        {/* Auth buttons (desktop) */}
        <div className="hidden lg:block">
          {!session ? (
            <Link
              href={"/login"}
              className="bg-[#1e2330] text-white font-bold text-[17px] px-8 py-3 rounded-full hover:bg-black transition-all cursor-pointer"
            >
              Log In
            </Link>
          ) : (
            <button
              onClick={() => signOut()}
              className="bg-[#ff13ff] text-white font-bold text-[17px] px-8 py-3 rounded-full hover:bg-[#ff85ff] transition-all cursor-pointer"
            >
              Log Out
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="lg:hidden fixed top-[80px] left-0 w-full bg-white shadow-md rounded-b-2xl p-6 flex flex-col gap-6 z-40">
          <ul className="flex flex-col gap-y-4 text-center">
            <li>
              <Link
                onClick={() => {
                  updateActive("home");
                  setMenuOpen(false);
                }}
                href={"/"}
                className={`text-[17px] font-semibold ${
                  active === "home" ? "underline" : ""
                }`}
              >
                Home
              </Link>
            </li>
            {session && (
              <li>
                <Link
                  onClick={() => {
                    updateActive("dashboard");
                    setMenuOpen(false);
                  }}
                  href={"/dashboard"}
                  className={`text-[17px] font-semibold ${
                    active === "dashboard" ? "underline" : ""
                  }`}
                >
                  Dashboard
                </Link>
              </li>
            )}
            {session && (
              <li>
                <Link
                  onClick={() => {
                    updateActive("page");
                    setMenuOpen(false);
                  }}
                  href={`/users/${session.user.username}`}
                  className={`text-[17px] font-semibold ${
                    active === "page" ? "underline" : ""
                  }`}
                >
                  Your Linktree
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile Search */}
          {session && <div className="flex items-center gap-2 bg-[#1e2d1a] rounded-full max-[400px]:rounded-2xl shadow-inner p-1 px-3 max-[400px]:flex-col">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 max-[400px]:w-full bg-[#154e07] text-white placeholder-[#a0a0a0] outline-none px-4 max-[400px]:px-1 py-2 rounded-full max-[400px]:rounded-[10px] shadow-inner"
              onChange={onChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                    router.push(`/users/${searchValue}`)
                    setMenuOpen(false)
                }
              }}
            />
            <button
              className="cursor-pointer max-[400px]:w-full bg-gradient-to-r from-[#00ff73] via-[#70ffbc] to-[#3fcfff] text-white font-semibold px-6 max-[400px]:px-3 py-2 rounded-full max-[400px]:rounded-[10px] shadow-lg hover:scale-105 transition-transform duration-300"
              onClick={() => {
                router.push(`/users/${searchValue}`);
                setMenuOpen(false);
              }}
            >
              Search
            </button>
          </div>}

          {/* Mobile auth buttons */}
          <div className="text-center">
            {!session ? (
              <a
                href={"/login"}
                className="bg-[#1e2330] text-white font-bold text-[17px] px-8 py-3 rounded-full hover:bg-black transition-all cursor-pointer block"
              >
                Log In
              </a>
            ) : (
              <button
                onClick={() => {
                  signOut();
                  setMenuOpen(false);
                }}
                className="bg-[#ff13ff] w-full text-white font-bold text-[17px] px-8 py-3 rounded-full hover:bg-[#ff85ff] transition-all cursor-pointer block"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
