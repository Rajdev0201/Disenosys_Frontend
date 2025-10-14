"use client"
import { CircleCheck } from "lucide-react";
import React from "react";

const Overview = () => {
  return (
    <div className="space-y-4 font-dm-sans">
      <h2 className="text-xl font-semibold text-[#101359]">Course Description</h2>
      <p className="text-[#8C8C8C] leading-relaxed text-md font-medium">
       The Masters in Automotive Plastic Body Design is a specialized program designed to provide students with the technical knowledge and industry-relevant skills needed to design high-quality plastic components for 
       automotive, consumer products, and industrial applications.
      </p>
      <p className="text-[#8C8C8C] leading-relaxed text-md font-medium">This course combines theoretical learning with hands-on training, giving students a comprehensive understanding of:</p>

      <ul className="text-[#8C8C8C] space-y-2 text-md font-medium">
        <li className="flex items-center gap-1"><CircleCheck size={20}  className="bg-[#45D2FF] text-white p-0.5  rounded-full"/> Plastic materials, their properties, and practical applications</li>
        <li className="flex items-center gap-1"><CircleCheck size={20}  className="bg-[#45D2FF] text-white p-0.5  rounded-full"/>CAD-based plastic body and trim design</li>
           <li className="flex items-center gap-1"><CircleCheck size={20}  className="bg-[#45D2FF] text-white p-0.5  rounded-full"/>Injection molding and other manufacturing techniques</li>
              <li className="flex items-center gap-1"><CircleCheck size={20}  className="bg-[#45D2FF] text-white p-0.5  rounded-full"/>Tooling and surface finishing considerations</li>
           <li className="flex items-center gap-1"><CircleCheck size={20}  className="bg-[#45D2FF] text-white p-0.5  rounded-full"/>Real-world industry case studies and project applications</li>
               <li className="flex items-center gap-1"><CircleCheck size={20}  className="bg-[#45D2FF] text-white p-0.5  rounded-full"/>Industry-standard software and design validation tools</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 text-[#101359]">What You'll Learn</h3>
      <ul className=" text-[#8C8C8C] space-y-2 text-md font-medium">
              <li className="flex items-center gap-1"><CircleCheck size={20}  className="bg-[#45D2FF] text-white p-0.5  rounded-full"/>Comprehensive, high-quality lessons covering design principles</li>
             <li className="flex items-center gap-1"><CircleCheck size={20}  className="bg-[#45D2FF] text-white p-0.5  rounded-full"/>Core and advanced techniques for automotive body components</li>
                <li className="flex items-center gap-1"><CircleCheck size={20}  className="bg-[#45D2FF] text-white p-0.5  rounded-full"/>Hands-on experience through real-world projects</li>
             <li className="flex items-center gap-1"><CircleCheck size={20}  className="bg-[#45D2FF] text-white p-0.5  rounded-full"/>Industry-relevant case studies and design validation tools</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 text-[#101359]">Course Highlights</h3>
      <ul className="text-[#8C8C8C]  space-y-2">
             <li className="flex items-center gap-1"><CircleCheck size={20}  className="bg-[#45D2FF] text-white p-0.5  rounded-full"/>32 Interactive Modules | 120+ Hours of Video Lessons</li>
            <li className="flex items-center gap-1"><CircleCheck size={20}  className="bg-[#45D2FF] text-white p-0.5  rounded-full"/>Certification of Completion</li>
           <li className="flex items-center gap-1"><CircleCheck size={20}  className="bg-[#45D2FF] text-white p-0.5  rounded-full"/>Access on All Devices</li>
         <li className="flex items-center gap-1"><CircleCheck size={20}  className="bg-[#45D2FF] text-white p-0.5  rounded-full"/>Lifetime Access</li>
      </ul>
    </div>
  );
}

export default Overview;