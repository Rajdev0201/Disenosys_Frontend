"use client";
import React, { useEffect, useState } from "react";

const getGreeting = (hour) => {
  const greetings = [
    {
      start: 5,
      end: 12,
      text: "Good morning",
      emoji: "🌅",
      quote: "Rise up and chase your dreams!",
    },
    {
      start: 12,
      end: 15,
      text: "Good afternoon",
      emoji: "🌤️",
      quote: "Keep pushing—half the day, full of potential!",
    },
    {
      start: 15,
      end: 20,
      text: "Good evening",
      emoji: "🌇",
      quote: "Slow down and reflect on your progress.",
    },
    {
      start: 20,
      end: 24,
      text: "Good night",
      emoji: "🌙",
      quote: "Rest well, tomorrow brings new code.",
    },
    {
      start: 0,
      end: 5,
      text: "Good night",
      emoji: "🌙",
      quote: "Rest well, tomorrow brings new code.",
    },
  ];

  const greeting = greetings.find((g) => hour >= g.start && hour < g.end);
  return {
    message: `${greeting.text} ${greeting.emoji}`,
    quote: greeting.quote,
  };
};

const titles = ["Learners", "Coders", "Devs"];
const randomTitle = titles[Math.floor(Math.random() * titles.length)];

const DynamicGreetings = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    console.log("DynamicGreetings component mounted");
    return () => clearInterval(timer);
  }, []);

  const { message, quote } = getGreeting(time.getHours());
  const formattedTime = time.toLocaleTimeString();

  return (
    <div className="flex items-center justify-center px-4">
      <div className="relative flex flex-col mx-auto items-center justify-center rounded-xl border border-gray-700 px-6 py-6 text-center w-full max-w-lg hover:scale-105 transition-transform duration-300 ease-in-out mb-6">
        {/* Top Center Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-1 overflow-hidden rounded-t-xl">
          <div className="mx-auto w-96 h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full" />
        </div>

        <h2 className="text-2xl lg:text-5xl font-bold text-purple-400 ">
          Hey {randomTitle} 👨‍💻
        </h2>
        <p className="text-gray-300 mt-2 text-lg lg:text-xl">{message}</p>
        <p className="text-sm text-gray-400 italic mt-1">"{quote}"</p>

        <p className="text-sm text-white mt-1 bg-purple-500 rounded-2xl px-2 py-1">
          {formattedTime}
        </p>
      </div>
    </div>
  );
};

export default DynamicGreetings;
