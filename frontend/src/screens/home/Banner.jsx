"use client"
import React, { useEffect, useRef } from 'react'
import "../../app/globals.css"
import Button from '@/components/custom/Button'
import { MoveRight, User2 } from 'lucide-react'
import  Whatsapp  from './Whatsapp'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/context/ToastContext'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessages } from '@/components/Redux/features/authSlice'

const Banner = () => {
  const router = useRouter();
  const {showToast} = useToast();
  const { success } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const firstTime = useRef(true);
  const user = <User2 size={10}/>
  const handleRoute = () =>{
    router.push("/quicktest")
  }
 useEffect(() => {
  if (success && firstTime.current) {
    firstTime.current = false;
    showToast("success",user,success);
    dispatch(clearMessages());
  }
}, [success,dispatch]);
  return (
    <div className="bg py-5 md:py-20 lg:py-44 mt-24 md:mt-16 lg:mt-20 xl:mt-0 xl:py-60 2xl:py-72 mb-10 md:mb-16 lg:mb-20">
      <div className="px-2 sm:px-10 md:px-10 lg:px-12 xl:px-24 space-y-2 lg:space-y-4 text-start md:text-left">
        
        {/* Heading */}
        <header>
        <h1 className="text-md sm:text-lg md:text-3xl lg:text-4xl xl:text-5xl font-bold font-dm-sans text-white leading-snug md:leading-relaxed lg:leading-[1.3] xl:leading-[1.2] max-w-[250px] md:max-w-md lg:max-w-xl xl:max-w-2xl  md:mx-0">
          Shaping Industry Ready Engineers for the Future
        </h1>

        {/* Paragraph */}
        <p className="text-xs sm:text-base md:text-lg text-gray-300 max-w-[200px] sm:max-w-lg md:max-w-sm lg:max-w-xl xl:max-w-2xl md:mx-0 mt-3">
          Learn automobile engineering from anywhere, anytime. Become an industry-ready professional with our online courses.
        </p>
        </header>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-start items-start lg:items-center gap-4 sm:gap-6 pt-4">
          <Button
            text="Take Test"
            onClick={handleRoute}
            icon={<MoveRight size={18} color="white" />}
            className="flex items-center gap-2 bg-[linear-gradient(to_right,#45D2FF,#009EE0)] hover:bg-[linear-gradient(to_right,#009EE0,#45D2FF)] px-5 sm:px-6 md:px-8 py-2 sm:py-3 font-bold rounded-lg text-white font-dm-sans hover:cursor-pointer text-sm sm:text-base md:text-lg"
          />
          <Button
            text="View All Courses"
            onClick={() =>router.push("/course")}
            className="text-white text-sm sm:text-base md:text-lg hover:cursor-pointer hover:text-blue-200 mb-3"
          />
        </div>
      </div>
      <Whatsapp/>
    </div>
  )
}

export default Banner
