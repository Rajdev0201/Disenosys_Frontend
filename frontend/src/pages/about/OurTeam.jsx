import Image from 'next/image'
import React from 'react'
import team from "@/components/assests/team.jpg"
import Card from '@/components/custom/Card'



const data = [
  {
    name:"Senthilkumar S K",
    industry:"Senior BIW Project Lead",
    Experience:"16+ Years | OEM & Tier-1 Programs",
  }
]
const OurTeam = () => {
  return (
    <section>
   <div className="flex flex-col justify-center items-center font-dm-sans py-16 px-4 md:px-8 lg:px-16">
      {/* Section Heading */}
    <header>
      <span className="text-sm block font-bold tracking-wide text-center text-[#101359] mb-3">
        OUR TEAM
      </span>
      <h2 className="text-[#101359] text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center">
        Meet Our{" "}
        <span className="text-[#45D2FF]">Expert Team</span>
      </h2>
      <p className="text-sm sm:text-base md:text-lg font-medium leading-7 text-center max-w-2xl text-[#8C8C8C] mb-12">
        Empowering Engineers | Transforming Careers with Industry Experience
      </p>
  </header>

      {data.map((men,i) => (
      <div key={i} className='grid grid-cols-4 font-dm-sans'>
          <Card className='bg-white rounded-lg shadow-md'>
             <Image src={team} alt='team' className='object-cover rounded-tr-lg rounded-tl-lg'/>
             <div className='flex flex-col space-y-2 py-2 px-3'>
             <h2 className='text-[#101359] text-xl font-semibold'>{men.name}</h2>
             <h3 className='text-[#101359] text-sm'>{men.industry}</h3>
             <h4 className='text-sm text-[#8C8C8C]'>{men.Experience}</h4>
             </div>
          </Card>
      </div>
       ))}
    </div>
 
    </section>
  )
}

export default OurTeam