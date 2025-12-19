"use client";
import { useEffect, useState } from "react";
import Table from "@/components/custom/Table";
import Image from "next/image";
import { API } from "@/components/utils/constant";
import { Trophy, User2 } from "lucide-react";

const UserList = ({bar,list}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH TOP 5 FROM BACKEND
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`${API}result-topFive?list=${list}`); // your backend route
        const json = await res.json();

        // Add rank automatically
        const ranked = json.data.map((d, index) => ({
          ...d,
          rank: index + 1,
        }));

        setData(ranked);
      } catch (error) {
        console.error("Error loading top performers:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // UI STYLING FUNCTIONS
  const rankStyle = (rank) => {
    const styles = {
      1: "bg-yellow-500 text-white",
      2: "bg-gray-400 text-white",
      3: "bg-orange-500 text-white",
      default: "bg-blue-100 text-blue-700",
    };
    return styles[rank] || styles.default;
  };

  const trophyColor = (rank) => {
    const colors = {
      1: "text-yellow-400",
      2: "text-gray-300",
      3: "text-orange-400",
    };
    return colors[rank] || "text-blue-400";
  };

  // Table Columns
  const columns = [
    {
      header: "Rank",
      accessor: "rank",
      render: (value) => (
        <div className="flex items-center gap-2">
          {value <= 5 && <Trophy className={`text-lg ${trophyColor(value)}`} />}
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${rankStyle(
              value
            )}`}
          >
            {value}
          </span>
        </div>
      ),
    },
    {
      header: "Name",
      accessor: "name",
      render: (value) => (
        <div className="flex items-center gap-2">
          <User2 size={15}
          />
          <span className="font-medium text-gray-800">{value}</span>
        </div>
      ),
    },
    { header: "Score (%)", accessor: "bestPercentage" },

    // PROGRESS BAR
    {
      header: "Progress",
      accessor: "bestPercentage",
      render: (value) => (
        <div className="w-full">
          <p className="font-semibold text-sm mb-1">{value}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `${value}%` }}
            ></div>
          </div>
        </div>
      ),
    },
      {
      header: "Finished At",
      accessor: "quizFinishTime",
      render: (value) => new Date(value).toLocaleString(),
    }
  ];

  // Skeleton Loader
  const Skeleton = () => (
    <div className="animate-pulse space-y-3 p-4 bg-white rounded-xl shadow">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex justify-between">
          <div className="h-5 w-28 bg-gray-200 rounded"></div>
          <div className="h-5 w-40 bg-gray-200 rounded"></div>
          <div className="h-5 w-16 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-2 lg:p-6 font-dm-sans">
      {/* Gradient Leaderboard Card */}
      {bar === "yes" && 
      <div className="p-2 lg:p-6 mb-6 rounded-2xl bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600 text-white shadow-lg">
        <h1 className="text-md lg:text-2xl font-bold">🏆 Top 5 GPDX Performers</h1>
        <p className="text-xs lg:text-sm mt-1 opacity-90">
          Compete and get listed by attending the <b>GPDX Exam</b>.
        </p>
      </div>
      }

      {/* Skeleton Loader */}
      {loading ? (
        <Skeleton />
      ) : (
        <div className="bg-white p-2 lg:p-4 rounded-xl shadow">
          <Table columns={columns} data={data} />
        </div>
      )}

      {/* CTA */}
      {bar === "yes" &&
      <div className="mt-6 p-2 lg:p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-blue-700 font-medium text-xs lg:text-sm">
          👉 Want to appear in the **Top 5 Leaderboard**?  
          Write the <b>GPDX Quiz</b> today and increase your score!
        </p>
      </div>
   }
    </div>
  );
};

export default UserList;