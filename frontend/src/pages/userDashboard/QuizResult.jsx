"use client";
import Button from "@/components/custom/Button";
import React, { useState } from "react";
import AutomotiveProductTable from "./AutomotiveProductTable";
import GpdxTable from "./GpdxTable";

const QuizResult = () => {

const [title,setTitle] = useState("Automotive");

  return (
    <section>
      <div className="px-4 lg:px-12 font-dm-sans h-screen">

        <header className="mb-6">
          <h1 className="font-medium text-lg lg:text-2xl text-[#333333] mb-2 mt-4">
            Quizzes
          </h1>
          <p className="font-medium text-xs lg:text-sm text-[#808080] mb-6">
            Challenge yourself and measure your learning progress.
          </p>
        </header>


        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
            <Button 
               text="Automotive"
               className={` px-5 py-2 rounded-lg shadow-inner text-center hover:bg-blue-200 hover:cursor-pointer ${title === "Automotive" ? "bg-[#45D2FF] text-white" : "bg-[#F5F5F5] text-[#101359]"}`}
               onClick={() => setTitle("Automotive")}
            />
              <Button 
               text="GPDX"
               className={` px-5 py-2 rounded-lg shadow-inner text-center hover:bg-blue-200 hover:cursor-pointer ${title === "GPDX" ? "bg-[#45D2FF] text-white" : "bg-[#F5F5F5] text-[#101359]"}`}
               onClick={() => setTitle("GPDX")}
            />
            </div>
        </div>

        {title === "Automotive" ? <AutomotiveProductTable /> : <GpdxTable/>}
      </div>
    </section>
  );
};

export default QuizResult;
