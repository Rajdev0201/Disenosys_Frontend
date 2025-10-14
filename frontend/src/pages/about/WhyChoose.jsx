import Image from 'next/image'
import React from 'react'
import lft from '@/components/assests/lft.png';
import ryt from '@/components/assests/ryt.png';
import Bman from '@/components/assests/bman.png';

const WhyChoose = () => {
  return (
 <section className="bg-[#101359] font-dm-sans mb-10">
  <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 px-4 sm:px-6 md:px-8 lg:px-12 ">
    
    {/* Left Content */}
    <div className="flex flex-col space-y-6 xl:col-span-7">
      <span className="text-sm sm:text-base font-medium tracking-wide text-white mt-4">
        WHY CHOOSE DISENOSYS?
      </span>

      <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug md:w-4/4">
        One Platform for
        <span className="text-[#45D2FF]"> Lifting Your Career</span> | Empowering{" "}
        <span className="text-[#45D2FF]">Engineers</span>
      </h1>

      <p className="font-medium text-sm sm:text-base leading-7 text-gray-50 md:w-4/5">
        We Disenosys, Are Working to Bridge This Skill Gap Between Academia and
        The Industry Requirements. We Have a Team of Industry Experts, With Over
        a Decade of Experience Who Empower Our Students to Land Their Dream Jobs
        in Core Automotive Companies.
      </p>

      <div className="w-full sm:w-4/5 md:max-w-3/6 mt-6 sm:mt-10">
        <Image src={lft} className="object-cover mb-4" alt="lft" />
        <p className="text-center text-white font-semibold text-sm sm:text-md">
          Our Students Are Our Hope. We Are Dedicated to Making Their Dreams Into
          Reality
        </p>
        <div className="flex justify-end">
          <Image src={ryt} className="object-cover mb-4" alt="ryt" />
        </div>
      </div>
    </div>

    {/* Right Image */}
    <div className="xl:col-span-5  flex items-center justify-center">
      <Image
        src={Bman}
        className="object-cover h-full"
        alt="businessman"
      />
    </div>
  </div>
</section>

  )
}

export default WhyChoose