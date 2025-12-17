"use client";
import Input from "@/components/custom/Input";
import Pagination from "@/components/custom/Pagination";
import Table from "@/components/custom/Table";
import { API } from "@/components/utils/constant";
import React, { useState, useEffect } from "react";


const getCEFRLevel = (score) => {
  if (score < 10) return "A1 - Foundation";
  if (score < 30) return "A2 - Trainee";
  if (score < 50) return "B1 - Practitioner";
  if (score < 75) return "B2 - Specialist";
  if (score < 90) return "C1 - Expert";
  if (score <= 100) return "C2 - Master";
};



const ResultDashboardTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

 const columns = [
  { header: "First Name", accessor: "firstName" },
  { header: "Last Name", accessor: "lastName" },
  { header: "Country", accessor: "country" },

  { header: "Catia %", accessor: "catiaPercentage" },
  { header: "Product %", accessor: "productPercentage" },

  // ⭐ Total Percentage
  {
    header: "Total %",
    accessor: "totalPercentage",
    render: (_, row) => {
      const total =
        (Number(row.catiaPercentage) + Number(row.productPercentage)) / 2;
      return `${total}%`;
    },
  },

  // ⭐ CEFR Level
  {
    header: "Level",
    accessor: "level",
    render: (_, row) => {
      const total =
        (Number(row.catiaPercentage) + Number(row.productPercentage)) / 2;

      const level = getCEFRLevel(total);

      // color code
      const colorMap = {
        "A1 - Foundation": "bg-gray-200 text-gray-700",
        "A2 - Trainee": "bg-blue-100 text-blue-700",
        "B1 - Practitioner": "bg-yellow-100 text-yellow-700",
        "B2 - Specialist": "bg-purple-100 text-purple-700",
        "C1 - Expert": "bg-green-100 text-green-700",
        "C2 - Master": "bg-red-100 text-red-700",
      };

      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            colorMap[level] || "bg-gray-200 text-gray-600"
          }`}
        >
          {level}
        </span>
      );
    },
  },

  {
    header: "Created At",
    accessor: "createdAt",
    render: (value) => new Date(value).toLocaleString(),
  },
];
  const fetchResults = async () => {
    const res = await fetch(
      `${API}result-dashboard?page=${page}&limit=10&search=${search}`
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

export default ResultDashboardTable;
