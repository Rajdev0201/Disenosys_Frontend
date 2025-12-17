"use client";

import Image from "next/image";
import { useState } from "react";
import faq from "@/components/assests/faq.jpg"
import Link from "next/link";

const FaqSection = () => {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const faqs = [
    {
      q: "Can I request a refund after purchasing a course?",
      a: "Refunds are allowed only within the specified refund window (usually 24–72 hours), and only if the course progress is below the allowed limit."
    },
    {
      q: "What personal data do you collect?",
      a: "We collect basic details like name, email, and usage data to personalize your learning experience."
    },
    {
      q: "How long does it take to process a refund?",
      a: "Refunds typically take 5–7 business days to reflect in your bank account."
    },
     {
      q: "Do you share my data with third parties?",
      a: "We never sell or share your data without consent, except when legally required."
    },
    {
      q: "Can I transfer my course to another student instead of refund?",
      a: "Course transfers are not allowed. Each purchase is tied to a single user account."
    },
    {
      q: "How is my data protected?",
      a: "We use encryption and security best practices to ensure your information remains safe."
    },
    {
      q: "Are refunds available for discounted or offer courses?",
      a: "Discounted or promotional courses are non-refundable. Only full-price purchases may be eligible."
    },
    {
      q: "Will I receive marketing emails?",
      a: "Only if you opt in. You can unsubscribe anytime."
    },
    {
      q: "What if the course is not what I expected?",
      a: "If the content doesn’t match the description, you can request support within 24–48 hours. Our team will review your request."
    },
    {
      q: "Can I delete my account and data?",
      a: "Yes, you can request full account deletion anytime. Your data will be permanently removed."
    }
  ];

  return (
    <div className="lg:mt-25">
      
      {/* TOP SECTION */}
      <div className="w-full flex flex-col md:flex-row font-dm-sans justify-center items-center text-center mt-20 px-4 gap-10">
        <Image  src={faq} alt="faq" className="object-cover w-3/4 lg:-ml-60 sm:w-52 md:w-64 mb-4 flex"/>

        <div>
          <p className="text-sm font-bold text-[#141554] tracking-tighter mb-2">FAQs</p>
          <h1 className="text-3xl sm:text-4xl tracking-tighter font-bold text-[#141554]">
            Have Questions? <span className="text-[#32C7FF]">We’ve Got Answers</span>
          </h1>
          <p className="text-[#8C8C8C] mt-3 text-base sm:text-lg">Have any questions? We're here to assist you.</p>
        </div>
      </div>

      {/*GRID */}
      <div className="p-4 sm:p-6">
        <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-32 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 auto-rows-fr">

            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-md transition-shadow h-full flex flex-col cursor-pointer"
                onClick={() => toggleFAQ(i)}
              >
                <div className="flex items-start gap-8
                 font-semibold w-full">
                  <span className="text-[#32C7FF]  text-4xl flex-shrink-0">
                    {openIndex === i ? "-" : "+"}
                  </span>
                  <span className="text-[#333333] pt-2 text-base md:text-lg">
                    {faq.q}
                  </span>
                </div>

                {openIndex === i && (
                  <p className="pl-10 pr-2 mt-3 text-[#8C8C8C] text-sm md:text-base leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom*/}
      <div>
        <div className="bg-[#141554] mb-6 flex flex-col md:flex-row items-center justify-between p-8 rounded-lg mx-4 sm:mx-10 lg:mx-32 mt-10 gap-4">
          <div className="text-[#FFFFFF] text-center md:text-left">
            <h1 className="font-normal text-base md:text-lg">Still have questions?</h1>
            <p className="text-sm font-light">Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
          </div>

          <Link href="/contact" className="flex bg-[linear-gradient(to_right,#0077B3,#45D2FF)] text-[#FFFFFF] px-6 py-2 rounded-full">
            Get in touch
          </Link>
        </div>
      </div>

    </div>
  );
}

export default FaqSection;