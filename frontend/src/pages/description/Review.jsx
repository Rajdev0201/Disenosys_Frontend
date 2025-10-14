import React from "react";

const Review = () => {
  const reviews = [
    {
      name: "Jennifer Lawrence",
      time: "3 days ago",
      text: "Great course, best online learning! Highly recommended...",
      rating: 5,
    },
    {
      name: "Emma Watson",
      time: "6 days ago",
      text: "Very comprehensive program with excellent facilities...",
      rating: 5,
    },
  ];

  return (
    <div className="font-dm-sans">
      <h2 className="text-xl font-semibold mb-4 text-[#101359]">Course Reviews</h2>
      <div className="grid grid-cols-12 gap-5">
      <div className="bg-white rounded-xl shadow p-6 mb-6 col-span-3 flex flex-col items-center justify-center">
        <p className="text-5xl font-bold">4.8</p>
        <span className="text-[#F8BC24]">★ ★ ★ ★ ★</span>
        <p className="text-gray-500">Course Rating</p>
        </div>
        {/* Rating bars */}
        <div className="space-y-2 bg-white rounded-xl shadow p-6 mb-6 col-span-9">
          {[70, 15, 10, 5, 2].map((percent, i) => (
            <div key={i} className="flex items-center space-x-2">
              <span className="text-sm">{5 - i} ★</span>
              <div className="flex-1 h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-[#28A745] rounded"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-500">{percent}%</span>
            </div>
          ))}
        </div>
        </div>
      {/* Reviews list */}
      <div className="space-y-6">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">{r.name}</h4>
              <span className="text-sm text-gray-500">{r.time}</span>
            </div>
            <p className="text-gray-600 mt-2">{r.text}</p>
            <p className="text-yellow-500 mt-2">
              {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
            </p>
          </div>
        ))}
      </div>
   
    </div>
  );
}

export default Review;
