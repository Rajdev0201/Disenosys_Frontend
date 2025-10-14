"use client"
import React, { useRef } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import anto from "@/components/assests/Anto.png";
import kj from "@/components/assests/Jayesh KJ.png";
import Karthikeyan from "@/components/assests/Karthikeyan C.png";
import ragul from "@/components/assests/Raghul Srivatsa.png";
import rajesh from "@/components/assests/Rajesh Deva.png";
import profile from "@/components/assests/testi.jpg";
import Image from "next/image";


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
    slidesToShow: 3, // Change from 3 to 2
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
       {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3, // Change from 2 to 1
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Change from 2 to 1
          slidesToScroll: 2,
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
    <section className='py-16 px-4 md:px-8 lg:px-10 xl:px-16 relative font-dm-sans'>
      <div className='text-center'>
       <span className="text-sm font-bold tracking-wide text-[#101359] mb-6">
        TESTIMONIALS
      </span>
      <h1 className="text-[#101359] text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center">
        Testimonials:{" "}
        <span className="text-[#45D2FF]">Trusted by Our Learners</span>
      </h1>
      </div>
         <div ref={boxRef} className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 xl:px-8 xl:py-16">
        <Slider {...settings}>
          {data.map((testimonial, index) => (
            <div className="p-4 h-full flex" key={index}>
            <blockquote className="flex flex-col justify-between bg-white p-6 shadow-sm rounded-lg min-h-[300px] sm:min-h-[350px] xl:min-h-[320px]">
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.pic || profile}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover"
                  width={250}
                  height={125}
                  priority
                  quality={80}
                  loading="eager"
                />
                <div>
                  <div className="flex text-xl gap-1 text-yellow-500">
                    ★★★★★
                  </div>
                  <p className="mt-0.5 text-lg font-medium text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-gray-900">
                    {testimonial.company}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-gray-900">
                    {testimonial.country}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm flex-grow">
                {testimonial.des}
              </p>
            </blockquote>
          </div>
          
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default Testimonials