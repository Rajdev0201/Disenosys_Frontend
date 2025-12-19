"use client"
import Table from '@/components/custom/Table'
import React, { useState } from 'react'

const Assesments = () => {

const [page, setPage] = useState(1);
    
   const data = [
    {
      assessment: "Intro Quiz",
      course: "React Basics",
      due: "20.05.2025",
      status: "Done",
      submit: "Submitted",
    },
    {
      assessment: "Final Project",
      course: "NodeJS",
      due: "20.06.2025",
      status: "Progress",
      submit: "Upload",
    },
    {
      assessment: "Test 3",
      course: "MongoDB",
      due: "20.07.2025",
      status: "Pending",
      submit: "Submitted",
    },
  ];

  const columns = [
    { header: "Assessment", accessor: "assessment" },
    { header: "Course", accessor: "course" },
    { header: "Due Date", accessor: "due" },
    {
      header: "Status",
      accessor: "status",
      render: (value) => {
        let color = "";
        if (value === "Done") color = "bg-[#F0FEED] text-green-700";
        else if (value === "Progress") color = "bg-yellow-100 text-yellow-700";
        else color = "bg-[#FEEDED] text-red-700";

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}
          >
            {value}
          </span>
        );
      },
    },
    {
      header: "Submit",
      accessor: "submit",
      render: (value, row) => {
        if (value === "Upload") {
          return (
            <label className="cursor-pointer bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm hover:bg-blue-200">
              Upload File
              <input
                type="file"
                className="hidden"
                onChange={(e) => console.log("Uploaded:", e.target.files[0])}
              />
            </label>
          );
        }
        return (
          <span className="text-gray-600 font-medium">{value}</span>
        );
      },
    },
  ];
    
  return (
    <section>
        <div className="px-12 font-dm-sans h-screen">
        {/* Heading */}
        <h1 className="font-medium text-2xl text-[#333333] mb-2 mt-4">
          Assesments
        </h1>
        <p className="font-medium text-sm text-[#808080] mb-6">
          View, manage, and track course-related assessments.
        </p>

        <Table columns={columns} data={data}/>
      </div>
    </section>
  )
}

export default Assesments