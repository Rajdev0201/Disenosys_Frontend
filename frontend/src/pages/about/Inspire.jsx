import React from 'react'
import inspire from "@/components/assests/inspire.jpg"
import Image from 'next/image'

const Inspire = () => {
  return (
     <section>
  <div className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-10 sm:py-14 md:py-20 lg:py-24 font-dm-sans">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      
      {/* Left Side - Image */}
      <div className="flex justify-center lg:justify-start">
        <Image
          src={inspire}
          alt="Inspire"
          className="object-cover w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side - Text Content */}
      <div className="flex flex-col space-y-4 md:space-y-6 text-center md:text-left">
        <span className="text-xs sm:text-sm md:text-base font-bold tracking-wide text-center lg:text-start">
          MEET THE FOUNDER
        </span>

        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#45D2FF] leading-snug text-center lg:text-start">
          <span className="text-[#101359]">Inspiring Leadership, </span>
          Behind Disenosys
        </h1>

        <p className="text-xs sm:text-sm md:text-base lg:text-md font-medium leading-6 sm:leading-7 text-[#8C8C8C]">
          We are Disenosys, a leading EdTech platform established in 2019, specializing in industry-focused training for the Indian Automotive Industry. Our Post Graduate courses in Automotive Body Design cover 
          key domains like BIW, Plastic Trims, and Seating Systems, using top CAD tools such as CATIA, NX, and Creo.
        </p>

        <p className="text-xs sm:text-sm md:text-base lg:text-md font-medium leading-6 sm:leading-7 text-[#8C8C8C]">
         So far, we have trained over 10,000 engineers and helped 500+ professionals secure their dream jobs.
         With a curriculum designed by industry experts and strong partnerships with automotive OEMs,
         we offer 100% placement assistance, empowering engineers to thrive in a competitive job market.
        </p>
      </div>
    </div>
  </div>
</section>
  )
}

export default Inspire