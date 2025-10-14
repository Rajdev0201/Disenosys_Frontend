import Image from "next/image";
import React from "react";
import p1 from "@/components/assests/p1.jpg";
import p2 from "@/components/assests/p2.jpg";
import p3 from "@/components/assests/p3.jpg";
import line from "@/components/assests/line.jpg";

const steps = [
  {
    id: 1,
    title: "LEARN",
    desc: "Gain in-depth knowledge through our interactive lessons. Our expert instructors will guide you with real-world examples.",
    img: p1,
  },
  {
    id: 2,
    title: "GRADUATE",
    desc: "Earn a recognized certificate upon course completion. Join our network of successful alumni who have advanced their careers.",
    img: p2,
  },
  {
    id: 3,
    title: "WORK",
    desc: "Apply your skills in practical, industry-based projects. Our job assistance ensures you are prepared for the professional world.",
    img: p3,
  },
];

const Process = () => {
  return (
    <div className="flex flex-col justify-center items-center font-dm-sans py-16 px-4 md:px-8 lg:px-16">
      {/* Section Heading */}
      <span className="text-sm font-bold tracking-wide text-[#101359] mb-3">
        OUR WORK PROCESS
      </span>
      <h1 className="text-[#101359] text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center">
        Our Proven{" "}
        <span className="text-[#45D2FF]">Placement Process</span>
      </h1>
      <p className="text-sm sm:text-base md:text-lg font-medium leading-7 text-center max-w-2xl text-[#8C8C8C] mb-12">
        Our courses offer expert-led training and hands-on practice. Equip
        yourself with the skills and knowledge needed to excel in your field.
      </p>

      {/* Steps */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-6 lg:gap-3">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center text-center max-w-xs space-y-3">
              <Image
                src={step.img}
                alt={step.title}
                className="w-32 h-32 object-cover rounded-full shadow-lg"
              />
              <h4 className="text-lg font-bold text-[#101359]">{step.title}</h4>
              <p className="text-sm text-[#8C8C8C] leading-5">
                {step.desc}
              </p>
            </div>
            {/* Line only between items (desktop & tablet) */}
            {index < steps.length - 1 && (
              <Image
                src={line}
                alt="process-line"
                className="hidden md:block w-24 lg:w-32 object-contain"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Process;
