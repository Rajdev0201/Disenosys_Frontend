"use client";
import Input from "@/components/custom/Input";
import Pagination from "@/components/custom/Pagination";
import Table from "@/components/custom/Table";
import { API } from "@/components/utils/constant";
import React, { useState, useEffect } from "react";

const ResultGpdx = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading,setLoading] = useState(true);

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "UserType", accessor: "userType" },
    { header: "Percentage", accessor: "percentage" },
    { header: "Total Score", accessor: "totalScore" },
    {
  header: "Status",
  accessor: "attendedQuiz",
  render: (value) => {
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {value ? "Done" : "Pending"}
      </span>
    );
  },
},


    {
      header: "Finished At",
      accessor: "quizFinishTime",
      render: (value) => new Date(value).toLocaleString(),
    },
  ];

  const fetchResults = async () => {
    const res = await fetch(
      `${API}result-gpdx?page=${page}&limit=10&search=${search}`
    );

    const json = await res.json();
    setData(json.data);
    setTotalPages(json.pagination.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchResults();
  }, [page, search]);

     const Skeleton = () => (
    <div className="animate-pulse space-y-3 p-4 bg-white rounded-xl shadow">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex justify-between">
          <div className="h-5 w-28 bg-gray-200 rounded"></div>
          <div className="h-5 w-40 bg-gray-200 rounded"></div>
          <div className="h-5 w-16 bg-gray-200 rounded"></div>
          <div className="h-5 w-28 bg-gray-200 rounded"></div>
          <div className="h-5 w-40 bg-gray-200 rounded"></div>
          <div className="h-5 w-16 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );


  return (
    <section className="space-y-2 pb-10">

      {/* Search Bar */}
      
      <Input
        type="text"
        placeholder="Search by name, email, phone..."
        // className="px-4 py-2 border rounded-lg w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

        {loading ? (
        <Skeleton />
      ) : (
          <Table columns={columns} data={data} />
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </section>
  );
};

export default ResultGpdx;
