import Button from "@/components/custom/Button";
import Image from "next/image";
import React from "react";
import why from "@/components/assests/why.jpg";
import { MoveRight, Tv, Briefcase, Layers, CalendarClock } from "lucide-react";

const data = [
  {
    icon: <Tv className="w-8 h-8 text-[#45D2FF]" />,
    title: "100% LIVE INTERACTIVE CLASSES",
    Content:
      "Engage in live sessions with experts for an immersive learning experience.",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-[#45D2FF]" />,
    title: "100% JOB ASSISTANCE",
    Content:
      "Get job placement support from our expert placement cell to kickstart your career.",
  },
  {
    icon: <Layers className="w-8 h-8 text-[#45D2FF]" />,
    title: "HANDS-ON EXPERIENCE WITH 50+ PROJECTS",
    Content:
      "Work on industry projects to gain practical experience and build your portfolio.",
  },
  {
    icon: <CalendarClock className="w-8 h-8 text-[#45D2FF]" />,
    title: "WEEKEND CLASSES FOR WORKING PROFESSIONALS",
    Content:
      "Flexible weekend classes to accommodate the schedules of working professionals.",
  },
];

const WhyChoose = () => {
  return (
    <div className="bg-[#101359] font-dm-sans">
      <div className="px-4 md:px-8 lg:px-32 py-12">
        
        {/* Section Heading */}
        <span className="text-sm font-medium tracking-wide text-white">
          WHY CHOOSE US
        </span>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold md:w-3/4 leading-snug">
            Empowering Your Career with
            <span className="text-[#45D2FF]">
              {" "}Expert-Led, Practical, and Flexible Learning
            </span>
          </h1>
          <Button
            text="Get started"
            icon={<MoveRight size={18} color="white" />}
            className="flex items-center justify-center gap-2 bg-[linear-gradient(to_right,#45D2FF,#009EE0)] px-6 py-3 font-bold rounded-3xl text-white hover:cursor-pointer text-sm sm:text-base md:text-md"
          />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left - Image */}
          <Image
            src={why}
            alt="Why choose us"
            className="object-cover w-full max-w-sm sm:max-w-md md:max-w-md rounded-lg shadow-lg mx-auto md:mx-0"
          />

          {/* Right - Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col space-y-2">
                {item.icon}
                <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                <p className="text-[#F5F5F5] text-sm font-[300] leading-relaxed">
                  {item.Content}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
