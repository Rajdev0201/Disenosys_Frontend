"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/custom/Button";
import { MoveRight } from "lucide-react";
import BIW from "@/components/assests/BIW.jpg";
import Plastic from "@/components/assests/plastic.jpg";
import Cad from "@/components/assests/cad.jpg";
import { useRouter } from "next/navigation";

const data = [
  {
    id: "01",
    tittle: "PG Diploma in Plastic Trims Design",
    tag: "5,957 Students",
    img: Plastic,
  },
  {
    id: "02",
    tittle: "PG Diploma in Plastic BIW Design",
    tag: "5,957 Students",
    img: BIW,
  },
  {
    id: "03",
    tittle: "Masters in Automotive Body Design",
    tag: "5,957 Students",
    img: Cad,
  },
];

const Placement = () => {
  const nav = useRouter();
  const goToDescriptionPage = (slug) => {
    nav.push(`/description/${encodeURIComponent(slug)}`);
  };
  return (
    <section className="font-dm-sans mb-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-12">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((data) => (
            <div
              key={data.tittle}
              className="bg-white rounded-md shadow hover:shadow-lg transition duration-300"
            >
              <Image
                src={data.img}
                alt={`pp${data.tittle}`}
                className="object-cover rounded-t-md w-full h-48"
              />
              <div className="flex flex-col space-y-4 px-5 py-4">
                <h5 className="text-sm font-medium text-gray-600">
                  {data.tag}
                </h5>
                <p className="text-[#324361] text-lg font-semibold">
                  {data.tittle}
                </p>
                <Button
                  text="Apply Now"
                  onClick={() => goToDescriptionPage(data.tittle)}
                  icon={<MoveRight size={18} color="white" />}
                  className="flex items-center justify-center gap-2 hover:cursor-pointer  bg-[linear-gradient(to_right,#45D2FF,#009EE0)] w-40 text-white px-5 py-2 rounded-md text-center font-medium text-sm hover:opacity-90 transition"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Placement;
