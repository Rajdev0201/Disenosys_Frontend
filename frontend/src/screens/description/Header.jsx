"use client"
import Image from "next/image";
import React, { useState } from "react";
import D from "@/components/assests/dc.jpg"
import { Clock3, Facebook, Instagram, Lightbulb, Linkedin, ShieldCheck, Youtube } from "lucide-react";
import Button from "@/components/custom/Button";
import CourseModal from "@/components/modal/Enroll";


const courseData = [
  {
    title: "PG Diploma in BIW Design",
    price:"1,39,999",
    orginal:"1,99,999"
  },
  {
    title: "PG Diploma in Plastic Trims Design",
    price:"1,39,999",
    orginal:"1,99,999"
  },
  {
    title: "Masters in Automotive Body Design",
    price:"2,39,999",
    orginal:"2,99,999"
  },
];

const CourseHeader = ({slug}) => {
    const [isOpen,setIsOpen] = useState(false);
    const course = {
      courseName:slug
    };
   const selected = courseData.find((c) => c.title === slug);
     const parsePrice = (price) => {
     if (!price) return 0;
     return Number(price.toString().replace(/,/g, ""));
    };

   const getDiscountPercentage = (original, selling) => {
   const mrp = parsePrice(original);
   const sell = parsePrice(selling)
  if (!original || !selling) return 0;
  return Math.round(((mrp - sell) / mrp) * 100);
};


const liveDiscount = getDiscountPercentage(selected.orginal,selected.price);
  if (!selected) return null;
  return (
    <div className="font-dm-sans pt-4 lg:pt-12">
      <div className="px-4 lg:px-24 space-y-4">
        <h3 className="text-xl lg:text-3xl font-bold text-[#101359]">{selected.title}</h3>
         <div className="flex gap-2 items-center">
              <p className="text-sm text-[#8C8C8C] font-medium">English</p>
              <p className="text-sm text-[#8C8C8C] font-medium">20+ Lessons</p>
              <p className="text-sm text-[#8C8C8C] font-medium">30+ Students</p>
         </div>
         <p className="text-sm font-medium text-[#8C8C8C]">4.8 Reviews</p>
      </div>
      <div className="px-4 sm:px-6 lg:px-24 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 xl:gap-20">
        {/* Left: Image */}
        <div className="col-span-12 lg:col-span-8">
          <Image
            src={D}
            alt="Course Banner"
            className="rounded-lg w-full object-cover"
          />
        </div>

        {/* Right: Pricing card */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-[400px] col-span-12 lg:col-span-4 space-y-3 relative">
          <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-[#101359]">₹{selected.price}</h2>
          <p className="line-through text-sm text-[#101359]">₹{selected.orginal}</p>
          </div>
          <p className="text-white bg-[#101359] p-1 rounded-2xl w-20 text-center text-sm">{liveDiscount}% OFF</p>
          <span className="text-xs text-[#808080] mb-2">EMI starts from <b>₹4,888/</b>- per month</span>
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
              text="Book Now"
              onClick={() => setIsOpen(true)}
              className="px-6 py-2 rounded-3xl mt-4 hover:cursor-pointer bg-gradient-to-r w-full from-[#009EE0] to-[#45D2FF] text-white font-medium text-sm hover:opacity-90"
            />

          <div className="flex justify-center items-center space-x-4 mt-4 absolute bottom-2 left-1/4 text-[#101359]">
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
       <CourseModal isOpen={isOpen} onClose={() => setIsOpen(false)} course={course} pp="yes"/>
    </div>
  );
}

export default CourseHeader;