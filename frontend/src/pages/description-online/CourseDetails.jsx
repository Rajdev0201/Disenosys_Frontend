"use client"
import React, { useState } from "react";
import Overview from "@/pages/description-online/Overview";
import Review from "@/pages/description-online/Review";
import Tabs from "@/pages/description-online/Tab";
import CourseHeader from "./Header";

const CourseDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full min-h-screen mb-12">
      <CourseHeader/>

      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="px-4 lg:px-24 py-6">
        {activeTab === "overview" && <Overview />}
        {/* {activeTab === "list" && <CourseList />} */}
        {activeTab === "reviews" && <Review />}
      </div>
    </div>
  );
}

export default CourseDetails;
