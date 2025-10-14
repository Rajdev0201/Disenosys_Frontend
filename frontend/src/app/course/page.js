import About from "@/pages/course/About";
import Banner from "@/pages/course/Banner";
import Mentor from "@/pages/course/Mentor";
import ProgramWeOffer from "@/pages/course/ProgramWeOffer";
import Testimonials from "@/pages/course/Testimonials";
import Partner from "@/pages/home/Partner";




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