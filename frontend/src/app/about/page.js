import Banner from '@/screens/about/Banner'
import Goals from '@/screens/about/Goals'
import Inspire from '@/screens/about/Inspire'
import OurTeam from '@/screens/about/OurTeam'
import About from '@/screens/about/WhoweAre'
import WhyChoose from '@/screens/about/WhyChoose'
import React from 'react'



export const metadata = () => { 
  return{
    title:"About"
  }
}

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