import Image from "next/image";
import React from "react";
import about from "@/components/assests/abt.png";
import Button from "@/components/custom/Button";
// import Toast from "@/components/custom/Toast";
const About = () => {
  return (
 <section>
  <div className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 py-10 sm:py-14 md:py-20 lg:py-24 font-dm-sans">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      
      {/* Left Side - Image */}
      <div className="flex justify-center lg:justify-start">
        <Image
          src={about}
          alt="About Us"
          className="object-cover w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side - Text Content */}
      <div className="flex flex-col space-y-4 md:space-y-6 text-center md:text-left">
        <span className="text-xs sm:text-sm md:text-base font-bold tracking-wide text-center lg:text-start">
          WHO WE ARE
        </span>

        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#45D2FF] leading-snug text-center lg:text-start">
          <span className="text-[#101359]">Empowering Engineers, </span>
          Transforming Careers
        </h1>

        <p className="text-xs sm:text-sm md:text-base lg:text-md font-medium leading-6 sm:leading-7 text-[#8C8C8C]">
          Disenosys is a premier EdTech platform established in 2019, focused on
          transforming careers in the Indian Automotive Industry. We offer
          industry-specific Post Graduate courses in Automotive Body Design,
          covering key domains such as BIW, Plastic Trims, Seating, and more,
          using leading CAD software like CATIA, NX, and Creo.
        </p>

        <p className="text-xs sm:text-sm md:text-base lg:text-md font-medium leading-6 sm:leading-7 text-[#8C8C8C]">
          With a mission to bridge the skills gap, we’ve successfully trained
          over 10,000 engineers and helped 500+ professionals land their dream
          jobs. Our expertly designed curriculum, created by industry veterans,
          equips students with practical, job-ready skills. Through solid
          partnerships with top Automotive OEMs, we provide 100% placement
          assistance, empowering engineers to thrive in the evolving automotive
          sector.
        </p>

        <div className="flex justify-center lg:justify-start">
          <Button
            text="Explore Now"
            className="bg-[linear-gradient(to_right,#0077B3,#45D2FF)] px-5 sm:px-6 py-2 sm:py-3 w-auto sm:w-40 font-medium rounded-md shadow-inner text-white font-dm-sans hover:cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</section>
  );
};

export default About;
