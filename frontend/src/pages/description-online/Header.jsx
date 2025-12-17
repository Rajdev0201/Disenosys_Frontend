"use client";
import Image from "next/image";
import React, { useState } from "react";
import D from "@/components/assests/dc.jpg";
import {
  Clock3,
  Facebook,
  Instagram,
  Lightbulb,
  Linkedin,
  ShieldCheck,
  Youtube,
} from "lucide-react";
import Button from "@/components/custom/Button";
import CourseModal from "@/components/modal/Enroll";

const CourseHeader = ({ course }) => {
  const [isOpen, setIsOpen] = useState(false);
  const liveMRP = "43999";
  const recordMRP = "14999";

  const parsePrice = (price) => {
    if (!price) return 0;
    return Number(price.toString().replace(/,/g, ""));
  };

  const getDiscountPercentage = (original, selling) => {
    const mrp = parsePrice(original);
    const sell = parsePrice(selling);
    if (!original || !selling) return 0;
    return Math.round(((mrp - sell) / mrp) * 100);
  };

  const liveDiscount = getDiscountPercentage(liveMRP, course?.live);
  const recordDiscount = getDiscountPercentage(recordMRP, course?.record);

  return (
    <div className="font-dm-sans pt-4 lg:pt-12">
      <div className="px-4 lg:px-24 space-y-4" key={course?._id}>
        <h3 className="text-xl lg:text-3xl font-bold text-[#101359]">
          {course.courseName}
        </h3>
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
            <div className="bg-white border-2 border-gray-200 shadow-md px-6 py-3 space-y-2 rounded-2xl relative">
              <span className="text-xs font-medium text-[#808080]">
                Online Meet Course
              </span>
              <h2 className="text-2xl font-semibold text-[#101359]">
                ₹{course?.live}
              </h2>
              <p className="line-through text-sm text-[#101359]">₹{liveMRP}</p>
              {liveDiscount > 0 && (
                <span
                  className="absolute -top-3 left-0 text-xs 
                     bg-[#101359] text-white px-2 py-1
                     rounded-full"
                >
                  {liveDiscount}% OFF
                </span>
              )}
            </div>
            <div className="bg-white border-2 border-gray-200 shadow-md px-6 py-3 space-y-2 rounded-2xl relative">
              <span className="text-xs font-medium text-[#808080]">
                Recorded Sessions
              </span>
              <h2 className="text-2xl font-semibold text-[#101359]">
                ₹{course?.record}
              </h2>
              <p className="line-through text-sm text-[#101359]">
                ₹{recordMRP}
              </p>
              {recordDiscount > 0 && (
                <span
                  className="absolute -top-3 right-0 text-xs 
                     bg-[#101359] text-white px-2 py-1 
                     rounded-full"
                >
                  {recordDiscount}% OFF
                </span>
              )}
            </div>
          </div>

          <p className="text-md font-medium text-[#808080]">
            Hurry! Offer ends soon
          </p>

          <div className="flex justify-between text-sm text-[#8C8C8C]">
            <div className="flex gap-2 items-center">
              <Clock3 size={15} className="text-[#101359]" />
              Duration
            </div>
            <p>6 Months</p>
          </div>
          <div className="flex justify-between text-sm text-[#8C8C8C]">
            <div className="flex gap-2 items-center">
              <Lightbulb size={15} className="text-[#101359]" />
              Quizzes
            </div>
            <p>5</p>
          </div>
          <div className="flex justify-between text-sm text-[#8C8C8C]">
            <div className="flex gap-2 items-center">
              <ShieldCheck size={15} className="text-[#101359]" />
              Certificate
            </div>
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
      <CourseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        course={course}
      />
    </div>
  );
};

export default CourseHeader;
