"use client"
import React, { useState } from "react";
import { User2Icon, X } from "lucide-react";
import Input from "@/components/custom/Input";
import { useRouter } from "next/navigation";
 
const EditProfile = () => {
  const [isOpen, setIsOpen] = useState(true);
  const nav = useRouter();
  const [formData, setFormData] = useState({
    fullName: "Jannath Marha",
    email: "jannathmarha23@gmail.com",
    mobileNumber: "8220978679",
    location: "",
    about: "",
  });
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  const handleSubmit = () => {
    alert("something went wrong! try again later.");
  };
 
  if (!isOpen) return null;
 
  return (
    <section>
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-2 sm:p-4 font-sans">
 
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[98vh] overflow-y-auto relative p-3 sm:p-4 md:p-6">
 
        <button
          onClick={() => nav.push("/") }
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={22} className="sm:h-6 sm:w-6" />
        </button>
 
        <div className="mb-3 sm:mb-4 text-center sm:text-left">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Profile Information</h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Edit profile details</p>
        </div>
 
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0 overflow-y-auto">
 
          {/* left */}
          <div className="p-4 md:p-4 border mb-2 border-gray-100 shadow-xl rounded-2xl sm:rounded-3xl">
 
            <div className="flex justify-center mb-4">
              <div className="profileedit w-16 h-16 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
               <User2Icon size={20} />
              </div>
            </div>
 
            <div className="space-y-3 sm:space-y-3">
 
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name<span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                   />
              </div>
 
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email<span className="text-red-500">*</span>
                </label>
                   <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                 />
              </div>
 
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Mobile Number<span className="text-red-500">*</span>
                </label>
                <Input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  />
              </div>
 
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Location
                </label>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your location..."
                  />
              </div>
 
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  About
                </label>
                <Input
                  type="text"
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  placeholder="tell about you..."
                  />
              </div>
 
              <button
                onClick={handleSubmit}
                className="flex justify-center mx-auto px-10 sm:px-10 py-2.5 rounded-lg bg-[linear-gradient(to_right,#0077B3,#45D2FF)] text-white font-medium text-sm shadow-lg hover:opacity-90 transition-opacity mt-6"
              >
                Update Profile
              </button>
            </div>
          </div>
 
          {/* right */}
          <div className="min-h-0 rounded-3xl mb-2 sm:rounded-3xl bg-[rgba(16,19,89,1)] flex flex-col overflow-hidden ">
 
            <div className="flex-1 flex flex-col items-center min-h-0 p-4 sm:p-6 text-center">
 
              <div className="trending w-16 h-16 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-1 mb-4 ring-2 ring-white">
                     <User2Icon size={20} color="white"/>
              </div>
 
              <h3 className="text-white text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">
                {formData.fullName || "Your Name"}
              </h3>
 
              <div className="w-full mx-auto flex flex-col items-center space-y-2 text-white text-sm px-8 sm:px-20">
 
                <div className="flex w-full mb-6">
                  <span className="font-medium min-w-[80px] text-left">Email:</span>
                  <span className="text-gray-200 break-all  text-left">{formData.email}</span>
                </div>
 
                <div className="flex w-full mb-6">
                  <span className="font-medium min-w-[80px] text-left">Mobile:</span>
                  <span className="text-gray-200  text-left">{formData.mobileNumber}</span>
                </div>
 
                <div className="flex w-full mb-6">
                  <span className="font-medium min-w-[80px] text-left">Location:</span>
                  <span className="text-gray-200  text-left">{formData.location || "-"}</span>
                </div>
 
                <div className="flex w-full mb-6">
                  <span className="font-medium min-w-[80px] text-left">About:</span>
                  <span className="text-gray-200  text-left">{formData.about || "-"}</span>
                </div>
 
              </div>
 
            </div>
 
            <div className="bg-[rgba(69,210,255,1)] py-2 sm:py-3 text-center">
              <h4 className="text-white text-base sm:text-lg font-bold">Disenosys</h4>
            </div>
          </div>
        </div>
      </div>
 
    </div>
    </section>
  );
}

export default EditProfile;