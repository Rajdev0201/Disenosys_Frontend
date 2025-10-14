import About from "@/pages/home/About";
import Banner from "@/pages/home/Banner";
import Count from "@/pages/home/Count";
import Course from "@/pages/home/Course";
import MarqueeView from "@/pages/home/MarqueeSlide";
import Partner from "@/pages/home/Partner";
import Placement from "@/pages/home/Placement";
import Process from "@/pages/home/Process";
import Testimonials from "@/pages/home/Testimonials";
import WhyChoose from "@/pages/home/WhyChoose";


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
