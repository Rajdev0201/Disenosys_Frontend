"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/components/assests/logo.jpg";
import girl from "@/components/assests/logo.jpg"; // replace with your actual image

const Auth = () => {
  const [mode, setMode] = useState("signup"); // signup | signin | forgot

  return (
    <section className="min-h-screen grid lg:grid-cols-2 font-dm-sans">
      {/* Left Section */}
      <div className="relative bg-gradient-to-b from-[#EBFAFF] to-[#45D2FF] px-8 lg:px-16">
        <div className="absolute top-6 left-8">
          <Image src={logo} alt="Disenosys" width={130} height={40} />
        </div>

        <div className="flex flex-col items-center justify-center mt-28">
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
            {/* <Image
              src={girl}
              alt="Student"
              width={400}
              height={400}
              className="object-contain"
            /> */}
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
                <label className="text-sm font-medium text-gray-700">Full Name*</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:ring-2 focus:ring-[#0BA6DC] outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email*</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:ring-2 focus:ring-[#0BA6DC] outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Password*</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:ring-2 focus:ring-[#0BA6DC] outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Confirm Password*</label>
                <input
                  type="password"
                  placeholder="Enter your confirm password"
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:ring-2 focus:ring-[#0BA6DC] outline-none"
                />
              </div>

              <button
                type="button"
                className="w-full bg-gradient-to-r from-[#0BA6DC] to-[#45D2FF] text-white py-3 rounded-full font-medium text-base hover:opacity-90 transition"
              >
                Create an account
              </button>

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

              {/* Google */}
              <button
                type="button"
                className="w-full border border-gray-300 py-3 rounded-full flex items-center justify-center gap-3 text-gray-700 text-sm hover:bg-gray-50"
              >
                <img src="/google.svg" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>

              {/* LinkedIn */}
              <button
                type="button"
                className="w-full border border-gray-300 py-3 rounded-full flex items-center justify-center gap-3 text-gray-700 text-sm hover:bg-gray-50"
              >
                <img src="/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                Continue with LinkedIn
              </button>

              <p className="text-center text-sm text-[#6B6B6B] mt-4">
                Already have an account?{" "}
                <button
                  onClick={() => setMode("signin")}
                  className="text-[#0BA6DC] hover:underline font-medium"
                >
                  Log In
                </button>
              </p>
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
              Access your account to continue upskilling in automotive technology,
              track your progress, and gain industry certifications.
            </p>

            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Email*</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:ring-2 focus:ring-[#0BA6DC] outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Password*</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:ring-2 focus:ring-[#0BA6DC] outline-none"
                />
              </div>

              <button
                type="button"
                className="w-full bg-gradient-to-r from-[#0BA6DC] to-[#45D2FF] text-white py-3 rounded-full font-medium text-base hover:opacity-90 transition"
              >
                Continue
              </button>

              <div className="text-right">
                <button
                  onClick={() => setMode("forgot")}
                  className="text-[#0BA6DC] text-sm hover:underline"
                >
                  Forget your password
                </button>
              </div>

              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-500 text-sm px-2">OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <button
                type="button"
                className="w-full border border-gray-300 py-3 rounded-full flex items-center justify-center gap-3 text-gray-700 text-sm hover:bg-gray-50"
              >
                <img src="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>

              <button
                type="button"
                className="w-full border border-gray-300 py-3 rounded-full flex items-center justify-center gap-3 text-gray-700 text-sm hover:bg-gray-50"
              >
                <img src="/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                Continue with LinkedIn
              </button>

              <p className="text-center text-sm text-[#6B6B6B] mt-4">
                Don’t have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-[#0BA6DC] hover:underline font-medium"
                >
                  Sign Up
                </button>
              </p>
            </form>
          </>
        )}

        {/* Forgot */}
        {mode === "forgot" && (
          <>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#101359] mb-2">
              Forgot Password
            </h1>
            <p className="text-sm text-[#6B6B6B] mb-8 max-w-md">
              Enter your registered email address and we'll send you a code to
              reset your password.
            </p>

            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Email*</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:ring-2 focus:ring-[#0BA6DC] outline-none"
                />
              </div>

              <button
                type="button"
                className="w-full bg-gradient-to-r from-[#0BA6DC] to-[#45D2FF] text-white py-3 rounded-full font-medium text-base hover:opacity-90 transition"
              >
                Send Code
              </button>

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
