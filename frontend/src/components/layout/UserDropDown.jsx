"use client";
import {
  Bell,
  BellDotIcon,
  Contact,
  LogOut,
  Settings,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/actions/auth";
import { useRouter } from "next/navigation";


const UserDropDown = ({ userData, className,loading }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const dispatch = useDispatch();
  const nav = useRouter();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout(nav));
  };

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setNotificationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section>

      <div className={`relative ${className}`} ref={dropdownRef}>
        {/* USER BUTTON */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 focus:outline-none font-dm-sans"
        >
          <div className="w-10 h-10 rounded-full bg-[#F2F2F2] flex items-center justify-center font-semibold">
            <span>{userData?.userName?.charAt(0)?.toUpperCase()}</span>
          </div>

          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold text-[#595959] leading-tight">
              {userData?.userName}
            </span>
            <span className="text-xs text-gray-500 truncate max-w-[90px]">
              {userData?.userEmail}
            </span>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 text-gray-600 transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* NOTIFICATION POPUP */}
        {notificationOpen && (
          <div className="absolute top-14 right-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-[#101359] font-bold">Notifications</h1>
              <button
                onClick={() => setNotificationOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="border-t border-gray-200 mb-2"></div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">Welcome to Disenosys</p>
              <BellDotIcon size={15} className="text-gray-600" />
            </div>
          </div>
        )}

        {/* DROPDOWN MENU */}
        {dropdownOpen && (
          <div className="absolute right-0 left-0 -top-12 lg:top-10 mt-3 w-44 bg-white rounded-xl shadow-lg z-50 border border-gray-200 p-3">
            {/* Top Bar with X button */}
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-sm font-semibold text-gray-700">
                {" "}
                {userData?.userName}
              </h1>

              <button
                onClick={() => setDropdownOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>
            <div className="border-gray-200 border-b-2 mb-2"></div>
            <div className="flex flex-col text-sm">
              <Link
                href="/user/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100"
              >
                <Contact size={15} /> My Profile
              </Link>

              <Link
                href="/edit-profile"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100"
              >
                <User size={15} /> Edit Profile
              </Link>

              <Link
                href="/user/settings"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100"
              >
                <Settings size={15} /> Settings
              </Link>

              <button
                onClick={() => {
                  setNotificationOpen(true);
                  setDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-left hover:bg-blue-100"
              >
                <Bell size={15} /> Notifications
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-100"
              >
                <LogOut size={15} /> Logout
              </button>
            </div>
          </div>
        )}
      </div>

    </section>
  );
};

export default UserDropDown;
