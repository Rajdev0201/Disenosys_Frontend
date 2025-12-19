"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "@/components/assests/logo.jpg";
import girl from "@/components/assests/auth.png"; // replace with your actual image
import { useRouter } from "next/navigation";
import { LoginData, SignupData } from "@/components/Redux/actions/auth";
import Input from "@/components/custom/Input";
import Button from "@/components/custom/Button";
import { useDispatch, useSelector } from "react-redux";
import { API, isStrongPassword, isValidEmail } from "@/components/utils/constant";
import { useToast } from "@/components/context/ToastContext";
import { clearMessages } from "@/components/Redux/features/authSlice";
import axios from "axios";
import dynamic from "next/dynamic";

const Glogin = dynamic(() => import("@/screens/auth/Glogin"), {
  ssr: false,
});

const  LinkedInSocialLogin = dynamic(() => import("@/screens/auth/Linkedin"), {
  ssr: false,
});

const Auth = () => {
  const [mode, setMode] = useState("signup"); // signup | signin | forgot
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const nav = useRouter();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { error, logoutmsg } = useSelector((state) => state.user);
  const firstTime = useRef(true);

  // Show error from backend
  useEffect(() => {
    if (error) {
      showToast("error", error, "Please check your account info before continuing.!");
    }
  }, [error]);

   useEffect(() => {
    if (logoutmsg && firstTime.current) {
      firstTime.current = false;
      showToast("success", logoutmsg);
    }
    dispatch(clearMessages());
  }, [logoutmsg,dispatch]);

  const handleSignup = async (e) => {
    e.preventDefault();

    // 1. Required fields
    if (
      !userName.trim() ||
      !userEmail.trim() ||
      !password ||
      !confirmPassword
    ) {
      return showToast(
        "error",
        "All fields are required",
        "Please fill out every field before signing up."
      );
    }

    // 2. Email validation
    if (!isValidEmail(userEmail)) {
      return showToast(
        "error",
        "Invalid Email Address",
        "Enter a valid email to continue."
      );
    }

    // 3. Password strength
    if (!isStrongPassword(password)) {
      return showToast(
        "error",
        "Weak Password",
        "Password must be at least 6 characters long."
      );
    }

    // 4. Password match
    if (password !== confirmPassword) {
      return showToast(
        "error",
        "Passwords Do Not Match",
        "Both passwords must be the same."
      );
    }

    // 5. Prepare data
    const data = { userName, userEmail, password };

    // 6. Dispatch
    dispatch(SignupData(data));
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    if (!userEmail.trim() || !password) {
      return showToast(
        "error",
        "Missing Credentials",
        "Please enter both email and password."
      );
    }

    if (!isValidEmail(userEmail)) {
      return showToast(
        "error",
        "Invalid Email Address",
        "Enter a valid email to continue."
      );
    }

    const data = { userEmail, password };

    dispatch(LoginData(data, nav));
  };
 
    const handleForgotshow = async (e) => {
    e.preventDefault();

    try{
    const res = await axios.post(API+"user/forgotPassword", {
      userEmail,
    });
    if(res.data.success){
      showToast("success","forget password","Email sent successfully");
    }
  }catch(err){
      showToast("error","forget password",err.response?.data?.message);
  }
  };
  return (
    <section className="min-h-screen grid lg:grid-cols-2 font-dm-sans">
      {/* Left Section */}
      <div className="relative bg-signup px-8 lg:px-16">
        <div className="absolute top-6 left-8">
          <Image
            src={logo}
            alt="Disenosys"
            width={130}
            height={40}
            className="rounded-lg"
          />
        </div>

        <div className="flex flex-col items-center justify-center mt-28 bg-gradient-to-b from-[#EBFAFF] to-[#baeaf8c3] shadow-sm">
          {mode === "signup" && (
            <p className="text-[#101359] text-lg lg:text-2xl font-semibold max-w-md leading-relaxed">
              Kickstart your automotive career with expert courses, projects,
              and certifications
            </p>
          )}
          {mode === "signin" && (
            <p className="text-[#101359] text-lg lg:text-2xl font-semibold max-w-md leading-relaxed">
              Continue your automotive learning journey with Disenosys
            </p>
          )}
          {mode === "forgot" && (
            <p className="text-[#101359] text-lg lg:text-2xl font-semibold max-w-md leading-relaxed">
              Continue your automotive learning journey with Disenosys
            </p>
          )}
          <div className="mt-10">
            <Image
              src={girl}
              alt="Student"
              width={400}
              height={400}
              className="object-contain bg-gradient-to-b from-[#EBFAFF] to-[#45D2FF]"
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-20 py-12 bg-white">
        {mode === "signup" && (
          <>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#101359] mb-2">
              Join Disenosys Today
            </h1>
            <p className="text-sm text-[#6B6B6B] mb-8 max-w-md">
              Create your account for instant access to automotive courses,
              projects, and expert guidance.
            </p>

            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name*
                </label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={userName}
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:ring-2 focus:ring-[#0BA6DC] outline-none"
                  onChange={(e) => setuserName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  userEmail*
                </label>
                <Input
                  type="userEmail"
                  placeholder="Enter your userEmail address"
                  value={userEmail}
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:ring-2 focus:ring-[#0BA6DC] outline-none"
                  onChange={(e) => setuserEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password*
                </label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:ring-2 focus:ring-[#0BA6DC] outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password*
                </label>
                <Input
                  type="password"
                  placeholder="Enter your confirm password"
                  value={confirmPassword}
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:ring-2 focus:ring-[#0BA6DC] outline-none"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button
                type="button"
                onClick={handleSignup}
                className="w-full bg-gradient-to-r from-[#0BA6DC] to-[#45D2FF] text-white py-3 rounded-full font-medium text-base hover:opacity-90 transition hover:cursor-pointer"
                text="Create an account"
              />

              <p className="text-xs text-[#6B6B6B] mt-3">
                By creating an account, you agree to the{" "}
                <a href="#" className="text-[#0BA6DC] hover:underline">
                  Terms of use
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#0BA6DC] hover:underline">
                  Privacy Policy
                </a>
                .
              </p>

              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-500 text-sm px-2">OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
            </form>
          </>
        )}

        {/* Signin */}
        {mode === "signin" && (
          <>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#101359] mb-2">
              Welcome Back to Disenosys
            </h1>
            <p className="text-sm text-[#6B6B6B] mb-8 max-w-md">
              Access your account to continue upskilling in automotive
              technology, track your progress, and gain industry certifications.
            </p>

            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  userEmail*
                </label>
                <Input
                  type="userEmail"
                  placeholder="Enter your userEmail address"
                  value={userEmail}
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:ring-2 focus:ring-[#0BA6DC] outline-none"
                  onChange={(e) => setuserEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password*
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:ring-2 focus:ring-[#0BA6DC] outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                type="button"
                onClick={handleSignin}
                className="w-full bg-gradient-to-r from-[#0BA6DC] to-[#45D2FF] text-white py-3 rounded-full font-medium text-base hover:opacity-90 transition hover:cursor-pointer"
                text="Continue"
              />

              <div className="text-right">
                <button
                  onClick={() => setMode("forgot")}
                  className="text-[#0BA6DC] text-sm hover:underline hover:cursor-pointer"
                >
                  Forget your password ?
                </button>
              </div>

              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-500 text-sm px-2">OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* <button
                type="button"
                className="w-full border border-gray-300 py-3 rounded-full flex items-center justify-center gap-3 text-gray-700 text-sm hover:bg-gray-50"
              >
                <img src="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button> */}
            </form>
          </>
        )}

        {/* social login */}
        {mode !== "forgot" && (
          <div className="space-y-3">
            {/* GOOGLE LOGIN */}
            <div
              className="w-full flex items-center justify-center text-[#0d1039] 
                    border border-gray-300 rounded-lg px-4 py-2 shadow-sm cursor-pointer"
            >
              <Glogin />
            </div>

            {/* LINKEDIN LOGIN */}
            <div
              className="w-full flex items-center justify-center text-[#0d1039] 
                    border border-gray-300 rounded-lg px-4 py-2 shadow-sm cursor-pointer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                alt="LinkedIn Logo"
                className="w-5 h-5 mr-2"
              />
              <LinkedInSocialLogin text="Continue with LinkedIn" />
            </div>

            {/* SWITCH MODE */}
            {mode === "signin" ? (
              <p className="text-center text-sm text-[#6B6B6B] mt-4">
                Don’t have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-[#0BA6DC] hover:underline font-medium"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p className="text-center text-sm text-[#6B6B6B] mt-4">
                Already have an account?{" "}
                <button
                  onClick={() => setMode("signin")}
                  className="text-[#0BA6DC] hover:underline font-medium hover:cursor-pointer"
                >
                  Log In
                </button>
              </p>
            )}
          </div>
        )}

        {/* Forgot */}
        {mode === "forgot" && (
          <>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#101359] mb-2 hover:cursor-pointer">
              Forgot Password
            </h1>
            <p className="text-sm text-[#6B6B6B] mb-8 max-w-md">
              Enter your registered userEmail address and we'll send you a code
              to reset your password.
            </p>

            <form className="space-y-4" onSubmit={handleForgotshow}>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  userEmail*
                </label>
                <Input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setuserEmail(e.target.value)}
                  name="userEmail"
                  placeholder="Enter your userEmail address"
                />
              </div>

              <Button
                type="submit"
                text="send code"
                className="w-full bg-gradient-to-r hover:cursor-pointer from-[#0BA6DC] to-[#45D2FF] text-white py-3 rounded-full font-medium text-base hover:opacity-90 transition"
              />

              <div className="text-right">
                <button
                  onClick={() => setMode("signin")}
                  className="text-[#0BA6DC] text-sm hover:underline"
                >
                  Back to Log In
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default Auth;
