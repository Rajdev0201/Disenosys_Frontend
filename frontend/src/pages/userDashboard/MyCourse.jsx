"use client"
import Image from "next/image";
import React from "react";
import car from "@/components/assests/car.jpg";
import Card from "@/components/custom/Card";
import { useRouter } from "next/navigation";

const MyCourse = () => {
  const router = useRouter();
  return (
    <section>
      <div className="px-4 lg:px-12 font-dm-sans h-screen">
        {/* Heading */}
        <h1 className="font-medium text-lg lg:text-2xl text-[#333333] mb-2 mt-4">
          My Courses
        </h1>
        <p className="font-medium text-xs lg:text-sm text-[#808080] mb-6">
          Access all your active and completed courses in one place
        </p>

        {/* courses */}

        <Card className="lg:col-span-5 relative overflow-hidden">
          {/* Locked Overlay */}
          <div className="absolute inset-0 bg-black/70 z-10 flex flex-col items-center justify-center text-center px-6">
            <span className="text-yellow-400 text-sm font-semibold mb-2">
              🎥 Live courses are active right now
            </span>

            <h3 className="text-white text-lg font-bold mb-2">
              Pre-Recorded Course Getting Ready
            </h3>

            <p className="text-gray-300 text-sm mb-4">
              Meanwhile, explore our{" "}
              <span className="text-[#45D2FF] font-semibold">
                Live Online Courses
              </span>{" "}
              and start learning today.
            </p>

            {/* Fake XP Progress */}
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div className="bg-[#45D2FF] h-2 rounded-full w-[35%]"></div>
            </div>

            <span className="text-xs text-gray-400 mb-4">
              Preparation Progress: 35%
            </span>

            {/* CTA */}
            <button
              onClick={() => router.push("/course")}
              className="bg-[#45D2FF] hover:bg-[#2bbde8] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg transition"
            >
              ▶ Choose Live Program
            </button>

            <span className="text-xs text-gray-400 mt-3">
              🎥 Learn live with industry experts
            </span>
          </div>

          {/* Existing Content (blurred background) */}
          <div className="blur-sm">
            <h4 className="text-sm text-[#333333] font-semibold mb-8">
              Recent enrolled course
            </h4>

            <div className="grid lg:grid-cols-2 gap-4 items-start">
              <Image
                src={car}
                alt="course-image"
                width={200}
                height={150}
                className="object-cover rounded-md shadow-sm"
              />

              <div className="flex flex-col space-y-2">
                <span className="inline-block bg-[#45D2FF] text-white text-xs font-medium px-3 py-1 rounded-full w-fit">
                  Plastic Trims
                </span>
                <h2 className="text-[#161439] text-md font-bold leading-snug">
                  Automotive Close Volume & Feature Creation
                </h2>
                <p className="text-sm font-medium text-[#8C8C8C] leading-snug">
                  Close volume refers to the space within a vehicle that is
                  enclosed by its exterior surfaces.
                </p>
                <span className="font-medium text-sm text-[#45D2FF]">
                  Happy Learning!
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default MyCourse;
