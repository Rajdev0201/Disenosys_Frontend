"use client";
import { useToast } from "@/components/context/ToastContext";
import Input from "@/components/custom/Input";
import { API } from "@/components/utils/constant";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Reset = () => {
  const search = useSearchParams();
  const token = search.get("token");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { showToast } = useToast();

  const handleChangeReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API}user/changePassword/${token}`, {
        password,
        confirmPassword,
      });
      if (res.data.success) {
        showToast(
          "success",
          "password update",
          "Successfully changed password"
        );
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      showToast("error", "password update", err?.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-dm-sans">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form
        className="bg-white p-6 rounded-md shadow-md w-96"
        onSubmit={handleChangeReset}
      >
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmpassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <Input
            type="password"
            name="confirmpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-400 hover:cursor-pointer text-white py-2 rounded hover:bg-blue-600"
        >
          Reset Password
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Powered by <span className="font-semibold">Disenosys</span>
      </p>
    </div>
  );
};

export default Reset;
