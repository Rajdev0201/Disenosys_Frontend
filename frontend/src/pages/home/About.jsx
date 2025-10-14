import Image from "next/image";
import React from "react";
import about from "@/components/assests/about.jpg";
// import Toast from "@/components/custom/Toast";
const About = () => {
  return (
    <section>
    <div className="px-4 md:px-8 lg:px-28 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Image */}
        <div className="flex justify-center md:justify-start">
          <Image
            src={about}
            alt="About Us"
            className="object-cover w-full max-w-sm sm:max-w-md md:max-w-lg rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side - Text Content */}
        <div className="flex flex-col space-y-4 font-dm-sans text-center md:text-left">
          <span className="text-sm font-bold tracking-wide">ABOUT US</span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#45D2FF] leading-snug">
            <span className="text-[#101359]">Transforming</span> Engineers into
            Industry Leaders
          </h1>
          <p className="text-sm sm:text-base md:text-md font-medium leading-7 text-[#8C8C8C]">
            We are Disenosys, a leading EdTech platform transforming careers
            since 2019. Specializing in the Indian Automotive Industry, we
            design industry-specific courses to upskill students and
            professionals for modern job demands. With expert-curated curricula
            in domains like BIW, Plastic Trims, Seating, and more—across top CAD
            tools such as CATIA, NX, and Creo—we’ve trained 10,000+ engineers
            and helped 500+ secure their dream jobs. Backed by strong
            partnerships with Automotive OEMs, we proudly provide 100% placement
            assistance with top companies.
          </p>

          {/* Stats Section */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-8 sm:gap-16 pt-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#101359]">
                20+
              </h2>
              <h4 className="text-sm sm:text-md font-medium text-[#8C8C8C]">
                Expert Mentors
              </h4>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#101359]">
                500+
              </h2>
              <h4 className="text-sm sm:text-md font-medium text-[#8C8C8C]">
                Happy Students
              </h4>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#101359]">
                99%
              </h2>
              <h4 className="text-sm sm:text-md font-medium text-[#8C8C8C]">
                Successful Placements
              </h4>
            </div>
          </div>
        </div>
      </div>
      {/* <Toast /> */}
    </div>
    </section>
  );
};

export default About;
