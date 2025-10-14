import React from 'react'
import "../../app/globals.css"
import Button from '@/components/custom/Button'
import { MoveRight } from 'lucide-react'
import { Whatsapp } from './Whatsapp'

const Banner = () => {
  return (
    <div className="bg py-28 md:py-20 lg:py-44 mt-0 md:mt-16 lg:mt-20 xl:mt-0 xl:py-60 mb-10 md:mb-16 lg:mb-20">
      <div className="px-6 sm:px-10 md:px-10 lg:px-12 xl:px-24 space-y-4 text-center md:text-left">
        
        {/* Heading */}
        <h1 className="text-xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-dm-sans text-white leading-snug md:leading-relaxed lg:leading-[1.3] xl:leading-[1.2] max-w-full md:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto md:mx-0">
          Shaping Industry Ready Engineers for the Future
        </h1>

        {/* Paragraph */}
        <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-md sm:max-w-lg md:max-w-sm lg:max-w-xl xl:max-w-2xl mx-auto md:mx-0">
          Learn automobile engineering from anywhere, anytime. Become an industry-ready professional with our online courses.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 sm:gap-6 pt-4">
          <Button
            text="Take Test"
            icon={<MoveRight size={18} color="white" />}
            className="flex items-center gap-2 bg-[linear-gradient(to_right,#45D2FF,#009EE0)] px-5 sm:px-6 md:px-8 py-2 sm:py-3 font-bold rounded-lg text-white font-dm-sans hover:cursor-pointer text-sm sm:text-base md:text-lg"
          />
          <Button
            text="View All Courses"
            className="text-white text-sm sm:text-base md:text-lg hover:cursor-pointer hover:text-blue-200"
          />
        </div>
      </div>
      <Whatsapp/>
    </div>
  )
}

export default Banner
