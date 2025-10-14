"use client"
import { motion } from "framer-motion";


const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: "spring",
    },
  }),
};

const AdmissionCourses = () => {
    
    const courses = [
        { title: "CATIA Foundations for Automotive Designers", color: "from-blue-800 to-sky-500" },
        { title: "Advanced CATIA Surface", color: "from-sky-500 to-sky-200" },
        { title: "Fundamentals Of BIW in Automotive Design", color: "from-blue-800 to-sky-500" },
        { title: "Fundamentals of Plastic Trims", color: "from-blue-800 to-sky-500" },
        { title: "Solid Model Remastering", color: "from-sky-500 to-sky-200" },
        { title: "Automotive B-Pillar Assembly", color: "from-blue-800 to-sky-500" },
        { title: "Bracket And Reinforcement", color: "from-blue-800 to-sky-500" },
        { title: "Automotive Close Volume & Feature Creation", color: "from-sky-500 to-sky-200" },
        { title: "Surface Remastering for Automotive Designers", color: "from-blue-800 to-sky-500" },
      ];
      
  return (
 <div className="bg-white py-6 px-6 font-dm-sans">
  <motion.h2
    className="text-3xl font-bold text-center mb-10 text-blue-500"
    initial={{ opacity: 0, y: -30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: false, amount: 0.3 }}
  >
       <div className="flex flex-col justify-center items-center font-dm-sans py-3 px-4 md:px-8 lg:px-6">
        {/* Section Heading */}
        <span className="text-sm font-bold tracking-wide text-[#101359] mb-3">
          Courses
        </span>
        <h1 className="text-[#101359] text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center">
         Choose Your <span className="text-[#45D2FF]">Course</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-medium leading-7  text-center lg:text-start max-w-3xl text-[#8C8C8C]">
          Find the perfect program to match your career goals and passion.
        </p>
      </div>
  </motion.h2>

  <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
    {courses?.map((course, idx) => (
      <motion.div
        key={idx}
        className={`rounded-lg text-white p-6 bg-gradient-to-r ${course?.color} shadow-lg h-full flex flex-col`}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        custom={idx}
        viewport={{ once: false, amount: 0.3 }}
      >
        <h3 className="text-xl font-semibold">{course?.title}</h3>
        <p className="mt-2 text-sm flex-grow font-semibold">
          Dive into hands-on projects and interactive lessons taught by professionals.
        </p>
        {/* optional footer button */}
        {/* <button className="mt-4 bg-white text-blue-600 px-3 py-1 rounded-md">Learn More</button> */}
      </motion.div>
    ))}
  </div>
</div>

  );
};

export default AdmissionCourses;
