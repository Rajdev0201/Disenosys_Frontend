"use client"
import Image from 'next/image'
import React, { useRef } from 'react'
import test from "@/components/assests/ct.jpg"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import anto from "@/components/assests/Anto.png";
import kj from "@/components/assests/Jayesh KJ.png";
import Karthikeyan from "@/components/assests/Karthikeyan C.png";
import ragul from "@/components/assests/Raghul Srivatsa.png";
import rajesh from "@/components/assests/Rajesh Deva.png";
import profile from "@/components/assests/testi.jpg";


  const data = [
    {
      name: "Arun Chinnathurai",
      company: "Ford",
      country: "Germany",
      pic: "",
      des: `Disenosys provided personalized CATIA training, helping me master real-world industry techniques beyond typical tutorials. The user-friendly sessions, expert support, and commitment helped boost my confidence. I highly recommend their programs for tailored expertise and outstanding service. Five-star experience!`,
    },
    {
      name: "Kavya Shri",
      company: "Renault Nissan",
      country: "India",
      pic: "",
      des: `It was an awesome experience learning my first 3D software. Mr. Vijay, our mentor, taught us thoroughly, focusing on clarity and providing many practice drawings. His dedication and the comprehensive practice sessions made the learning process enjoyable and effective.`,
    },
    {
      name: "Sourabha",
      company: "IBM",
      country: "USA",
      pic: "",
      des: `The program taught me a lot about industrial applications. The mentor was highly knowledgeable, patient, and shared valuable industry insights. It’s perfect for beginners, offering clear explanations and should reach more students for its immense value.`,
    },
    {
      name: "Anto",
      company: "Dassault Systemes",
      country: "India",
      pic: anto,
      des: `I gained a clear understanding of the basics and design requirements for creating automotive seats. Sumith sir explained every concept thoroughly and repeated them when needed. The program covered seat manufacturing, 8D and BOM reports, GD&amp;T, and creating seats from the STO.`,
    },
    {
      name: "Rajesh Deva",
      company: "Renault Group",
      country: "India",
      pic: rajesh,
      des: `The course effectively covered basic topics and offered excellent tool usage exposure. They provide opportunities for freshers to join top OEMs. The friendly, knowledgeable faculty makes it a great platform to kickstart your career with valuable industry exposure.`,
    },
    {
      name: "Karthikeyan C",
      company: "Renault Nissan",
      country: "India",
      pic: Karthikeyan,
      des: `Disenosys offered excellent training in BIW surfacing using CATIA. The mentor, skilled in CATIA and BIW, consistently helped students progress from basics to industrial-level knowledge. This training is ideal for engineers aiming to improve tool expertise and prepare for interviews.`,
    },
    {
      name: "Raghul Srivatsa",
      company: "Mahindra",
      country: "India",
      pic: ragul,
      des: `I gained a solid understanding of Wiring Harness routing design through Disenosys' well-structured online course, which I had been seeking for two years. It’s an excellent platform for freshers to learn both design and the manufacturing process.`,
    },
    {
      name: "Jayesh K J",
      company: "Renault Nissan",
      country: "India",
      pic: kj,
      des: `As a Sheetmetal design engineer, I struggled with BIW design during interviews. Disenosys, with experienced professionals and 50% lower fees, helped me master BIW concepts and boosted my confidence. They even moved my profile for interviews. Highly recommended!`,
    },
    {
      name: "Siva Subramanian",
      company: "Renault Nissan",
      country: "India",
      pic: "",
      des: `I enrolled in the Automotive BIW Design course at Disenosys based on a colleague's recommendation. Despite my 1.5 years of experience, I learned a lot, thanks to a supportive mentor with 12+ years in the industry. The assignments were excellent, boosting my confidence for interviews.`,
    },
    {
      name: "Vinay Kudupudi",
      company: "Segula Technologies",
      country: "India",
      pic: "",
      des: `As a Design engineer, I struggled in OEM interviews due to skill gaps. Disenosys’ BIW Design course transformed my skills with experienced mentors. Their training and support boosted my confidence in BIW and Surface Design. I highly recommend Disenosys for career advancement!`,
    },
  ];

const Testimonials = () => {

        const boxRef = useRef(null);
        
          const settings = {
        dots: true,
        infinite: true,
        arrows:false,
        slidesToShow: 1, // Change from 3 to 2
        slidesToScroll: 1,
        autoplay: true,
        speed: 800,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
           {
            breakpoint: 1440,
            settings: {
              slidesToShow: 1, // Change from 2 to 1
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1, // Change from 2 to 1
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
        lazyLoad: "ondemand",
         };
  return (
   <section className="bg-[#101359]">
      <div className="w-full lg:max-w-6xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-center relative">
        
        {/* Left Image */}
        <div className="relative w-full lg:w-3/4 flex justify-start">
          <Image
            src={test}
            alt="Testimonials"
            className="object-cover rounded-lg w-[0px] md:w-[400px] lg:w-[450px] h-[500px] md:h-[550px] lg:h-[600px]"
          />

          {/* Testimonial Card on top of Image */}
          <div className="absolute top-28 left-1 sm:left-32 md:right-0 md:top-52 md:left-64 px-4 sm:px-8 w-[305px] sm:w-[400px] h-[50px] md:w-[500px] xl:w-[692px] md:h-[300px] z-50">
            {/* Blue accent box behind */}
            <div className="absolute right-0 -top-16  md:right-0 p-20 bg-[#45D2FF] rounded-lg -z-10"></div>

            <Slider {...settings} ref={boxRef}>
              {data.map((testimonial, index) => (
                <div key={index}>
                  <blockquote className="bg-[#2F3FA0] text-white rounded-lg p-6 sm:p-8 shadow-lg">
                    <p className="text-sm lg:text-md leading-relaxed italic mb-6">
                     {testimonial.des}
                    </p>

                    <div className="flex items-center gap-4">
                      <Image
                        src={testimonial.pic || profile}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm opacity-80">{testimonial.company}</p>
                        <p className="text-sm opacity-80">{testimonial.country}</p>
                      </div>
                    </div>
                  </blockquote>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials