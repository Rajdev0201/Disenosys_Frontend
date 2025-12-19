import About from "@/screens/home/About";
import Banner from "@/screens/home/Banner";
import Count from "@/screens/home/Count";
import Course from "@/screens/home/Course";
import MarqueeView from "@/screens/home/MarqueeSlide";
import Partner from "@/screens/home/Partner";
import Placement from "@/screens/home/Placement";
import Process from "@/screens/home/Process";
import Testimonials from "@/screens/home/Testimonials";
import WhyChoose from "@/screens/home/WhyChoose";




export const metadata = () => { 
  return{
    title:"Home"
  }
}

export default function Home() {
  return (
    <div className="">
      <Banner/>
      <About/>
      <WhyChoose/>
      <Process/>
      <Count/>
      <MarqueeView/>
      <Testimonials/>
      <Placement/>
      <Course c1="ONLINE COURSES" c2="Explore Our" c3="Online Courses" c4="Discover structured learning paths designed for real-world applications."/>
      <Partner/>
    </div>
  );
}
