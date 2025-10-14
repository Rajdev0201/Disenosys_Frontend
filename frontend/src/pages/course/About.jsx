import Image from "next/image";
import React from "react";
import about from "@/components/assests/c0.jpg";
// import Toast from "@/components/custom/Toast";
const About = () => {
  return (
    <section>
    <div className="px-4 md:px-8 lg:px-36 py-20 mb-0 lg:mb-10">
      <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-10 items-center">
        
        {/* Left Side - Image */}
        <div className="flex justify-center">
          <Image
            src={about}
            alt="About Us"
            className="object-cover w-full max-w-sm sm:max-w-md md:max-w-lg rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side - Text Content */}
        <div className="flex flex-col space-y-4 font-dm-sans">
          <span className="text-xs lg:text-sm font-bold tracking-wide text-center xl:text-left text-[#101359]">COURSES THAT SHAPE CAREERS</span>
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#45D2FF] leading-snug text-center xl:text-left">
            <span className="text-[#101359]">Master</span> Automotive Body Design 
              <span className="text-[#101359]"> with Disenosys</span> 
          </h1>
          <p className="text-sm sm:text-base md:text-md font-medium leading-7 text-[#8C8C8C] text-center xl:text-left">
            Learn from industry experts through meticulously curated programs designed to make you job-ready.
             Choose from postgraduate and online certification courses tailored to the evolving demands of the automotive industry.

          </p>
        </div>
      </div>
      {/* <Toast /> */}
    </div>
    </section>
  );
};

export default About;