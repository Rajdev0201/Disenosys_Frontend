"use client";
import { useState } from "react";
import Button from "../custom/Button";
import { CircleX } from "lucide-react";

const BookDemoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center backdrop-blur-sm justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-96 md:w-full max-w-lg p-6 relative font-dm-sans">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">Book a demo</h2>
          <Button
            icon={<CircleX size={22} />}
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
          />
        </div>

        <p className="text-base md:text-sm text-gray-500 mt-1">
          We’d love to walk you through! Enter your info to confirm your demo
          slot
        </p>
        {/* Form */}
        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name*
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email*
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number*
            </label>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex w-full gap-3 pt-4">
            <Button
              text="Cancel"
              onClick={onClose}
              className="px-5 py-2 rounded-md border w-full border-gray-300 text-gray-600 hover:bg-gray-100 text-sm font-medium"
            />
            <Button
              type="submit"
              text="Submit"
              className="px-6 py-2 rounded-md bg-gradient-to-r w-full from-[#45D2FF] to-[#009EE0] text-white font-medium text-sm hover:opacity-90"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookDemoModal;
