"use client"
import Image from "next/image";
import React from "react";
import car from "@/components/assests/car.jpg";
import speed from "@/components/assests/speed.jpg";
import CustomDatePicker from "@/components/custom/DatePicker";
import UserList from "./LeaderBoardList";
import profile from "@/components/assests/u-d.png";
import { BriefcaseBusiness, FileCheck } from "lucide-react";
import TodoList from "./ToDoList";
import Button from "@/components/custom/Button";
import Card from "@/components/custom/Card";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Dashboard = () => {
   const {data} = useSelector((state) => state.user);
   const router = useRouter();
  return (
    <section>
      <div className="px-4 xl:px-12 font-dm-sans h-screen">
        {/* Heading */}
        <h1 className="font-medium text-lg lg:text-2xl text-[#333333] mb-2 mt-4">
          {data?.userName} 👋
        </h1>
        <p className="font-medium text-xs lg:text-sm text-[#808080] mb-6">
          Welcome back! Let’s continue your learning journey.
        </p>

        {/* 1st grid box */}
        <div className="grid lg:grid-cols-12 lg:gap-3 xl:gap-8">
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
      Meanwhile, explore our <span className="text-[#45D2FF] font-semibold">Live Online Courses</span> and start learning today.
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
          Close volume refers to the space within a vehicle that is enclosed by its exterior surfaces.
        </p>
        <span className="font-medium text-sm text-[#45D2FF]">
          Happy Learning!
        </span>
      </div>
    </div>
  </div>
          </Card>


          <Card className="lg:col-span-4 relative overflow-hidden">
  {/* GAME MODE LOCK OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60 z-10 flex flex-col items-center justify-center px-5 text-center">
    <span className="text-yellow-400 text-xs font-bold tracking-wide mb-2">
  🚧 PRE-RECORDED COURSE IN PROGRESS
</span>


    <h3 className="text-white text-base font-bold mb-2">
      Unlock Performance Stats
    </h3>

    <p className="text-gray-300 text-xs mb-4 leading-relaxed">
      Complete your first <span className="text-[#45D2FF] font-semibold">Live Online Course</span>
      to track assignments, grades & speed.
    </p>

    {/* XP BAR */}
    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
      <div className="bg-[#45D2FF] h-2 rounded-full w-[35%]"></div>
    </div>

    <span className="text-[11px] text-gray-400 mb-4">
      Pre-recorded course is getting ready • Progress 35%
    </span>


    {/* CTA */}
    <button
      onClick={() => router.push("/course")}
      className="bg-[#45D2FF] hover:bg-[#2bbde8] text-white px-5 py-2 rounded-full text-xs font-semibold shadow-md transition"
    >
      ▶ Start Live Mission
    </button>

    <span className="text-[10px] text-gray-400 mt-3">
  🎥 Meanwhile, start learning with Live Online Classes
</span>

  </div>

  {/* BLURRED ORIGINAL CONTENT */}
  <div className="blur-sm pointer-events-none">
    <h4 className="text-sm text-[#333333] font-semibold mb-4">
      Performance
    </h4>

    <div className="flex gap-6 mb-3 justify-between items-center">
      <div className="flex gap-2 items-center">
        <div className="bg-[#45D2FF] w-4 h-4"></div>
        <h5 className="text-xs font-bold text-[#42404C]">
          Assignment Submission Performance
        </h5>
      </div>
      <select className="bg-[#F5F5F5] rounded-xs p-1 text-[#808080] outline-none shadow-inner text-xs">
        <option>monthly</option>
      </select>
    </div>

    <div className="flex justify-center mb-5">
      <Image
        src={speed}
        alt="time speed"
        width={150}
        height={150}
        className="object-cover rounded-md shadow-sm"
      />
    </div>

    <p className="text-[#8C8C8C] font-semibold text-center">
      Your Grade: <span className="text-[#000000]">8.966</span>
    </p>
  </div>
</Card>


          <div className="lg:col-span-3">
            <CustomDatePicker />
          </div>
        </div>

        {/* 2nd grid box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">

          <Card className="lg:col-span-7 xl:col-span-9">
            <h4 className="text-sm text-[#333333] font-semibold mb-2">
              Top Rankers
            </h4>
            <UserList bar="no" list="3" />
          </Card>

  <Card className="lg:col-span-5 xl:col-span-3 relative border border-gray-200 bg-white shadow-sm rounded-md lg:p-4 overflow-hidden">
  
  {/* STATS LOCK OVERLAY */}
  <div className="absolute inset-0 bg-black/70 z-10 flex flex-col items-center justify-center text-center px-4">
    <span className="text-yellow-400 text-xs font-semibold mb-2">
      🚧 LEARNING STATS IN PROGRESS
    </span>

    <h3 className="text-white text-sm font-bold mb-2">
      Your Learning Records Are Getting Ready
    </h3>

    <p className="text-gray-300 text-xs mb-4 leading-relaxed">
      Once you start a <span className="text-[#45D2FF] font-semibold">Live Online Course</span>,
      your rank, score & hours will appear here.
    </p>

    {/* Progress */}
    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
      <div className="bg-[#45D2FF] h-2 rounded-full w-[35%]"></div>
    </div>

    <span className="text-[11px] text-gray-400 mb-4">
      Records Setup Progress: 35%
    </span>

    {/* CTA */}
    <button
      onClick={() => router.push("/course")}
      className="bg-[#45D2FF] hover:bg-[#2bbde8] text-white px-5 py-2 rounded-full text-xs font-semibold shadow-md transition"
    >
      ▶ Start Live Course
    </button>

    <span className="text-[10px] text-gray-400 mt-3">
      🎥 Live classes • Assignments • Real scores
    </span>
  </div>

  {/* ORIGINAL CONTENT (BLURRED) */}
           <div className="blur-sm pointer-events-none space-y-3 lg:px-3">
    {/* keep your existing code here exactly */}
         <p className="flex gap-2 items-center font-semibold text-sm text-[#333333]">
                <BriefcaseBusiness size={20} color="#45D2FF" /> Rank :{" "}
                <span className="text-[#808080] text-xs">
                  #5 among 120 students
                </span>
              </p>
              <p className="flex gap-2 items-center font-semibold text-sm text-[#333333]">
                <BriefcaseBusiness size={20} color="#45D2FF" /> Overall Score :{" "}
                <span className="text-[#808080] text-xs">8.96 / 10</span>
              </p>
              <p className="flex gap-2 items-center font-semibold text-sm text-[#333333]">
                <BriefcaseBusiness size={20} color="#45D2FF" /> Total hours :{" "}
                <span className="text-[#808080] text-xs">56 hrs</span>
              </p>
              <p className="flex gap-2 items-center font-semibold text-sm text-[#333333]">
                <BriefcaseBusiness size={20} color="#45D2FF" /> Active Course :{" "}
                <span className="text-[#808080] text-xs">4</span>
              </p>
              <p className="flex gap-2 items-center font-semibold text-sm text-[#333333]">
                <BriefcaseBusiness size={20} color="#45D2FF" /> Score :{" "}
                <span className="text-[#808080] text-xs">8.567</span>
              </p>
            </div>
        </Card>
        </div>

        {/* 3rd grid box */}
        <div className="grid lg:grid-cols-12 gap-6 mt-6">
          <Card className="lg:col-span-9">
            <h4 className="text-sm text-[#333333] font-semibold mb-2">
              Resources
            </h4>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-5 mt-10 lg:w-full">
              {/* add Resources */}
              <div className="flex items-center gap-2">
                <FileCheck size={30} className="text-[#45D2FF]" />
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col space-y-1">
                  <h4 className="text-sm font-bold text=[#121212]">
                    Plastic_trims.png
                  </h4>
                  <p className="text-xs font-medium text-[#8C8C8C]">
                    High-quality reference image for vehicle plastic trim
                    components.
                  </p>
                  </div>
                       <span className="text-xs lg:text-md">8.5 MB</span>
                </div>
              </div>
         
              <Button
                text="Download"
                className="text-md font-medium text-[#45D2FF] hover:cursor-pointer"
              />
            </div>
          </Card>

          <Card className="lg:col-span-3">
            {/* To-do list */}
            <TodoList />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
