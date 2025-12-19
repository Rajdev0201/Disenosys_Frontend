"use client"
import { useToast } from "@/components/context/ToastContext";
import Button from "@/components/custom/Button";
import Card from "@/components/custom/Card";
import Input from "@/components/custom/Input";
import { API } from "@/components/utils/constant";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Settings = () => {
   const {data,error} = useSelector((state) => state?.user);
   const [formData, setFormData] = useState({
    phoneNumber:"",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: true,
  });
  const{showToast} = useToast();

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleProfileUpdate = async (e) => {
    e.preventDefault();
  
    if (!data) {
       showToast("error","User is not logged in. Please login again.");
      return;
    }
  
    try {
       await axios.put(
        API + "update-profile", { phoneNumber:formData.phoneNumber },  {
           withCredentials: true,
          }
      );
      showToast("success","Profile updated successfully!");
    } catch (error) {
      if (error.response) {
        showToast("error", error?.response?.data.message);
      } 
    }
  };
 
  const handleChangePassword = async (e) => {
    e.preventDefault();

    // if (formData.oldPassword === formData.newPassword) {
    //   showToast("error","New password cannot be the same as the old password!");
    //   return;
    // }

    // if (formData.newPassword !== formData.confirmPassword) {
    //   showToast("error","New password and confirm password do not match!");
    //   return;
    // }

    try {
      const response = await axios.put(
       API + "change-password",
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        },
        {
          withCredentials:true,
        }
      );

      if (response.data.success) {
        showToast("success","Password changed successfully!");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" }); // Reset form
      }
    } catch (error) {
      showToast("error",error.response?.data?.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account?")) {
      try {
        const response = await axios.delete(API + "delete-account", {
          withCredentials:true,
        });
        const data = await response.json();
        if (data.success) {
          showToast("success","Account deleted successfully!");
          window.location.href = "/";
        }
      } catch (error) {
        showToast("error",error.response?.data?.message)
      }
    }
  };

  return (
    <section className="">
      <div className="px-4 lg:px-12 font-dm-sans h-screen">
        {/* Heading */}
        <h1 className="font-medium text-lg lg:text-2xl text-[#333333] mb-2 mt-4">
          Settings
        </h1>
        <p className="font-medium text-xs lg:text-sm text-[#808080] mb-6">
          Change details
        </p>

        {/*profile info */}

        <Card className="">
          <form onSubmit={handleProfileUpdate}>
          <h2 className="text-black font-medium text-md mb-2">
            Profile Information
          </h2>
          <div className="mb-3">
            <label className="text-gray-500 text-sm font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
            type="text"
            className="mt-1 w-full rounded-xl border shadow border-gray-300 px-3 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder={data?.userName}
            readOnly
             />
          </div>

          <div className="mb-3">
            <label className="text-gray-500 text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
             type="email" 
            readOnly
            className="mt-1 w-full rounded-xl border shadow border-gray-300 px-3 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder={data?.userEmail}
             />
          </div>

          <div className="mb-3">
            <label className="text-gray-500 text-sm font-medium">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
             type="number"
             name="phoneNumber"
             value={formData.phoneNumber}
              className="mt-1 w-full rounded-xl border shadow border-gray-300 px-3 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              />
          </div>

          <Button
            text="Update Profile"
            type="submit"
            className="bg-[linear-gradient(to_right,#009EE0,#45D2FF)] text-center rounded-lg shadow-inner px-7 py-2 text-white text-sm font-bold hover:cursor-pointer"
          />
          </form>
        </Card>

        {/* Change password */}

        <Card className="mt-6">
          <form onSubmit={handleChangePassword}>
          <h2 className="text-black font-medium text-md mb-2">
            Change Password
          </h2>
          <div className="mb-3">
            <label className="text-gray-500 text-sm font-medium">
              Old Password* <span className="text-red-500">*</span>
            </label>
            <Input 
            type="password"
            name="oldPassword" 
            onChange={handleChange}
            value={formData.oldPassword}
            />
          </div>

          <div className="mb-3">
            <label className="text-gray-500 text-sm font-medium">
              New Password* <span className="text-red-500">*</span>
            </label>
            <Input
            type="password"
            name="newPassword" 
            onChange={handleChange}
            value={formData.newPassword}
              />
          </div>

          <div className="mb-3">
            <label className="text-gray-500 text-sm font-medium">
              confirm password <span className="text-red-500">*</span>
            </label>
            <Input 
            type="password"
            name="confirmPassword" 
            onChange={handleChange}
            value={formData.confirmPassword}
             />
          </div>

          <Button
            text="Change Password"
            type="submit"
            className="bg-[linear-gradient(to_right,#009EE0,#45D2FF)] text-center rounded-lg shadow-inner px-7 py-2 text-white text-sm font-bold hover:cursor-pointer"
          />
          </form>
        </Card>

        {/* Delete account */}
        <Card className="border-2 border-red-500 mt-6">
          <h2 className="text-black font-medium text-md mb-2">
            Delete Account
          </h2>
          <p className="text-gray-400 text-sm mb-2">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <Button
            text="Delete Account"
            type="button"
            onClick={handleDeleteAccount}
            className="text-white bg-red-500 px-5 py-2 rounded-md shadow-inner text-sm font-bold hover:cursor-pointer"
          />
        </Card>
      </div>
    </section>
  );
};

export default Settings;
