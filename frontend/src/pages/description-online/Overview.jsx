"use client"
import { CircleCheck, GraduationCap, LibraryBig, MonitorSmartphone } from "lucide-react";
import React from "react";

const Overview = () => {
  return (
    <section className="space-y-4 font-dm-sans">
      <h2 className="text-xl font-semibold text-[#101359]">Course Description</h2>
      <p className="text-[#8C8C8C] leading-relaxed text-sm lg:text-md font-medium">
       Solid Model Remastering is a process in automotive design and engineering where an existing 3D CAD model is updated or revised to incorporate new changes or improvements.
      </p>
    <div className="grid lg:grid-cols-2 gap-6">
         <div className="bg-white shadow-lg space-y-3 px-6 py-5 w-full  xl:w-2/4 rounded-2xl">
            <h4 className="text-2xl font-semibold text-[#101359]">Online Meet Course</h4>
            <p className="text-[#8C8C8C] leading-relaxed text-md font-medium">Join live interactive classes with expert trainers, get real-time guidance, 
            and work on industry-oriented projects in a collaborative learning environment.</p>
            <h4 className="text-xl font-semibold text-[#101359]">Key Highlights</h4>
              <ul className="text-[#8C8C8C]  space-y-2">
                         <li className="flex items-center gap-3"><LibraryBig size={20}  className=" text-[#101359]"/>32 Interactive Modules | 120+ Hours of Video Lessons</li>
                        <li className="flex items-center gap-3"><GraduationCap size={20} className=" text-[#101359]"/>6 Months live interactive sessions</li>
                       <li className="flex items-center gap-3"> <MonitorSmartphone size={20}  className=" text-[#101359]"/>5 Quizzes & Assignments</li>
                     <li className="flex items-center gap-3"><CircleCheck size={20}  className=" text-[#101359]"/>Real-time Q&A with instructors</li>
                          <li className="flex items-center gap-3"><GraduationCap size={20}  className=" text-[#101359]"/>Certification on completion</li>
                  </ul>
         </div>
            <div className="bg-white shadow-lg space-y-3 px-6 py-5 w-full xl:w-2/4 rounded-2xl">
            <h4 className="text-2xl font-semibold text-[#101359]">Recorded Sessions</h4>
            <p className="text-[#8C8C8C] leading-relaxed text-md font-medium">
                Learn at your own pace with high-quality recorded video sessions. Access the course anytime, anywhere, and revisit lessons as needed for complete flexibility.
            </p>
            <h4 className="text-xl font-semibold text-[#101359]">Key Highlights</h4>
              <ul className="text-[#8C8C8C]  space-y-2">
                         <li className="flex items-center gap-3"><LibraryBig size={20}  className=" text-[#101359]"/>30+ hours of recorded content</li>
                        <li className="flex items-center gap-3"><GraduationCap size={20} className=" text-[#101359]"/>Certification of Completion</li>
                       <li className="flex items-center gap-3"> <GraduationCap size={20}  className=" text-[#101359]"/>Flexible self-paced learning</li>
                     <li className="flex items-center gap-3"><MonitorSmartphone size={20}  className=" text-[#101359]"/>Access on All Devices</li>
                          <li className="flex items-center gap-3"><CircleCheck size={20}  className=" text-[#101359]"/>Lifetime Access to all course content </li>
                  </ul>
         </div>
    </div>
    </section>
  );
}

export default Overview;