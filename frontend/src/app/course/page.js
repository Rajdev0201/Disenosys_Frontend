import About from "@/screens/course/About";
import Banner from "@/screens/course/Banner";
import Mentor from "@/screens/course/Mentor";
import ProgramWeOffer from "@/screens/course/ProgramWeOffer";
import Testimonials from "@/screens/course/Testimonials";
import Partner from "@/screens/home/Partner";



export const metadata = () => { 
  return{
    title:"Course"
  }
}

export default function CoursePage(){
    return (
        <main>
            <Banner/>
             <About/>
             <ProgramWeOffer/>
             <Testimonials/>
              <Mentor/>
             <Partner/>
        </main>
    )
}