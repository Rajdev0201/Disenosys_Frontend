"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Car, CheckCircle } from "lucide-react";

const CourseReady = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 text-gray-800">
      
      {/* Icon / Visual */}
      <div className="bg-white p-6 rounded-full shadow-xl mb-6">
        <Car className="w-16 h-16 text-blue-600 animate-bounce" />
      </div>

      {/* Main message */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">
        Courses Are Ready!
      </h1>
      <p className="text-center text-gray-600 md:text-lg mb-6 max-w-md">
        Our team is preparing the pre-recorded automobile course sections. 
        You'll be able to access them shortly. Stay tuned!
      </p>

      {/* Checkmark / Progress Icon */}
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle className="w-6 h-6 text-green-500" />
        <span className="text-green-600 font-medium">Course setup in progress</span>
      </div>

      {/* Action Button */}
      <button
        onClick={() => router.push("/course")}
        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
      >
        View Courses
      </button>

      {/* Optional visual footer */}
      <div className="mt-12 text-sm text-gray-500 text-center max-w-xs">
        ✅ All automobile course content will be available soon. Thank you for your patience!
      </div>
    </div>
  );
};

export default CourseReady;
