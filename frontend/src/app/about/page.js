import Banner from '@/pages/about/Banner'
import Goals from '@/pages/about/Goals'
import Inspire from '@/pages/about/Inspire'
import OurTeam from '@/pages/about/OurTeam'
import About from '@/pages/about/WhoweAre'
import WhyChoose from '@/pages/about/WhyChoose'
import React from 'react'

const page = () => {
  return (
    <main>
        <Banner/>
        <About/>
        <Goals/>
        <WhyChoose/>
        <Inspire/>
        <OurTeam/>
    </main>
  )
}

export default page