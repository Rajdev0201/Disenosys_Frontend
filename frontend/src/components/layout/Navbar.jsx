"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/components/assests/logo.jpg";
import Button from "../custom/Button";
import BookDemoModal from "../modal/BookDemo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import UserDropDown from "./UserDropDown";
import { ProfileLoader } from "../utils/Loader";
import { getProfile } from "../Redux/actions/auth";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const nav = useRouter();
  const path = usePathname();
  const {data,loading} = useSelector((state) => state.user);
  const dispatch = useDispatch();
    
     useEffect(() => {
     dispatch(getProfile());
   },[dispatch])
 

  const handlePushLogin = ( ) => {
    nav.push("/signup")
  }
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Course", href: "/course" },
    { name: "Admission", href: "/admission"},
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white top-10 left-0 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-10 lg:px-8 xl:px-24 py-2">
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => nav.push("/")}>
        <Image src={logo} alt="Logo" className="object-cover w-28 lg:w-44" />
        </div>
        {/* Buttons + Mobile Menu Toggle */}
        <div className="flex items-center gap-3 md:gap-4 md:order-2">
          <Button
            text="Book a Demo"
            onClick={() => setIsOpen(true)}
            className="hidden lg:block bg-[linear-gradient(to_right,#101359,#2229BF)] lg:px-2 xl:px-4 py-2 font-bold rounded-lg text-white font-dm-sans hover:cursor-pointer"
          />
          {!data?.userName ? 
          <Button
            text="Sign Up"
            onClick={handlePushLogin}
            className="hidden lg:block bg-[linear-gradient(to_right,#0077B3,#45D2FF)] px-8 py-2 font-bold rounded-lg text-white font-dm-sans hover:cursor-pointer"
          />
          : !loading ? <UserDropDown userData={data} loading={loading} className="hidden lg:block"/> : <ProfileLoader/>
          }

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-600 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            {menuOpen ? (
              // Close Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex md:items-center md:space-x-1 xl:space-x-8 md:order-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`block py-2 px-3 rounded-sm font-dm-sans text-base lg:text-md font-[400] hover:text-[#101359] 
                ${path === item.href ? "text-[#0910e2]" :"text-[#000000]" }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden px-6 pb-4">
          <ul className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 px-3 rounded-sm font-dm-sans text-base font-[400] hover:text-[#101359]
                        ${path === item.href ? "text-[#0910e2]" :"text-[#000000]" }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Buttons visible in mobile */}
            <div className="flex flex-col gap-3 mt-0">
          {!data?.userName ? 
          <Button
            text="Sign Up"
            onClick={handlePushLogin}
            className="block lg:hidden bg-[linear-gradient(to_right,#0077B3,#45D2FF)] px-8 py-2 font-bold rounded-lg text-white font-dm-sans hover:cursor-pointer"
          />
          : <UserDropDown userData={data} loading={loading} className="block lg:hidden"/>
          }
              <Button
                text="Book a Demo"
                onClick={() => setIsOpen(true)}
                className="bg-[linear-gradient(to_right,#2229BF,#101359)] px-4 py-2 font-bold rounded-lg text-white font-dm-sans hover:cursor-pointer"
              />
            </div>
          </ul>
        </div>
      )}
        <BookDemoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </nav>
  );
};

export default Navbar;
