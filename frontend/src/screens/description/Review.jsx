import React from "react";

const Review = () => {
  const reviews = [
    {
      name: "Vajay Kumar",
      time: "3 days ago",
      text: "The learning and expert guidance provided by the entire Disenosys team helped me overcome my reservations and provided me with valuable exposure to the industry's demanding skills.",
      rating: 5,
    },
    {
      name: "Abishesk",
      time: "6 days ago",
      text: "The mentors' guidance and learning enabled me to advance my skills to the next level. I learned how to approach Design Aspects and thoroughly understand the manufacturing process.",
      rating: 5,
    },
    {
      name: "Rajesh",
      time: "1 week ago",
      text: "Disenosys breathed new life into my professional life. The journey that began with a meeting with Mr Praveen not only changed my perception of a career in design but also helped me achieve my dream of becoming a DESIGN ENGINEER.",
      rating: 4,
    },
    {
      name: "Naveen KH",
      time: "2 weeks ago",
      text: "The entire Disenosys team was laser-focused on helping me achieve my goal. The mentors' unrivalled support and guidance helped shape me into an independent Design Engineer.",
      rating: 5,
    },
    {
      name: "Alex Richards",
      time:"5 weeks ago",
      text:"I'd say my time with Disenosys was one of the most valuable periods  of mycareer. It accelerated my career as aDesign Engineer. I not only gained industry-relevant skills but also realized thatPassion is all about understanding myauthentic self. I'd like to thank the entireDisenosys team for helping to shape mycareer as a full-fledged Design Engineer",
      rating:5,

    }
  ];

  return (
    <div className="font-dm-sans">
      <h2 className="text-xl font-semibold mb-4 text-[#101359]">Course Reviews</h2>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div className="bg-white rounded-xl shadow p-6 mb-6 col-span-12 lg:col-span-3 flex flex-col items-center justify-center">
        <p className="text-5xl font-bold">4.8</p>
        <span className="text-[#F8BC24]">★ ★ ★ ★ ★</span>
        <p className="text-gray-500">Course Rating</p>
        </div>
        {/* Rating bars */}
        <div className="space-y-2 bg-white rounded-xl shadow p-6 mb-6 col-span-12 lg:col-span-9">
          {[94, 6, 0, 0, 0].map((percent, i) => (
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
