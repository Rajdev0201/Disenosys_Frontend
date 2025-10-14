"use client"
import Image from "next/image";
import React, { useState } from "react";
import D from "@/components/assests/dc.jpg"
import { Clock3, Facebook, Instagram, Lightbulb, Linkedin, ShieldCheck, Youtube } from "lucide-react";
import Button from "@/components/custom/Button";
import CourseModal from "@/components/modal/Enroll";

const CourseHeader = () => {
  const [isOpen,setIsOpen] = useState(false);

  return (
    <div className="font-dm-sans pt-4 lg:pt-12">
      <div className="px-4 lg:px-24 space-y-4">
        <h3 className="text-xl lg:text-3xl font-bold text-[#101359]">Solid Model Remastering</h3>
         <div className="flex gap-2 items-center">
              <p className="text-sm text-[#8C8C8C] font-medium">English</p>
              <p className="text-sm text-[#8C8C8C] font-medium">20+ Lessons</p>
              <p className="text-sm text-[#8C8C8C] font-medium">30+ Students</p>
         </div>
         <p className="text-sm font-medium text-[#8C8C8C]">4.8 Reviews</p>
      </div>
      <div className="px-0 lg:px-24 py-6 grid lg:grid-cols-12 gap-16 h-auto">
        {/* Left: Image */}
        <div className="lg:col-span-6 xl:col-span-8">
          <Image
            src={D}
            alt="Course Banner"
            className="rounded-lg w-full object-cover"
          />
        </div>

        {/* Right: Pricing card */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-[460px] lg:col-span-6 xl:col-span-4 space-y-4 relative">

          <div className="flex items-center gap-4">
            <div className="bg-white border-2 border-gray-200 shadow-md px-6 py-3 space-y-2 rounded-2xl">
              <span className="text-xs font-medium text-[#808080]">Online Meet Course</span>
              <h2 className="text-2xl font-semibold text-[#101359]">$49.65</h2>
               <p className="line-through text-sm text-[#101359]">$99.00</p>
             </div>
             <div className="bg-white border-2 border-gray-200 shadow-md px-6 py-3 space-y-2 rounded-2xl">
              <span className="text-xs font-medium text-[#808080]">Recorded Sessions</span>
              <h2 className="text-2xl font-semibold text-[#101359]">$49.65</h2>
               <p className="line-through text-sm text-[#101359]">$99.00</p>
             </div>
          </div>
          <p className="text-white bg-[#101359] p-1 rounded-2xl w-20 text-center text-sm">50% OFF</p>
          <p className="text-md font-medium text-[#808080]">Hurry! Offer ends soon</p>

          <div className="flex justify-between text-sm text-[#8C8C8C]">
             <div className="flex gap-2 items-center"><Clock3 size={15} className="text-[#101359]"/>Duration</div>
             <p>6 Months</p>
          </div>
            <div className="flex justify-between text-sm text-[#8C8C8C]">
             <div className="flex gap-2 items-center"><Lightbulb size={15} className="text-[#101359]"/>Quizzes</div>
             <p>5</p>
          </div>
             <div className="flex justify-between text-sm text-[#8C8C8C]">
             <div className="flex gap-2 items-center"><ShieldCheck size={15} className="text-[#101359]"/>Certificate</div>
             <p>Yes</p>
          </div> 

            <Button
              type="Submit"
              text="Enroll Now"
              onClick={() => setIsOpen(true)}
              className="px-6 py-2 rounded-3xl mt-4 hover:cursor-pointer bg-gradient-to-r w-full from-[#009EE0] to-[#45D2FF] text-white font-medium text-sm hover:opacity-90"
            />

          <div className="flex justify-center items-center space-x-4 mt-4 absolute bottom-2 left-10 lg:left-1/4 text-[#101359]">
            <span className="text-sm">share this course</span>
              <a href="https://youtube.com/@disenosysindia?feature=shared">
            <Youtube
              size={15}
              className="hover:text-gray-400 transition-colors"
            />
          </a>
          <a href="https://www.instagram.com/disenosys_official/">
            <Instagram
              size={15}
              className=" hover:text-gray-400 transition-colors"
            />
          </a>
          <a href="https://www.facebook.com/disenosysofficial/">
            <Facebook
              size={15}
              className=" hover:text-gray-400 transition-colors"
            />
          </a>
          <a href="https://www.linkedin.com/school/disenosys/">
            <Linkedin
              size={15}
              className=" hover:text-gray-400 transition-colors"
            />
          </a>
          </div>
        </div>
      </div>
               <CourseModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default CourseHeader;