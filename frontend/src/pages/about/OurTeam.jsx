import Image from 'next/image'
import React from 'react'
import team from "@/components/assests/team.jpg"

const OurTeam = () => {
  return (
    <section>
   <div className="flex flex-col justify-center items-center font-dm-sans py-16 px-4 md:px-8 lg:px-16">
      {/* Section Heading */}
      <span className="text-sm font-bold tracking-wide text-[#101359] mb-3">
        OUR TEAM
      </span>
      <h1 className="text-[#101359] text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center">
        Meet Our{" "}
        <span className="text-[#45D2FF]">Expert Team</span>
      </h1>
      <p className="text-sm sm:text-base md:text-lg font-medium leading-7 text-center max-w-2xl text-[#8C8C8C] mb-12">
        Empowering Engineers | Transforming Careers with Industry Experience
      </p>

      <div className='grid grid-cols-4 font-dm-sans'>
          <div className='bg-white rounded-lg shadow-md'>
             <Image src={team} alt='team' className='object-cover rounded-tr-lg rounded-tl-lg'/>
             <div className='flex flex-col space-y-2 py-2 px-3'>
             <h2 className='text-[#101359] text-xl font-semibold'>Karan Desai</h2>
             <h3 className='text-[#101359] text-sm'>Automobile Engineering Expert</h3>
             <h4 className='text-sm text-[#8C8C8C]'>Expert in Powertrain, Chassis Design, and Diagnostics</h4>
             </div>
          </div>
      </div>
    </div>
 
    </section>
  )
}

export default OurTeam