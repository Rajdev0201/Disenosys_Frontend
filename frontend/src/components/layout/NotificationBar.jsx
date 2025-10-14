"use client";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import React from "react";
import Marquee from "react-fast-marquee";

const NotificationBar = () => {
  return (
    <section className="">
      <div className="grid grid-cols-12 fixed top-0 w-full bg-[#45D2FF] font-dm-sans z-50">
        {/* LEFT DIV (with diagonal / cut at top-right) */}
        <div className="col-span-8 md:col-span-10">
          <div
            className="overflow-hidden font-garet bg-[#101359] py-3 
        [clip-path:polygon(0_0,100%_0,calc(100%_-_20px)_100%,0_100%)]"
          >
            <Marquee
              speed={80}
              pauseOnHover={true}
              direction="left"
              gradient={false}
              className="flex items-center"
            >
              <div className="relative w-full overflow-hidden py-0">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
                  <p className="text-white text-sm font-medium">
                    ⏳ New Batch Starting Soon! Enroll Now & Upgrade Your
                    Skills! 📚
                  </p>
                  <p className="text-white text-sm font-medium">
                    💼 Job Assistance Included! Learn from Industry Experts! 🏆
                  </p>
                  <p className="text-white text-sm font-medium">
                    ⏳ Limited Seats Available! Don&apos;t Miss Out! 🚀
                  </p>
                </div>
              </div>
            </Marquee>
          </div>
        </div>

        {/* RIGHT DIV */}
        <div className="col-span-4 md:col-span-2">
          <div className="bg-[#45D2FF] flex gap-1 md:gap-3 py-2.5 justify-center items-center">
            <div className="w-6 h-6 flex items-center p-1 md:p-0 justify-center rounded-full bg-white">
              <Youtube size={16} className="text-[#45D2FF]" />
            </div>
            <div className="w-6 h-6 flex items-center p-1 md:p-0 justify-center rounded-full bg-white">
              <Instagram size={16} className="text-[#45D2FF]" />
            </div>
            <div className="w-6 h-6 flex items-center  p-1 md:p-0 justify-center rounded-full bg-white">
              <Facebook size={16} className="text-[#45D2FF]" />
            </div>
            <div className="w-6 h-6 flex items-center  p-1 md:p-0 justify-center rounded-full bg-white">
              <Linkedin size={16} className="text-[#45D2FF]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationBar;
