"use client";
import { ChevronRight } from "lucide-react";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";

const Banner = () => {
  const pathname = usePathname();

  // 🔥 Decide title based on route
  const pageTitle = useMemo(() => {
    switch (pathname) {
      case "/termsandconditions":
        return "Terms & Conditions";
      case "/privacyandpolicy":
        return "Privacy Policy";
      case "/refund-policy":
        return "Refund & Cancellation Policy";
      default:
        return "Legal Information";
    }
  }, [pathname]);

  return (
    <div className="terms px-6 sm:px-12 md:px-20 lg:px-32 xl:px-44 py-20 sm:py-28 md:py-36 lg:py-44 mt-12 text-center lg:h-[320px] text-white font-dm-sans">
      
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 mt-4">
        {pageTitle}
      </h1>

      {/* Breadcrumb */}
      <h4 className="flex items-center justify-center text-xs sm:text-sm md:text-base">
        Home <ChevronRight size={15} className="mx-1" /> {pageTitle}
      </h4>

    </div>
  );
};

export default Banner;
