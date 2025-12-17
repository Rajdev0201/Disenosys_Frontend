"use client";
import { useState } from "react";
import Button from "../custom/Button";
import { CircleX } from "lucide-react";
import axios from "axios";
import { API } from "../utils/constant";
import { useToast } from "../context/ToastContext";
import Input from "../custom/Input";
// import confetti from "canvas-confetti";
// import { useEffect } from "react";

const BookDemoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, phone };
    try {
      await axios.post(API + "booknowPost", data);
      showToast(
        "success",
        "Your booking was successful!",
        "We will reach out to you soon"
      );
      setName("");
      setEmail("");
      setPhone("");
      onClose();
    } catch (err) {
      const errorMessage = err.response?.data?.message;

      // Show error toast
      showToast(
        "error",
        errorMessage,
        "Please check all fields before submitted"
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center backdrop-blur-sm justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-96 md:w-full max-w-lg p-6 relative font-dm-sans">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Book a demo
          </h2>
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
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name*
            </label>
            <Input
              type="text"
              value={name}
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email*
            </label>
            <Input
              type="email"
              value={email}
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              phone Number*
            </label>
            <Input
              type="tel"
              value={phone}
              placeholder="Enter your phone number"
              onChange={(e) => setPhone(e.target.value)}
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
              className="px-6 py-2 rounded-md bg-gradient-to-r w-full from-[#45D2FF] to-[#009EE0] text-white font-medium text-sm hover:opacity-90 hover:cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookDemoModal;
