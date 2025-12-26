import { useRouter } from "next/navigation";
import React from "react";

const courseData = [
  {
    slug: "pg-biw",
    title: "PG Diploma in Plastic BIW Design",
    courses: [
      "CATIA Foundations for Automotive Designers",
      "Advanced CATIA Surface",
      "Fundamentals Of BIW in Automotive Design",
      "Bracket And Reinforcements",
      "Automotive Close Volume & Feature Creation",
    ],
  },
  {
    slug: "PG Diploma – Plastic Trims",
    title: "PG Diploma in Plastic Trims Design",
    courses: [
      "CATIA Foundations for Automotive Designers",
      "Advanced CATIA Surface",
      "Fundamentals of Automotive Plastic Trims",
      "Surface Remastering for Automotive Designers",
      "Automotive Close Volume & Feature Creation",
    ],
  },
  {
    slug: "masters-body-design",
    title: "Masters in Automotive Body Design",
    courses: [
      "CATIA Foundations for Automotive Designers",
      "Advanced CATIA Surface",
      "Fundamentals of Automotive Plastic Trims",
      "Solid Model Remastering",
      "Surface Remastering for Automotive Designers",
      "Fundamentals Of BIW in Automotive Design",
      "Automotive B-Pillar Assembly",
      "Bracket And Reinforcements",
      "Automotive Close Volume & Feature Creation",
    ],
  },
];


const CourseList = ({ slug }) => {
  const selected = courseData.find((c) => c.title === slug);
  const router = useRouter();
  if (!selected) return null;
 
  return (
    <div className="space-y-4">
      <h2 className="text-md lg:text-xl font-semibold text-gray-900">
        {selected.title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {selected.courses.map((course, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl 
                       bg-gradient-to-br from-[#009EE0] to-[#45D2FF]
                       p-[1px] shadow-lg hover:scale-[1.02]
                       transition-transform duration-300 cursor-pointer"
                       onClick={() => router.push(`/description-online/${encodeURIComponent(course)}`)}
          >
            {/* Glass Card */}
            <div className="bg-white/90 backdrop-blur 
                            rounded-2xl p-4 h-full">
              <div className="flex items-start gap-3">
                
                {/* Number Badge */}
                <div className="min-w-9 h-9 rounded-full 
                                bg-gradient-to-br from-[#009EE0] to-[#45D2FF]
                                text-white flex items-center 
                                justify-center text-sm font-semibold">
                  {i + 1}
                </div>

                {/* Course Name */}
                <p className="text-xs lg:text-sm font-medium text-gray-800 leading-snug">
                  {course}
                </p>
              </div>
            </div>

            {/* Glow */}
            <div className="absolute inset-0 bg-purple-500/10 blur-xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;

