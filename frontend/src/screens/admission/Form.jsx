"use client"
import { useToast } from "@/components/context/ToastContext";
import Button from "@/components/custom/Button";
import Input from "@/components/custom/Input";
import { API } from "@/components/utils/constant";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const AdmissionForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [courseName,setCourseName] = useState("");
    const {showToast} = useToast();
    const user = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {name,email,mobile,courseName}
    try {
      await axios.post(API + "enrollPost", data,{
         withCredentials: true,
      });
     if (!user) {
        return showToast(
          "error",
          "Please Sign In",
          "You must sign in before enrolling."
        );
      }
      showToast(
        "success",
        "Enrolled Successfully",
        "Your course has been added!"
      );
    } catch (err) {
      showToast("error",err.response?.data?.message, "Please check you all fields before submitted!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-6 font-garet mb-6">
        {/* {alert && ( 
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm w-full z-50">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
              <h1 className="text-lg font-semibold font-garet">
                This is not open yet. Please wait for the opening date.
              </h1>
              <Link href="/" className="text-blue-500 underline mt-2 block">
                Go back to Home page
                </Link>
            </div>
          </div>
        )} */}
      <div className="flex flex-col justify-center items-center font-dm-sans py-3 px-4 md:px-8 lg:px-6">
        {/* Section Heading */}
        <span className="text-sm font-bold tracking-wide text-[#101359] mb-3">
         Get Started
        </span>
        <h1 className="text-[#101359] text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center">
        Admission <span className="text-[#45D2FF]">Form </span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-medium leading-7 text-center lg:text-start max-w-3xl text-[#8C8C8C] mb-12">
         Complete the form below to apply for enrollment in your desired course.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-6">
          <Input
            type="text"
             value={name}
              placeholder="Enter your full name"
                onChange={(e) => setName(e.target.value)}
          />
           <Input
            type="email"
             value={email}
              placeholder="Enter your full email"
                onChange={(e) => setEmail(e.target.value)}
          />
           <Input
            type="tel"
             value={mobile}
              placeholder="Enter your full mobile"
              onChange={(e) => setMobile(e.target.value)}
          />
           <Input
            type="text"
             value={courseName}
              placeholder="Enter your full courseName"
              onChange={(e) => setCourseName(e.target.value)}
          />
        <Button
         text="Submit Application"
          type="submit"
          className="px-6 py-2 rounded-2xl bg-gradient-to-r w-full from-[#009EE0] to-[#45D2FF] text-white font-medium text-lg hover:opacity-90 hover:cursor-pointer"
        />

      </form>
    </div>
  );
};

export default AdmissionForm;
