"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Card from "@/components/custom/Card";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API } from "@/components/utils/constant";
import car from "@/components/assests/car.jpg";

const MyCourse = () => {
const router = useRouter();

const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [activeType, setActiveType] = useState("online");
const nav = useRouter();

const fetchCourses = async (type) => {
setLoading(true);

try {
  const endpoint =
    type === "online"
      ? `${API}online-paid-dashboard`
      : `${API}offline-paid-dashboard`;

  const res = await axios.get(endpoint, {
    withCredentials: true,
  });

  setData(res?.data || []);
} catch (err) {
  console.log(err);
  setData([]);
} finally {
  setLoading(false);
}
};

const handleTypeChange = (type) => {
setActiveType(type);
fetchCourses(type);
};

useEffect(() => {
fetchCourses("online");
}, []);

  const goToVideoSection = (slug) => {
    nav.push(`/pre-record/${encodeURIComponent(slug)}`);
  };


return ( 
<section> <div className="px-4 lg:px-12 font-dm-sans min-h-screen">
{/* Heading */} <h1 className="font-medium text-lg lg:text-2xl text-[#333333] mb-2 mt-4">
My Courses </h1> <p className="font-medium text-xs lg:text-sm text-[#808080] mb-6">
Access all your active and completed courses in one place </p>

    {/* Buttons */}
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => handleTypeChange("online")}
        className={`px-5 py-2 rounded-md text-sm font-medium transition ${
          activeType === "online"
            ? "bg-[#45D2FF] text-white"
            : "bg-gray-100 text-gray-700 hover:cursor-pointer"
        }`}
      >
        Online Paid
      </button>

      <button
        onClick={() => handleTypeChange("offline")}
        className={`px-5 py-2 rounded-md text-sm font-medium transition ${
          activeType === "offline"
            ? "bg-[#45D2FF] text-white"
            : "bg-gray-100 text-gray-700 hover:cursor-pointer"
        }`}
      >
        Offline Paid
      </button>
    </div>

    {/* Loading */}
    {loading && (
      <div className="text-center text-gray-500 mt-10">Loading courses...</div>
    )}

    {/* Empty State */}
    {!loading && data?.length === 0 && (
      <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg p-10 mt-6">
        <Image
          src={car}
          alt="empty"
          width={120}
          height={120}
          className="opacity-40"
        />
        <h3 className="mt-4 text-lg font-semibold text-gray-700">
          No Courses Found
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          You haven't enrolled in any{" "}
          {activeType === "online" ? "online" : "offline"} paid courses yet.
        </p>
      </div>
    )}

    {/* Course List */}
    {!loading && data?.getCourseData?.length > 0 && (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        { data?.getCourseData?.map((course, index) => (
          <div
            key={index}
            className="shadow-md border rounded-md border-gray-200 p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => goToVideoSection(course.courseName)}
          >
            <img
              src={course?.imagePath || car}
              alt="course-image"
              width={200}
              height={200}
              className="object-cover rounded-md mb-3"
            />

            <span className="inline-block bg-[#45D2FF] text-white text-xs font-medium px-3 py-1 rounded-full mb-2">
              {course?.category || "Course"}
            </span>

            <h2 className="text-[#161439] text-md font-bold leading-snug mb-1">
              {course?.courseName}
            </h2>

            <p className="text-sm font-medium text-[#8C8C8C] leading-snug">
              {course?.description?.slice(0, 90)}...
            </p>

            <span className="font-medium text-sm text-[#45D2FF] mt-2 inline-block">
              Happy Learning!
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
</section>

);
};

export default MyCourse;
