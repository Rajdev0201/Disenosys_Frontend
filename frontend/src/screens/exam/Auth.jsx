"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BadgeCheck, BookOpen, Clock4, FileText, ShieldAlert } from "lucide-react";

import logo from "@/components/assests/logo.jpg";
import { useToast } from "@/components/context/ToastContext";
import { API, isValidEmail } from "@/components/utils/constant";

const ExamAuth = () => {
  const router = useRouter();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const [load, setLoad] = useState(false);

  const instructionHighlights = useMemo(
    () => [
      { icon: <Clock4 size={18} className="text-[#0BA6DC]" />, title: "Time limit", desc: "30 minutes total duration." },
      { icon: <BookOpen size={18} className="text-[#0BA6DC]" />, title: "Question set", desc: "50 multiple-choice questions." },
      // { icon: <Camera size={18} className="text-[#0BA6DC]" />, title: "Proctoring", desc: "Webcam must remain ON throughout." },
    ],
    [],
  );

  const validate = () => {
    const nextErrors = {};

    if (!name.trim()) nextErrors.name = "Full name is required.";

    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!isValidEmail(email)) nextErrors.email = "Enter a valid email.";

    const cleanedMobile = mobile.trim();
    if (!cleanedMobile) nextErrors.mobile = "Mobile number is required.";
    else if (!/^[0-9]{10}$/.test(cleanedMobile))
      nextErrors.mobile = "Enter a valid 10 digit mobile number.";

    if (!code.trim()) nextErrors.code = "Access code is required.";

    return nextErrors;
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const userData = { name, email, mobile, code };

    try {
      setLoad(true);
      const res = await axios.post(API+"student-login", userData);
      const studentPayload = res?.data;
      console.log("Login response:", studentPayload);
      localStorage.setItem("student", JSON.stringify(studentPayload));
      showToast("success", "Exam login", "Access granted. Starting your exam...");
      router.push("/quiz");
    } catch (err) {
      console.log("Login error:", err);
      showToast(
        "error",
        "Exam login failed",
        err?.response?.data?.error || "Please verify your details and access code.",
      );
    } finally {
      setLoad(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-60px)] font-dm-sans">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_circle_at_0%_0%,#45D2FF1f,transparent_55%),radial-gradient(900px_circle_at_100%_30%,#1820731a,transparent_55%),linear-gradient(to_bottom,#EBFAFF,white_55%)]" />
        <div className="absolute -z-10 -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[#45D2FF]/10 blur-3xl" />
        <div className="absolute -z-10 top-40 -right-40 h-[520px] w-[520px] rounded-full bg-[#182073]/10 blur-3xl" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <header className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src={logo} alt="Disenosys" width={120} height={40} className="rounded-md" priority />
            </Link>

            <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#45D2FF]/30 bg-white/70 backdrop-blur px-3 py-1 text-xs text-[#182073]">
              <BadgeCheck size={14} className="text-[#0BA6DC]" />
              Certification Exam
            </div>
          </header>

          <div className="container mx-auto p-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-white rounded-2xl border border-gray-200">
              <h1 className="font-bold text-center text-[#182073] font-poppins text-2xl mb-4">
                Certification Exam Instructions:
              </h1>

              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                {instructionHighlights.map((item) => (
                  <div key={item.title} className="rounded-xl bg-gradient-to-r w-full from-[#009EE0] to-[#45D2FF] border border-gray-200 p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-xl bg-[#EBFAFF] flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="text-xs text-gray-200 mt-1 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <ol className="list-decimal pl-5 text-[#182073] font-poppins">
                <li>
                  <b>Sign-In:</b> Begin by signing in using your details and the provided access code.
                </li>
                <li>
                  <b>Quiz Access:</b> Once signed in, you will gain access to the quiz, which consists of 50 multiple-choice
                  questions.
                </li>
                <li>
                  <b>Time Limit:</b> You have a 30-minute time limit to complete the quiz.
                </li>
                <li>
                  <b>Answer Submission:</b> Select your preferred option for each question and submit your answer.
                </li>

                <li>
                  <b>Status Indicators:</b>
                  <ul className="list-disc pl-5">
                    <li>
                      <span className="text-green-500 font-bold">Green</span> – Correct answers
                    </li>
                    <li>
                      <span className="text-red-500 font-bold">Red</span> – Incorrect answers
                    </li>
                    <li>
                      <span className="text-yellow-500 font-bold">Yellow</span> – Skipped questions
                    </li>
                  </ul>
                </li>

                <li>
                  <b>Completion:</b> Once you have answered all questions, click the{" "}
                  <span className="text-blue-500 font-bold">&quot;Finish&quot;</span> button to review your results. A pop-up will
                  display your performance, and an email with your results will also be sent to you.
                </li>

                <li>
                  <b>Important Note:</b> Ensure you stay on the quiz page for the entire duration of the exam, as leaving the page
                  will get you <b>DISQUALIFIED</b>.
                </li>
              </ol>
            </div>

            <div className="p-6 sticky top-4 bg-white shadow-lg rounded-2xl border border-gray-200 h-fit">
              <h1 className="font-bold text-center text-[#182073] font-poppins text-2xl mb-4">Exam Login</h1>

              <form onSubmit={handleSignin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#182073] focus:outline-none"
                    required
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#182073] focus:outline-none"
                    required
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    pattern="[0-9]{10}"
                    title="Enter 10 digit mobile number"
                    inputMode="numeric"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="Enter mobile number"
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#182073] focus:outline-none"
                    required
                    aria-invalid={Boolean(errors.mobile)}
                  />
                  {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Access Code</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter access code"
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#182073] focus:outline-none"
                    required
                    aria-invalid={Boolean(errors.code)}
                  />
                  {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
                </div>

                <div className="rounded-lg border border-[#45D2FF]/30 bg-[#EBFAFF]/60 p-3 text-xs text-[#182073] flex gap-2">
                  <ShieldAlert size={16} className="mt-0.5 text-[#182073]" />
                  <p>
                    Keep stay on the exam page. Leaving the page can disqualify your attempt.
                  </p>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#009EE0] to-[#45D2FF] hover:cursor-pointer w-full py-2 text-lg font-semibold text-white rounded-lg hover:bg-[#0f154a] transition-all duration-300"
                    disabled={load}
                  >
                    {load ? "Loading..." : "Continue"}
                  </button>
                </div>

                <div className="pt-2 border-t border-gray-200 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <FileText size={14} />
                  <span>Use the provided access code from the exam coordinator.</span>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-3 text-center text-xs text-gray-500">
            This is an exam-only login page (not Sign In / Sign Up).
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamAuth;
