import Image from 'next/image'
import React from 'react'
import mission from "@/components/assests/mission.jpg";
import vission from "@/components/assests/vision.jpg";


const Goals = () => {
  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-28 xl:px-40 2xl:px-60 py-10 sm:py-16 md:py-20 lg:py-28 mb-16 font-dm-sans">
  {/* Vision */}
  <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-12 mb-12 text-center md:text-left">
    <div className="border border-gray-200 bg-white shadow-sm p-3 rounded-md flex-shrink-0">
      <Image src={mission} alt="mission" className="object-cover w-20 sm:w-24 md:w-28 lg:w-24" />
    </div>
    <div className="flex flex-col space-y-2 max-w-xl">
      <span className="text-xs sm:text-sm font-medium text-[#101359] tracking-wide">
        OUR VISION
      </span>
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#45D2FF] leading-snug">
        <span className="text-[#101359]">Empowering Success</span> for Every Learner
      </h1>
      <p className="text-xs sm:text-sm md:text-base font-medium leading-6 sm:leading-7 text-[#8C8C8C]">
        Aspire to be the leader in enabling individual success through coaching,
        mentoring, and training. Our motto is high-quality, affordable education
        for anyone with internet access.
      </p>
    </div>
  </div>

  {/* Mission */}
  <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-12 mb-12 text-center md:text-left">
    <div className="border border-gray-200 bg-white shadow-sm p-3 rounded-md flex-shrink-0">
      <Image src={vission} alt="vision" className="object-cover w-20 sm:w-24 md:w-28 lg:w-24" />
    </div>
    <div className="flex flex-col space-y-2 max-w-xl">
      <span className="text-xs sm:text-sm font-medium tracking-wide text-[#101359]">
        OUR MISSION
      </span>
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#45D2FF] leading-snug">
        <span className="text-[#101359]">Transforming Knowledge</span> into Career Growth
      </h1>
      <p className="text-xs sm:text-sm md:text-base font-medium leading-6 sm:leading-7 text-[#8C8C8C]">
        Imparting Domain Knowledge to Mechanical Engineering Graduates and Automotive
        by Seasoned Industry Experts. Empowering Our Students to an Expert The Domain
        of Choice.
      </p>
    </div>
  </div>
</section>

  )
}

export default Goals