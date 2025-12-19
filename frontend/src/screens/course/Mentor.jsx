import Image from "next/image";
import React from "react";
import team from "@/components/assests/team.jpg";
import { BriefcaseBusiness, ShieldCheck } from "lucide-react";

const mentors = [
  {
    name: "Bharadwaj",
    role: "Programme Director | Vehicle Engineer",
    description:
      "Bharadwaj is a seasoned Vehicle Engineer with 12+ years of global experience in the automotive industry, currently working at Ford, USA. He has led multinational product development teams and possesses end-to-end expertise in the product development life cycle, from concept to production.",
    keyExpertise: [
      "Cross-functional collaboration across product development, manufacturing, supplier quality, purchasing, and packaging",
      "End-to-end product development in Asia, Europe, and North America",
      "Six Sigma Green Belt, process optimization, team building, and continuous improvement",
    ],
    experience: [
      "Ford Motor Company, USA",
      "North Carolina University, USA",
      "ZF Group, Malaysia & Singapore",
    ],
  },
  // For demo, we repeat same data, but you can replace with different mentors
  {
    name: "Bharadwaj",
    role: "Programme Director | Vehicle Engineer",
    description:
      "Bharadwaj is a seasoned Vehicle Engineer with 12+ years of global experience in the automotive industry, currently working at Ford, USA. He has led multinational product development teams and possesses end-to-end expertise in the product development life cycle, from concept to production.",
    keyExpertise: [
      "Cross-functional collaboration across product development, manufacturing, supplier quality, purchasing, and packaging",
      "End-to-end product development in Asia, Europe, and North America",
      "Six Sigma Green Belt, process optimization, team building, and continuous improvement",
    ],
    experience: [
      "Ford Motor Company, USA",
      "North Carolina University, USA",
      "ZF Group, Malaysia & Singapore",
    ],
  },
  {
    name: "Bharadwaj",
    role: "Programme Director | Vehicle Engineer",
    description:
      "Bharadwaj is a seasoned Vehicle Engineer with 12+ years of global experience in the automotive industry, currently working at Ford, USA. He has led multinational product development teams and possesses end-to-end expertise in the product development life cycle, from concept to production.",
    keyExpertise: [
      "Cross-functional collaboration across product development, manufacturing, supplier quality, purchasing, and packaging",
      "End-to-end product development in Asia, Europe, and North America",
      "Six Sigma Green Belt, process optimization, team building, and continuous improvement",
    ],
    experience: [
      "Ford Motor Company, USA",
      "North Carolina University, USA",
      "ZF Group, Malaysia & Singapore",
    ],
  },
  {
    name: "Bharadwaj",
    role: "Programme Director | Vehicle Engineer",
    description:
      "Bharadwaj is a seasoned Vehicle Engineer with 12+ years of global experience in the automotive industry, currently working at Ford, USA. He has led multinational product development teams and possesses end-to-end expertise in the product development life cycle, from concept to production.",
    keyExpertise: [
      "Cross-functional collaboration across product development, manufacturing, supplier quality, purchasing, and packaging",
      "End-to-end product development in Asia, Europe, and North America",
      "Six Sigma Green Belt, process optimization, team building, and continuous improvement",
    ],
    experience: [
      "Ford Motor Company, USA",
      "North Carolina University, USA",
      "ZF Group, Malaysia & Singapore",
    ],
  },
];

const Mentor = () => {
  return (
   <section className="font-dm-sans py-16 px-4 md:px-8 lg:px-28">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <span className="text-sm font-bold tracking-wide text-[#101359]">
          FACULTIES
        </span>
        <h1 className="text-[#101359] text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          Meet Our <span className="text-[#45D2FF]">Expert Instructors</span>
        </h1>
        <p className="text-sm sm:text-base md:text-md font-medium leading-7 text-center max-w-3xl mx-auto text-[#8C8C8C]">
          Learn from industry leaders with years of global experience in
          automotive engineering and design.
        </p>
      </div>

      {/* Mentors Section */}
      <div className="space-y-16">
        {mentors.map((mentor, i) => (
          <div
            key={i}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            {/* Image */}
            <div
              className={`flex justify-center lg:justify-start ${
                i % 2 === 1 ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <Image
                src={team}
                alt={mentor.name}
                className="object-cover w-full max-w-sm sm:max-w-md md:max-w-lg rounded-lg shadow-lg"
              />
            </div>

            {/* Content */}
            <div
              className={`flex flex-col space-y-4 text-center lg:text-left ${
                i % 2 === 1 ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <h1 className="text-2xl font-bold tracking-wide text-[#101359]">
                {mentor.name}
              </h1>
              <h4 className="text-sm sm:text-md lg:text-xl font-medium text-[#101359] leading-snug">
                {mentor.role}
              </h4>
              <p className="text-sm sm:text-base md:text-md font-medium leading-7 text-[#8C8C8C]">
                {mentor.description}
              </p>

              <h5 className="text-md font-bold text-[#101359]">Key Expertise:</h5>
              {mentor.keyExpertise.map((item, idx) => (
                <p
                  key={idx}
                  className="text-sm flex items-start gap-2 font-medium text-[#8C8C8C]"
                >
                  <span className="bg-[#45D2FF] p-1 rounded-full">
                    <ShieldCheck size={20} color="white" />
                  </span>
                  {item}
                </p>
              ))}

              <h5 className="text-md font-bold text-[#101359]">
                Previous Experience:
              </h5>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6 sm:gap-12">
                {mentor.experience.map((exp, idy) => (
                  <div
                    key={idy}
                    className="flex gap-2 items-center bg-white rounded-2xl shadow-xl p-3"
                  >
                    <BriefcaseBusiness size={20} color="#45D2FF" />
                    <h2 className="text-sm font-medium text-[#8C8C8C]">{exp}</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Mentor;
