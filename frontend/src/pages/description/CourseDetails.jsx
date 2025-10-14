"use client"
import React, { useState } from "react";
import Overview from "@/pages/description/Overview";
import CourseList from "@/pages/description/CourseList";
import Review from "@/pages/description/Review";
import Tabs from "@/pages/description/Tab";
import CourseHeader from "./Header";

const CourseDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full min-h-screen">
      <CourseHeader/>

      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="px-24 py-6">
        {activeTab === "overview" && <Overview />}
        {activeTab === "list" && <CourseList />}
        {activeTab === "reviews" && <Review />}
      </div>
    </div>
  );
}

export default CourseDetails;
