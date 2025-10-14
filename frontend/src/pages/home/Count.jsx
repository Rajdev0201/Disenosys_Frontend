"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../app/globals.css";

const stats = [
  { value: 5000, suffix: "+", label: "Trained" },
  { value: 3800, suffix: "+", label: "Reviews with 5 star rating" },
  { value: 200, suffix: "+", label: "Live Classes Every Month" },
  { value: 85, suffix: "+", label: "Corporate Partners" },
  { value: 210, suffix: "+", label: "College Partners" },
  { value: 87, suffix: "%", label: "Reported Career Benefits" },
];

const Count = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="count font-dm-sans text-white bg-gradient-to-r from-[#101359] to-[#2229BF] py-12 mb-20"
    >
      <div className="container-md mx-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center xl:px-16">
        {stats.map((stat, i) => (
          <div key={i}>
            <h1 className="text-3xl sm:text-4xl font-bold">
              {visible ? <Counter end={stat.value} /> : 0}
              {stat.suffix}
            </h1>
            <h4 className="text-sm sm:text-md font-light mt-2">{stat.label}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

const Counter = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // animation time (2s)
    const stepTime = Math.max(Math.floor(duration / end), 20); // safe speed

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [end]);

  return <>{count}</>;
};

export default Count;
