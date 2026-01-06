"use client"
import React from "react";
import { motion } from "framer-motion";


const data = [
    {
        name:"Students taught",
        count:"250+",
    },
    {
        name:"Projects completed",
        count:"50+",
    },
    {
        name:"Years of experience",
        count:"5+",
    },
    // {
    //     name:"test",
    //     count:"5k",
    // },

]
const About = () => {
  return (
    <div className="flex justify-center items-center flex-col bg-[#101359] space-y-2 py-6 border-b border-gray-800">
     <motion.h2
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="text-2xl md:text-5xl font-extrabold text-center mb-9 text-white"
  >
    Meet <span className="text-[#45D2FF]">Your Lead Project Mentor</span>
  </motion.h2>
      <h3 className="text-white text-xl lg:text-2xl lg:mb-2">I'm Rajkumar - Senior MERN Stack Developer.</h3>
      <p className=" text-white text-md lg:text-md text-center w-3/4 lg:w-2/4 mb-16">
        I’ve spent 5+ years in software engineering, and my goal isn’t just to
        teach you to code — it’s to help you think like a professional software
        engineer, master problem-solving, and build skills you’ll use for life.
      </p>
          
      <div className="grid lg:grid-cols-3">
        {data.map((data => 
        <div key={data.name} className=" px-4">
          <div className="relative flex flex-col justify-center rounded-xl border border-gray-700 px-12 py-6 text-center w-full hover:scale-105 transition-transform duration-300 ease-in-out mb-6">
            <div className="absolute top-0 left-0 w-full h-[2px] overflow-hidden rounded-t-xl">
              <div className="mx-auto w-32 h-full bg-gradient-to-r from-transparent via-[#45D2FF] to-transparent rounded-full" />
            </div>

            <h1 className="text-5xl font-bold text-[#45D2FF] mb-2">{data.count}</h1>
            <h3 className="text-gray-500 text-lg">{data.name}</h3>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default About;
