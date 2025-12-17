"use client";
import { useToast } from "@/components/context/ToastContext";
import Button from "@/components/custom/Button";
import Card from "@/components/custom/Card";
import CourseModal from "@/components/modal/Enroll";
import { CourseLoader } from "@/components/utils/Loader";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Course = ({ c1, c2, c3, c4 }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const { data, loading } = useSelector((state) => state.course);
  const user = useSelector((state) => state.user.data);
  const [isOpen, setIsOpen] = useState(false);
  const nav = useRouter();
  const sectionRef = useRef(null);
  const hasFired = useRef(false); // stops multiple triggers
  const [selectedCourse, setSelectedCourse] = useState(null);
  const {showToast} = useToast();

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !hasFired.current) {
          hasFired.current = true;

          // FIRE CONFETTI
          confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 },
          });
        }
      },
      { threshold: 0.2 } // make it easy to trigger
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const handleClick = (course) => {
    if (user !== null) {
      setIsOpen(true);
      setSelectedCourse(course);
    } else {
      showToast("warning","Enroll Warn","please sign in your account");
    }
  };

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

  const filteredCourses = data?.filter((course) => {
    const isInSpecificCourses = specificCourses.includes(course?.courseName);

    const isCategoryMatch =
      selectedCategory === "All Courses" ||
      course?.category?.some((cat) => cat === selectedCategory);

    return isInSpecificCourses && isCategoryMatch;
  });

  const goToDescriptionPage = (slug) => {
    nav.push(`/description-online/${encodeURIComponent(slug)}`);
  };

  return (
    <section className="font-dm-sans" ref={sectionRef}>
      <header className="text-center space-y-0">
        <span className="text-sm font-bold tracking-wide text-[#101359] mb-3">
          {c1}
        </span>
        <h1 className="text-[#101359] text-2xl sm:text-3xl mt-3 lg:text-4xl font-bold mb-2 text-center">
          {c2} <span className="text-[#45D2FF]">{c3}</span>
        </h1>
        <p
          className={`text-sm sm:text-base md:text-md font-medium leading-7 text-center text-[#8C8C8C] 
           ${c4 !== "" ? "mb-10" : "mb-0"}
          `}
        >
          {c4}
        </p>
      </header>
      <div
        className={`flex flex-wrap items-center justify-center gap-10 border-b border-blue-100 
       ${c4 !== "" ? "mb-12" : "mb-8"}
       `}
      >
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
      {!data && (
        <p className="text-red-500 text-center font-mono">
          No Course Available
        </p>
      )}
      {!loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:px-12 xl:px-24 py-4">
          {filteredCourses?.map((course) => (
            <Card
              key={course._id}
              className="flex flex-col justify-between overflow-hidden p-4 hover:cursor-pointer"
            >
              <div
                className="relative w-full h-48 mb-4"
                onClick={() => goToDescriptionPage(course.courseName)}
              >
                <img
                  src={course?.imagePath}
                  alt={course?.courseName}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>

              <article className="flex flex-col flex-grow font-garet">
                <div className="font-medium text-xl mb-2 text-center">
                  {course?.courseName}
                </div>

                <p className="text-gray-500 text-base mb-4 mt-2">
                  {course?.description}
                </p>

                <div className="flex justify-between items-center mt-auto">
                  <span
                    className="text-base font-medium text-[#182073] cursor-pointer"
                    onClick={() => goToDescriptionPage(course.courseName)}
                  >
                    More Info
                  </span>

                  <Button
                    text="Enroll Now"
                    onClick={() => handleClick(course)}
                    className="flex items-center justify-center gap-2 hover:cursor-pointer bg-[linear-gradient(to_right,#45D2FF,#009EE0)] w-40 text-white px-5 py-2 rounded-md text-center font-medium text-sm hover:opacity-90 transition"
                  />
                </div>
              </article>
            </Card>
          ))}

          <CourseModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            course={selectedCourse}
          />
        </div>
      ) : (
        <CourseLoader />
      )}
    </section>
  );
};

export default Course;
