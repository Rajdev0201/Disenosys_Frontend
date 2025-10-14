"use client";
import React, { useState } from "react";
import { CheckLine, CircleCheckBig, CircleX, GraduationCap, LibraryBig, MonitorCog, NotebookPen, Tag } from "lucide-react";
import Button from "../custom/Button";
import Image from "next/image";
import car from "@/components/assests/car.jpg"

const CourseModal = ({ isOpen, onClose  }) => {
  const [activeTab, setActiveTab] = useState("live"); // live | cart
   if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 font-dm-sans">
     <div className="bg-white w-full sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[40%] rounded-2xl shadow-lg overflow-y-auto max-h-[95vh] p-6 relative">
        {/* Close button */}
        <Button
          onClick={onClose}
          icon={<CircleX size={22} />}
          className="absolute top-1 right-2 text-gray-400 hover:text-gray-600 hover:cursor-pointer"
        />
         
     

        {/* Tabs */}
        <div className="flex border border-blue-100 rounded-2xl mb-4">
          <Button
          text="Live Program"
            onClick={() => setActiveTab("live")}
            className={`flex-1 py-2 font-medium text-sm md:text-base ${
              activeTab === "live"
                ? "border-2 bg-[#101359] text-white rounded-2xl font-medium text-md hover:cursor-pointer"
                : "text-gray-500 hover:text-gray-700 hover:cursor-pointer"
            }`}
          />
  
        
          <Button
          text="Add to Cart"
            onClick={() => setActiveTab("cart")}
            className={`flex-1 py-2 font-medium text-sm md:text-base ${
              activeTab === "cart"
                ? "border-2 bg-[#101359] text-white rounded-2xl font-medium text-md hover:cursor-pointer"
                : "text-gray-500 hover:text-gray-700 hover:cursor-pointer"
            }`}
          />
      
        </div>

        {/* Tab Content */}
        {activeTab === "live" ? (
          // Live Program Form
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center gap-1">
              <NotebookPen size={20} className="text-[#101359]"/>
              Course Enrollment
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              This course is available through online classes only. Instructor will
              contact you via WhatsApp for scheduling.
            </p>
            <p className="text-sm text-gray-500 mt-1">Fill in your details so the instructor can reach you.</p>
                  <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name*
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email*
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number*
            </label>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

           <div>
            <label className="block text-sm font-medium text-gray-700">
              Selected Course*
            </label>
            <input
              type="tel"
              placeholder=""
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex w-full gap-3 pt-4">
            <Button
              text="Cancel"
              onClick={onClose}
              className="px-5 py-2 border rounded-2xl w-full border-gray-300 text-gray-600 hover:bg-gray-100 font-[300] text-lg"
            />
            <Button
              type="submit"
              text="Submit"
              className="px-6 py-2 rounded-2xl bg-gradient-to-r w-full from-[#009EE0] to-[#45D2FF] text-white  font-[300] text-lg hover:opacity-90"
            />
          </div>
        </form>
          </div>
        ) : (
          // Add to Cart Section
        <div className="space-y-4">
  {/* Title */}
  <h2 className="text-base md:text-lg font-semibold text-gray-800 flex items-center gap-2">
    <Tag size={18} className="text-[#101359]" />
    Purchase this course
  </h2>
  <p className="text-sm text-[#8C8C8C]">
    Unlock full access to all modules, hands-on projects, and industry insights.
  </p>

  {/* Top Grid */}
  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
    {/* Left Content */}
    <div className="md:col-span-7">
      <h3 className="text-md md:text-lg font-semibold text-gray-800">
        Fundamentals of Plastic Trims
      </h3>
      <p className="text-sm text-[#8C8C8C] mt-1">
        Learn plastic trims from Scratch to Advanced
      </p>

      <h4 className="text-sm font-semibold text-gray-800 mt-4">
        What You’ll Learn:
      </h4>
      <ul className="mt-2 space-y-2 text-sm text-[#8C8C8C]">
        <li className="flex items-center gap-2">
          <CheckLine className="text-white p-1 rounded-full bg-green-500" size={18} />
          Comprehensive, high-quality video lessons
        </li>
        <li className="flex items-center gap-2">
          <CheckLine className="text-white p-1 rounded-full bg-green-500" size={18} />
          Core principles and advanced techniques
        </li>
        <li className="flex items-center gap-2">
          <CheckLine className="text-white p-1 rounded-full bg-green-500" size={18} />
          Hands-on experience with real-world projects
        </li>
        <li className="flex items-center gap-2">
          <CheckLine className="text-white p-1 rounded-full bg-green-500" size={18} />
          Key interview concepts and industry insights
        </li>
        <li className="flex items-center gap-2">
          <CheckLine className="text-white p-1 rounded-full bg-green-500" size={18} />
          Up-to-date industry practices and emerging trends
        </li>
      </ul>
    </div>

    {/* Right Image */}
    <div className="md:col-span-5">
      <Image
        src={car}
        alt="car"
        className="w-full h-auto object-cover rounded-lg"
      />
    </div>
  </div>

  {/* Features + Price Section */}
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mt-6">
    {/* Features List */}
    <ul className="space-y-3 text-sm text-[#8C8C8C] flex-1">
      <li className="flex items-center gap-2">
        <LibraryBig size={18} className="text-white p-1 rounded-full bg-[#101359]" />
        32 Modules | 30+ Hours Video Content
      </li>
      <li className="flex items-center gap-2">
        <GraduationCap size={18} className="text-white p-1 rounded-full bg-[#101359]" />
        Certification of Completion
      </li>
      <li className="flex items-center gap-2">
        <MonitorCog size={18} className="text-white p-1 rounded-full bg-[#101359]" />
        Access on All Devices
      </li>
      <li className="flex items-center gap-2">
        <CircleCheckBig size={18} className="text-white p-1 rounded-full bg-[#101359]" />
        Lifetime access to all content
      </li>
    </ul>

    {/* Price */}
    <div className="flex flex-col items-start lg:items-end gap-2">
      <p className="text-lg md:text-2xl font-bold text-gray-800">
        $49.65{" "}
        <span className="line-through text-gray-400 text-sm">$99.99</span>
      </p>
      <span className="bg-[#101359] text-white rounded-2xl px-4 py-1 text-sm font-semibold">
        50% OFF
      </span>
    </div>
  </div>

  {/* Action Buttons */}
  <div className="flex flex-col sm:flex-row gap-3 pt-4">
    <Button
      text="Cancel"
      onClick={onClose}
      className="px-5 py-2 border rounded-2xl w-full border-gray-300 text-gray-600 hover:bg-gray-100 font-medium text-sm md:text-base"
    />
    <Button
      type="submit"
      text="Add to Cart"
      className="px-6 py-2 rounded-2xl bg-gradient-to-r w-full from-[#009EE0] to-[#45D2FF] text-white font-medium text-sm md:text-base hover:opacity-90"
    />
  </div>
</div>

        )}
      </div>
    </div>
  );
};

export default CourseModal;
