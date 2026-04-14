"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { API } from "@/components/utils/constant";
import { useToast } from "@/components/context/ToastContext";
import Quiz from "@/screens/quiz/Quiz";

const STUDENT_KEY = "student";

const extractStudentId = (payload) => {
  if (!payload) return null;
  const direct =
    payload.studentId ||
    payload._id ||
    payload.id ||
    payload?.user?._id ||
    payload?.user?.id ||
    payload?.student?._id ||
    payload?.student?.id ||
    payload?.data?._id ||
    payload?.data?.id ||
    payload?.data?.studentId ||
    payload?.data?.user?._id ||
    payload?.data?.user?.id ||
    payload?.data?.student?._id ||
    payload?.data?.student?.id;
  return direct ? String(direct) : null;
};

const normalizeQuestions = (raw) => {
  const arr = Array.isArray(raw) ? raw : [];
  return arr.map((q, idx) => {
    const id = q?.id || q?._id || `q-${idx}`;
    const question = q?.question || q?.prompt || q?.title || "Question";
    const optionsRaw = Array.isArray(q?.options)
      ? q.options
      : Array.isArray(q?.choices)
        ? q.choices
        : [];
    const options = optionsRaw.map((opt, optIdx) => {
      const text = opt?.text ?? opt?.label ?? String(opt ?? "");
      const optId = opt?.id || opt?._id || `${id}-opt-${optIdx}`;
      return { id: optId, text, isCorrect: Boolean(opt?.isCorrect) };
    });
    return { id, question, options };
  });
};

const fetchQuestions = async () => {
  let lastErr = null;
    try {
      const res = await axios.get(API + "exam/questions", { withCredentials: true });
      const data = res?.data;
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.questions)) return data.questions;
      if (Array.isArray(data?.data)) return data.data;
    } catch (e) {
      lastErr = e;
    }
  throw lastErr || new Error("Unable to fetch questions");
};

export default function Main() {
  const router = useRouter();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  const student = useMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(STUDENT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const studentId = useMemo(() => extractStudentId(student), [student]);

  const loadQuestions = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const raw = await fetchQuestions();
      const normalized = normalizeQuestions(raw);
      if (!normalized.length) {
        setError("No questions available right now. Please try again.");
        return;
      }
      setQuestions(normalized);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load questions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!student) {
      showToast("error", "Exam Login Required", "Please login to start the exam.");
      router.push("/exam");
      return;
    }
    if (!studentId) {
      showToast("warning", "Missing student id", "Please login again to start the exam.");
      router.push("/exam");
      return;
    }
    loadQuestions();
  }, [loadQuestions, router, showToast, student, studentId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-dm-sans bg-[#F6F8FF]">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-[#182073] rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-600">Loading exam...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center font-dm-sans bg-[#F6F8FF] px-4">
        <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-[#182073]">Unable to start</h1>
          <p className="text-sm text-gray-600 mt-2">{error}</p>
          <div className="mt-5 flex gap-3">
            <button
              onClick={loadQuestions}
              className="bg-[#182073] px-4 py-2 rounded-lg text-white font-semibold hover:bg-[#0f154a] transition"
            >
              Retry
            </button>
            <button
              onClick={() => router.push("/exam")}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className=" font-dm-sans">
      <Quiz
        title="Automotive Product Design Engineer Test"
        questions={questions}
        durationSeconds={30 * 60}
        studentId={studentId}
      />
    </main>
  );
}
