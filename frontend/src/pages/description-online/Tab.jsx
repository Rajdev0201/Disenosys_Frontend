import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "curriculum", label: "Curriculum" },
    { id: "instructor", label: "Instructor" },
    { id: "reviews", label: "Reviews" },
  ];
  return (
    <div className="lg:px-24 mt-6">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 xl:grid-cols-6 lg:space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 text-sm font-medium hover:cursor-pointer  ${
              activeTab === tab.id
                ? "text-white rounded-md text-center px-4 py-2 bg-[#101359]"
                : "text-[#101359] bg-[#F5F5F5] text-center px-4 py-2 rounded-md "
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Tabs;