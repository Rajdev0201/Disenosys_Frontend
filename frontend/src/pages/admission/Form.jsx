"use client"
import Button from "@/components/custom/Button";
import Input from "@/components/custom/Input";
import Link from "next/link";
import { useState } from "react";

const AdmissionForm = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", dob: "", course: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [alert,setAlert] = useState(false);

  const handleSubmit = (e) => {
    setAlert(true);
    e.preventDefault();
    // alert("Form submitted!");
    // backend logic here
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-6 font-garet mb-6">
        {alert && ( 
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
        )}
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
        {["name", "email", "phone", "dob","course"].map((field) => (
          <Input
            key={field}
            type={field === "dob" ? "date" : "text"}
            name={field}
            placeholder={`Enter your ${field}`}
            value={form[field]}
            onChange={handleChange}
            required
          />
        ))}

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
