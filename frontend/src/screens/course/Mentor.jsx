"use client";

import React from "react";
import { BriefcaseBusiness, ShieldCheck, Wrench } from "lucide-react";

/* ===========================
   Mentor Data
=========================== */
const mentors = [
  {
    name: "Senthil Kumar K",
    role: "Senior BIW Project Lead",
    experience: "16+ Years | OEM & Tier-1 Programs",
    description:
      "Senior BIW engineering leader with over 16 years of experience across global OEM and Tier-1 environments. Strong exposure to complete vehicle lifecycle activities from concept development to production support, while leading cross-functional engineering teams.",
    keyExpertise: [
      "Body-in-White (BIW) design & development",
      "Vehicle structure engineering & system integration",
      "Project leadership & delivery ownership",
      "OEM BIW standards & production intent design",
    ],
    tools: ["CATIA V5", "Siemens NX", "OEM BIW Standards"],
    initials: "SK",
  },
  {
    name: "Gopala Krishna Bikumalla",
    role:
      "Senior Automotive System Engineer – Thermal, Interior & Exterior Systems",
    experience: "18+ Years | Global OEM Programs (Europe, USA, India)",
    description:
      "Global automotive system engineer with 18+ years of experience across Europe, USA, and India. Specialized in cockpit systems, thermal and climate modules, and interior & exterior system integration for premium OEM programs.",
    keyExpertise: [
      "Thermal & climate system engineering",
      "Interior, exterior & cockpit module design",
      "Plastic design & mold feasibility",
      "System-level integration & validation",
    ],
    tools: ["CATIA V5", "Teamcenter", "SystemWeaver", "GBOM"],
    initials: "GK",
  },
  {
    name: "Sumit K. Tripathi",
    role: "Senior Automotive Seating Design Specialist & Project Lead",
    experience: "13+ Years | OEM & Tier-1 Seating Programs",
    description:
      "Automotive seating design specialist with 13+ years of experience across OEM and Tier-1 organizations. Expertise in complete seat system development, production support, and global OEM automotive programs.",
    keyExpertise: [
      "Complete automotive seating design & development",
      "Seat structures, foam & trim systems",
      "GD&T, feasibility & manufacturability",
      "Production support & OEM coordination",
    ],
    tools: ["CATIA V5", "ENOVIA", "Abaqus FEA", "GD&T"],
    initials: "ST",
  },
];

/* ===========================
   Avatar Component
=========================== */
const MentorAvatar = ({ initials }) => {
  return (
    <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-[#45D2FF] to-[#101359] flex items-center justify-center shadow-2xl">
      <span className="text-white text-6xl font-bold tracking-wider">
        {initials}
      </span>
    </div>
  );
};

/* ===========================
   Main Component
=========================== */
const Mentor = () => {
  return (
    <section className="font-dm-sans py-16 px-4 md:px-8 lg:px-28 bg-white">
      {/* Section Heading */}
      <div className="text-center mb-16">
        <span className="text-sm font-bold tracking-wide text-[#101359]">
          FACULTIES
        </span>
        <h1 className="text-[#101359] text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
          Meet Our <span className="text-[#45D2FF]">Expert Instructors</span>
        </h1>
        <p className="text-sm sm:text-base font-medium leading-7 max-w-3xl mx-auto text-[#8C8C8C]">
          Learn from industry leaders with real-world OEM experience in
          automotive engineering, system design, and product development.
        </p>
      </div>

      {/* Mentors */}
      <div className="space-y-20">
        {mentors.map((mentor, i) => (
          <div
            key={i}
            className="grid lg:grid-cols-2 gap-0 items-center"
          >
            {/* Avatar */}
            <div
              className={`flex justify-center lg:justify-center ${
                i % 2 === 1 ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <MentorAvatar initials={mentor.initials} />
            </div>

            {/* Content */}
            <div
              className={`flex flex-col space-y-4  ${
                i % 2 === 1 ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <h2 className="text-2xl mt-5 lg:mt-0 text-center lg:text-left font-bold text-[#101359]">
                {mentor.name}
              </h2>
              <h4 className="text-sm sm:text-lg font-medium text-center lg:text-left text-[#101359]">
                {mentor.role}
              </h4>

              <p className="text-sm sm:text-base text-start lg:text-left font-medium leading-7 text-[#8C8C8C]">
                {mentor.description}
              </p>

              {/* Key Expertise */}
              <h5 className="text-md font-bold text-[#101359]">
                Key Expertise
              </h5>
              {mentor.keyExpertise.map((item, idx) => (
                <p
                  key={idx}
                  className="text-sm flex items-start gap-2 font-medium text-[#8C8C8C]"
                >
                  <span className="bg-[#45D2FF] p-1 rounded-full">
                    <ShieldCheck size={18} color="white" />
                  </span>
                  {item}
                </p>
              ))}

              {/* Tools */}
              <h5 className="text-md font-bold text-[#101359] mt-3">
                Tools & Technologies
              </h5>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {mentor.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1 bg-[#F1F9FF] text-[#101359] text-sm px-3 py-1 rounded-full font-medium"
                  >
                    <Wrench size={14} />
                    {tool}
                  </span>
                ))}
              </div>

              {/* Experience */}
              <div className="mt-4 flex justify-center lg:justify-start">
                <div className="flex gap-2 items-center bg-white rounded-2xl shadow-lg p-3">
                  <BriefcaseBusiness size={20} color="#45D2FF" />
                  <span className="text-sm font-medium text-[#8C8C8C]">
                    {mentor.experience}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Mentor;
