"use client";
import React, { useState } from "react";
import Overview from "@/pages/description-online/Overview";
import Review from "@/pages/description-online/Review";
import Tabs from "@/pages/description-online/Tab";
import CourseHeader from "./Header";
import { useSelector } from "react-redux";
import Curriculum from "./Curriculum";
import Mentor from "../course/Mentor";

const CourseDetails = ({ slug }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const courses = useSelector((state) => state?.course?.data);
  return (
    <div className="w-full min-h-screen mb-12">
      {courses
        ?.filter((course) => course.courseName === slug)
        ?.map((course, index) => (
          <div key={index}>
            <CourseHeader course={course} />
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="px-4 lg:px-24 py-6">
              {activeTab === "overview" && <Overview course={course}/>}
              {activeTab === "curriculum" && <Curriculum course={course}/>}
              {activeTab === "instructor" && <Mentor />}
              {activeTab === "reviews" && <Review />}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CourseDetails;
