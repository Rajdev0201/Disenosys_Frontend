"use client"
import Image from "next/image";
import React, { useState } from "react";
import contact from "@/components/assests/contactus.jpg";
import Button from "@/components/custom/Button";
import Input from "@/components/custom/Input";
import { useToast } from "@/components/context/ToastContext";
import axios from "axios";
import { API } from "@/components/utils/constant";
const Form = () => {

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const {showToast} = useToast();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = { fname, lname, mobile, email, message };

  try {
   await axios.post(API + "contact", data);
    showToast("success", "Message sent successfully","We will reach out you soon...");
    setFName("");
    setLName("");
    setMobile("");
    setEmail("");
    setMessage("");

  } catch (err) {
    const errorMessage = err.response?.data?.message;
    showToast("error", errorMessage,"Please check you all fields before submitted!");
  }
};


  return (
    <section>
      <div className="px-6 sm:px-10 md:px-10 lg:px-12 xl:px-24 font-dm-sans mb-12">
        <h2 className="text-[#101359] text-xl md:text-2xl lg:text-4xl font-semibold mb-2">
          Contact Us
        </h2>
        <span className="text-sm lg:text-md font-medium text-[#8C8C8C]">
          We’re Here to Help – Get in Touch With Our Team
        </span>
        <div className="grid lg:grid-cols-2 gap-12">
          <Image src={contact} alt="contact-us" className="object-cover " />
          <div className="bg-white shadow-md rounded-xl border border-gray-300">
            <form className="px-6 py-16 space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#808080]">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input value={fname} type="text" placeholder="Enter your first name" onChange={(e) => setFName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#808080]">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input value={lname} type="text" placeholder="Enter your last name" onChange={(e) => setLName(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#808080]">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <Input value={mobile} type="text" placeholder="Enter your Contact Number" onChange={(e)=> setMobile(e.target.value)}/>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#808080]">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input value={email} type="email" placeholder="Enter your last email" onChange={(e)=> setEmail(e.target.value)}/>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#808080]">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  type="Write your message here…"
                  value={message}
                  placeholder="Write your message here…"
                  rows="5"
                  cols="40"
                  onChange={(e)=> setMessage(e.target.value)}
                  className="mt-1 w-full rounded-xl border shadow border-gray-300 px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <Button
                type="submit"
                text="Submit"
                className="px-6 py-2 rounded-2xl bg-gradient-to-r w-full from-[#009EE0] to-[#45D2FF] text-white font-medium text-lg hover:opacity-90 hover:cursor-pointer"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
