"use client";
import Button from "@/components/custom/Button";
import React, { useState } from "react";
import Pg from "@/pages/course/Pg";
import Course from "@/pages/home/Course";

const ProgramWeOffer = () => {
  const [activeTab, setActiveTab] = useState("pg");
  return (
    <section>
      <div className="flex flex-col justify-center items-center font-dm-sans py-4 lg:py-16 px-4 md:px-8 lg:px-16">
        {/* Section Heading */}
        <span className="text-xs lg:text-sm  font-bold tracking-wide text-[#101359] mb-3">
          PROGRAMES WE OFFER
        </span>
        <h1 className="text-[#101359] text-xl sm:text-3xl lg:text-4xl font-bold mb-2 text-center">
          Advance Your Career with{" "}
          <span className="text-[#45D2FF]">Expert-Led Training</span>
        </h1>
        <p className="text-sm sm:text-base md:text-md font-medium leading-7 text-center max-w-4xl text-[#8C8C8C] mb-12">
          Explore placement-driven diplomas and flexible online certifications
          tailored for industry needs.
        </p>

        {/* Tabs */}
        <div className="flex justify-center items-center bg-gray-200 shadow-inner rounded-2xl mb-0">
          <Button
            text="PG Programs"
            onClick={() => setActiveTab("pg")}
            className={`py-3 px-6 lg:px-12 font-medium text-sm md:text-base ${
              activeTab === "pg"
                ? "border-2 bg-[#101359] text-white rounded-2xl font-medium text-xs lg:text-md hover:cursor-pointer"
                : "text-gray-800 hover:text-gray-700 hover:cursor-pointer"
            }`}
          />

          <Button
            text="Online Courses"
            onClick={() => setActiveTab("online")}
            className={`px-5 lg:px-12 py-3 font-medium text-sm md:text-base ${
              activeTab === "online"
                ? "border-2 bg-[#101359] text-white rounded-2xl font-medium text-md hover:cursor-pointer"
                : "text-gray-800 hover:text-gray-700 hover:cursor-pointer"
            }`}
          />
        </div>
      </div>
                
          {/* Tabs content */}
          {
            activeTab === "pg" ? 
            <>
             <Pg/>
            </>
            :
            <>
             <Course c1="" c2="" c3="" c4=""/>
            </>
          }
    </section>
  );
};

export default ProgramWeOffer;
