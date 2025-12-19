"use client"
import { ChevronRight } from 'lucide-react'
import React from 'react'

const Banner = () => {
  return (
 <div className="contact px-6 sm:px-12 md:px-20 lg:px-32 xl:px-44 py-20 sm:py-28 md:py-36 lg:py-44 mt-24 lg:h-[320px] text-center text-white font-dm-sans mb-12">
  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
    Contact Us
  </h1>
  <h4 className="flex items-center justify-center text-xs sm:text-sm md:text-base">
    Home <ChevronRight size={15} className="mx-1" /> Contact Us
  </h4>
</div>

  )
}

export default Banner