"use client";

import confetti from "canvas-confetti";
import { useEffect, useState } from "react";

export default function LaunchMode() {
  const [now, setNow] = useState(new Date());

  // 🎊 Confetti (run once)
  useEffect(() => {
    if (!sessionStorage.getItem("launch_confetti")) {
      confetti({
        particleCount: 250,
        spread: 160,
        origin: { y: 0.6 },
      });
      sessionStorage.setItem("launch_confetti", "true");
    }
  }, []);

  // ⏱️ Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const istNow = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );
      setNow(istNow);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🎯 Launch end time (production)
  const launchEnd = new Date(`${now.getFullYear() + 1}-01-01T00:00:00`);
  const diff = launchEnd - now;

  const hours = Math.max(Math.floor(diff / (1000 * 60 * 60)), 0);
  const minutes = Math.max(Math.floor((diff / (1000 * 60)) % 60), 0);
  const seconds = Math.max(Math.floor((diff / 1000) % 60), 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4 font-dm-sans">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-10 text-white grid md:grid-cols-2 gap-8">

        {/* LEFT – CONTENT */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-extrabold mb-4">
            🎉 Disenosys New Year Launch
          </h1>

          <p className="text-base md:text-md text-gray-300 mb-6">
            New Version • New Courses • Exclusive Launch Offers
          </p>

          <button className="self-center md:self-start px-6 py-3 bg-blue-400 hover:bg-yellow-300 text-white rounded-lg font-bold transition">
            Unlock New Year Offers 🎁
          </button>

          <p className="mt-6 text-sm text-gray-400">
            Website unlocks at <span className="font-semibold">12:00 AM IST</span>
          </p>
        </div>

        {/* RIGHT – TIMER */}
        <div className="flex flex-col items-center justify-center border border-white/20 rounded-xl p-6">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">
            Current Time (IST)
          </p>

          <p className="text-xl font-mono mb-6">
            {now.toLocaleTimeString("en-IN")}
          </p>

          <div className="flex gap-4">
            <TimeBox label="Hours" value={hours} />
            <TimeBox label="Minutes" value={minutes} />
            <TimeBox label="Seconds" value={seconds} />
          </div>

          <p className="mt-4 text-xs text-gray-400">
            Countdown to New Year
          </p>
        </div>
      </div>
    </div>
  );
}

/* 🔢 Timer Box */
function TimeBox({ label, value }) {
  return (
    <div className="flex flex-col items-center bg-black/40 px-4 py-3 rounded-lg min-w-[70px]">
      <span className="text-2xl font-bold">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs text-gray-400 mt-1">{label}</span>
    </div>
  );
}
