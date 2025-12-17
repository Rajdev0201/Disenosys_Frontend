"use client"
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomDatePicker = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const prevMonthDays = getDaysInMonth(currentMonth - 1, currentYear);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const todayDate = today.getDate();
  const isCurrentMonth =
    today.getMonth() === currentMonth && today.getFullYear() === currentYear;

  // Generate calendar days
  const calendarDays = [];
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({ day: prevMonthDays - i, current: false, gray: true });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, current: true, gray: false });
  }

  // Add next month's filler days
  const nextDays = 42 - calendarDays.length;
  for (let i = 1; i <= nextDays; i++) {
    calendarDays.push({ day: i, current: false, gray: true });
  }

  return (
    <div className=" bg-white rounded-md border border-gray-200 shadow-sm flex flex-col justify-center items-center p-4">
      <div className="flex justify-between items-center w-full px-6 mb-2">
        <button onClick={handlePrevMonth}>
          <ChevronLeft className="text-gray-600" />
        </button>
        <h2 className="text-sky-400 text-center font-medium text-lg">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button onClick={handleNextMonth}>
          <ChevronRight className="text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4 text-center text-gray-500 text-sm mb-3">
        {daysOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-3 text-center">
        {calendarDays.map((d, i) => (
          <div
            key={i}
            className={`w-6 h-6 flex items-center justify-center text-sm rounded-full cursor-pointer transition-all duration-200
              ${d.gray ? "text-gray-300" : "text-gray-800"}
              ${isCurrentMonth && d.day === todayDate && d.current
                ? "bg-sky-400 text-white"
                : "hover:bg-sky-100"}
            `}
          >
            {d.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomDatePicker;