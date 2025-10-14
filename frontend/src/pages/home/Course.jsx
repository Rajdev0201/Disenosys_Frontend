"use client";
import Button from "@/components/custom/Button";
import CourseModal from "@/components/modal/Enroll";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Course = ({c1,c2,c3,c4}) => {
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [courses,setCourses] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://disenosys-dkhj.onrender.com/api/v1/getAllCourses");
        setCourses(res.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const categories = [
    "All Courses",
    "Plastic Trims",
    "Mechatronics Engineering",
    "Mechanical Engineering",
    "BIW",
    "Automobile Engineering",
    "Launching Soon",
  ];
  const specificCourses = [
    "CATIA Foundations for Automotive Designers",
    "Advanced CATIA Surface",
    "Fundamentals Of BIW in Automotive Design",
    "Fundamentals of Plastic Trims",
    "Solid Model Remastering",
    "Automotive B-Pillar Assembly",
    "Bracket And Reinforcement",
    "Automotive Close Volume & Feature Creation",
    "Surface Remastering for Automotive Designers",
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
 
   const filteredCourses = courses?.filter(course => {
  const isInSpecificCourses = specificCourses.includes(course?.courseName);

  const isCategoryMatch =
    selectedCategory === "All Courses" ||
    course?.category?.some(cat => cat === selectedCategory);

  return isInSpecificCourses && isCategoryMatch;
});


  return (
    <section className="font-dm-sans">
      <div className="text-center space-y-0">
        <span className="text-sm font-bold tracking-wide text-[#101359] mb-3">
          {c1}
        </span>
        <h1 className="text-[#101359] text-2xl sm:text-3xl mt-3 lg:text-4xl font-bold mb-2 text-center">
          {c2} <span className="text-[#45D2FF]">{c3}</span>
        </h1>
        <p className={`text-sm sm:text-base md:text-md font-medium leading-7 text-center text-[#8C8C8C] 
           ${c4 !== "" ? "mb-10" : "mb-0" }
          `}>
          {c4}
        </p>
      </div>
      <div className={`flex flex-wrap items-center justify-center gap-10 border-b border-blue-100 
       ${c4 !== "" ? "mb-12" : "mb-8" }
       `}>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryChange(category)}
            disabled={category === "Launching Soon"}
            className={`pb-3 text-sm sm:text-base md:text-md font-medium transition-colors duration-300 border-b-2 ${
              category === selectedCategory
                ? "text-[#45D2FF] border-[#45D2FF]" // active → blue border
                : "text-gray-700 border-transparent hover:text-[#2229BF] hover:border-[#45D2FF]"
            } ${
              category === "Launching Soon"
                ? "cursor-not-allowed text-gray-400"
                : ""
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:px-12 xl:px-24 lg:py-4 bg-white">
        <div className='col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8'>
          {filteredCourses?.map((course) => (
            
            <div key={course?._id} className="flex flex-col justify-between bg-white rounded-lg shadow-lg overflow-hidden p-4 border border-gray-200 hover:cursor-pointer" >
        
              <div className="relative w-full h-48 mb-4">
                <img
                  src={course?.imagePath}
                  alt={course?.courseName}
                  className="object-cover w-full h-full"
                  width={250}
                  height={125}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col flex-grow font-garet" >
                <div className="font-medium stroke-2 text-xl mb-2 text-center " >{course?.courseName}</div>
                <p className="text-gray-500 font-medium text-md text-base mb-4 mt-2">{course?.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-base font-medium text-[#182073] flex items-center">More Info</span>
                       <Button
                  text="Enroll Now"
                  onClick={() => setIsOpen(true)}
                  className="flex items-center hover:cursor-pointer hover:bg-sky-300 justify-center gap-2 bg-[linear-gradient(to_right,#45D2FF,#009EE0)] w-40 text-white px-5 py-2 rounded-md text-center font-medium text-sm hover:opacity-90 transition"
                  />
                </div>
              </div>
        
            </div>
          ))}
        </div>
            <CourseModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </section>
  );
};

export default Course;
