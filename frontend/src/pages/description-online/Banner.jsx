"use client"
import { ChevronRight } from 'lucide-react'
import React from 'react'

const Banner = () => {
  return (
 <div className="about px-6 sm:px-12 md:px-20 lg:px-32 xl:px-44 py-20 sm:py-28 md:py-36 lg:py-44 mt-12 text-center lg:h-[320px] text-white font-dm-sans">
  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 mt-6">
    Solid Model Remastering
  </h1>
  <h4 className="flex items-center gap-1 justify-center text-xs sm:text-sm md:text-base">
    Home <ChevronRight size={15} className="lg:mx-1" />Courses<ChevronRight size={15} className="lg:mx-1" />Solid Model Remastering
  </h4>
</div>
  )
}

export default Banner