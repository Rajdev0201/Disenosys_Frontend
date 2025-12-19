import React from "react";
import pp1 from "@/components/assests/pp1.jpg";
import Image from "next/image";
import Button from "@/components/custom/Button";
import { MoveRight } from "lucide-react";

const data = [
    {
        id:"01",
        tittle:"PG Diploma in Plastic Trims Design",
        tag:"5,957 Students"
    },
     {
        id:"02",
        tittle:"PG Diploma in Plastic BIW Design",
        tag:"5,957 Students"
    },
     {
        id:"03",
        tittle:"Masters in Automotive Body Design",
        tag:"5,957 Students"
    }
]
const Placement = () => {
  return (
    <section className="font-dm-sans mb-12">
      <div className="flex justify-center items-center px-4 md:px-8 lg:px-0">
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((data) => (
            <div
              key={data.tittle}
              className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 border border-gray-200"
            >
              <Image
                src={pp1}
                alt={`pp${data.tittle}`}
                className="object-cover rounded-md w-full h-48 p-4" 
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
                  icon={<MoveRight size={18} color="white" />}
                  className="flex items-center justify-center gap-2 bg-[linear-gradient(to_right,#45D2FF,#009EE0)] w-40 text-white px-5 py-2 rounded-md text-center font-medium text-sm hover:opacity-90 transition"
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
