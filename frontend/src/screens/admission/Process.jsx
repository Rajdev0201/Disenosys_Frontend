import React from "react";
import A1 from "@/components/assests/a1.jpg";
import A2 from "@/components/assests/a2.jpg";
import A3 from "@/components/assests/a3.jpg";
import A4 from "@/components/assests/a4.jpg";
import Image from "next/image";
import line from "@/components/assests/linewave.jpg";

const data = [
  {
    id: "01",
    image: A2,
    content: "Fill in your personal and academic information.",
  },
  {
    id: "02",
    image: A4,
    content: "Select the course you are interested in.",
  },
  {
    id: "03",
    image: A3,
    content: "Upload the required documents (if applicable).",
  },
  {
    id: "04",
    image: A1,
    content: "Wait for our team to contact you with the next steps.",
  },
];

const Process = () => {
  return (
    <section>
      <div className="flex flex-col justify-center items-center font-dm-sans py-3 px-4 md:px-8 lg:px-6">
        {/* Section Heading */}
        <span className="text-sm font-bold tracking-wide text-[#101359] mb-3">
          Admission Process
        </span>
        <h1 className="text-[#101359] text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center">
          How to <span className="text-[#45D2FF]">Apply</span>
        </h1>
        <p className="text-sm sm:text-base md:text-md font-medium leading-7 text-center lg:text-start max-w-3xl text-[#8C8C8C] mb-12">
          Our admission process is simple and student-friendly. Fill out the
          form with accurate details, choose your desired course, and submit it.
          You’ll receive a confirmation, and our team will reach out shortly.
        </p>
      </div>
      <Image src={line} className="object-cover px-24" alt="linewave" />
      <div className="grid lg:grid-cols-4 gap-4 px-12 lg:px-24 lg:-mt-48 mb-12">
        {data?.map((item) => (
          <div key={item.id} className="flex flex-col space-y-3">
            <div>
              <Image
                src={item.image}
                alt={item.content}
                className="object-cover rounded-md lg:w-3/4 lg:h-[210px]"
              />
            </div>
            <p className="mt-2 text-sm text-center lg:w-3/4 font-medium text-[#8C8C8C]">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
