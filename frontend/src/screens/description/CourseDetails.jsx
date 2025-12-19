"use client"
import React, { useState } from "react";
import Overview from "@/screens/description/Overview";
import CourseList from "@/screens/description/CourseList";
import Review from "@/screens/description/Review";
import Tabs from "@/screens/description/Tab";
import CourseHeader from "./Header";


const CourseDetails = ({slug}) => {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <div className="w-full min-h-screen">
      <CourseHeader slug={slug}/>

      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="px-4 lg:px-24 py-6">
        {activeTab === "overview" && <Overview slug={slug} />}
        {activeTab === "list" && <CourseList slug={slug}/>}
        {activeTab === "reviews" && <Review />}
      </div>

    </div>
  );
}

export default CourseDetails;
