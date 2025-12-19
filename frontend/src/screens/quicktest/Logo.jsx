"use client"
import React from 'react'
import Image from "next/image";
import logo from "@/components/assests/logo.jpg"


 const Logo = () => {
  return (
    <div className='shadow-sm bg-white fixed w-full top-0 left-0 right-0 p-3 z-50 flex justify-center items-center'>
        <Image src={logo} className='object-cover w-44' alt='brand-logo'/>
    </div>
  )
}


export default Logo;
