"use client";

import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  CheckCircle2,
  Clock4,
  XCircle,
} from "lucide-react";

import logo from "@/components/assests/logo.jpg";
import { useToast } from "@/components/context/ToastContext";
import { API } from "@/components/utils/constant";

const STORAGE_KEY = "exam_mcq_state_v1";
const START_KEY = "exam_mcq_start_v1";

const statusStyles = {
  correct: "bg-green-500 text-white",
  wrong: "bg-red-500 text-white",
  notAnswered: "bg-gray-400 text-white",
  notVisited: "bg-blue-600 text-white",
};

const formatTime = (totalSeconds) => {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

const clampIndex = (idx, total) => Math.max(0, Math.min(total - 1, idx));

const OptionCard = memo(function OptionCard({
  index,
  optionId,
  text,
  selected,
  onSelectOption,
}) {
  return (
    <button
      type="button"
      onClick={() => onSelectOption(optionId)}
      className={`w-full text-left hover:cursor-pointer rounded-lg border px-3 py-3 transition flex items-center gap-3 ${
        selected
          ? "border-[#0BA6DC] ring-2 ring-[#0BA6DC]/30 bg-[#EBFAFF]"
          : "border-gray-200 hover:bg-gray-50"
      }`}
    >
      <span
        className={`h-6 w-6 flex items-center justify-center rounded-full text-xs font-semibold ${
          selected ? "bg-[#0BA6DC] text-white" : "bg-[#E7E8F1] text-[#182073]"
        }`}
      >
        {index}
      </span>
      <span className="text-sm text-[#182073]">{text}</span>
    </button>
  );
});

const NavigatorButton = memo(function NavigatorButton({
  n,
  index,
  status,
  active,
  onGoto,
}) {
  return (
    <button
      type="button"
      onClick={() => onGoto(index)}
      className={`h-20 w-6 md:h-7 md:w-7 hover:cursor-pointer rounded-full text-[10px] md:text-[11px] font-semibold transition ${
        statusStyles[status] || statusStyles.notVisited
      } ${active ? "ring-2 ring-[#0BA6DC]/40 ring-offset-2 ring-offset-white" : ""}`}
      aria-label={`Go to question ${n}`}
    >
      {n}
    </button>
  );
});

function ResultModal({ open, onClose, correct, correctText }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-200 p-5">
        <div className="flex items-start gap-3">
          <div
            className={`h-10 w-10 rounded-2xl flex items-center justify-center ${
              correct ? "bg-green-50" : "bg-red-50"
            }`}
          >
            {correct ? (
              <CheckCircle2 className="text-green-600" size={20} />
            ) : (
              <XCircle className="text-red-600" size={20} />
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[#182073]">
              {correct ? "Correct!" : "Wrong answer"}
            </h2>
            {!correct && (
              <p className="text-sm text-gray-600 mt-1">
                Correct answer: <span className="font-semibold">{correctText}</span>
              </p>
            )}
            {correct && (
              <p className="text-sm text-gray-600 mt-1">Good job. Continue to the next question.</p>
            )}
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#182073] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0f154a] transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function FinishModal({ open, onCancel, onConfirm, score, saving }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-200 p-5">
        <h2 className="text-lg font-bold text-[#182073]">Finish exam?</h2>
        <p className="text-sm text-gray-600 mt-2">
          This will end the exam. Make sure you attempted all questions you want.
        </p>
        {score && (
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Correct</span>
              <span className="font-semibold text-[#182073]">{score.correct}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-gray-600">Wrong</span>
              <span className="font-semibold text-[#182073]">{score.wrong}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-gray-600">Not answered</span>
              <span className="font-semibold text-[#182073]">{score.notAnswered}</span>
            </div>
          </div>
        )}
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={saving}
            className="bg-[#182073] hover:cursor-pointer text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0f154a] transition disabled:opacity-60"
          >
            {saving ? "Submitting..." : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Quiz({ title, questions, durationSeconds = 1800, studentId }) {
  const router = useRouter();
  const { showToast } = useToast();

  const total = questions?.length || 0;

  const resolvedStudentId = useMemo(() => {
    if (studentId) return String(studentId);
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem("student");
      if (!raw) return null;
      const payload = JSON.parse(raw);
      const direct =
        payload?.studentId ||
        payload?._id ||
        payload?.id ||
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
    } catch {
      return null;
    }
  }, [studentId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [answers, setAnswers] = useState(() => Array(total).fill(null));
  const [status, setStatus] = useState(() => Array(total).fill("notVisited"));
  const [timeRemaining, setTimeRemaining] = useState(durationSeconds);
  const [resultModal, setResultModal] = useState({ open: false, correct: false, correctText: "" });
  const [finishOpen, setFinishOpen] = useState(false);
  const [submittingFinish, setSubmittingFinish] = useState(false);

  const finishingRef = useRef(false);
  const tickRef = useRef(null);

  const currentQuestion = questions?.[currentIndex] || null;

  useEffect(() => {
    setAnswers(Array(total).fill(null));
    const initStatus = Array(total).fill("notVisited");
    if (total) initStatus[0] = "notAnswered";
    setStatus(initStatus);
    setCurrentIndex(0);
    setSelectedId(null);
  }, [total]);

  const persistState = useCallback(
    (next) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
    },
    [],
  );

  const loadPersisted = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed) return null;
      if (!Array.isArray(parsed.answers) || !Array.isArray(parsed.status)) return null;
      return parsed;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!total) return;

    const persisted = loadPersisted();
    if (persisted && persisted.total === total) {
      setAnswers(persisted.answers);
      setStatus(persisted.status);
      setCurrentIndex(clampIndex(persisted.currentIndex || 0, total));
      setSelectedId(persisted.answers?.[persisted.currentIndex || 0] ?? null);
    }
  }, [loadPersisted, total]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!total) return;
    const timeout = setTimeout(() => {
      persistState({
        total,
        currentIndex,
        answers,
        status,
      });
    }, 120);
    return () => clearTimeout(timeout);
  }, [answers, currentIndex, persistState, status, total]);

  const computeScore = useCallback(() => {
    let correct = 0;
    let wrong = 0;
    let notAnswered = 0;
    for (const s of status) {
      if (s === "correct") correct += 1;
      else if (s === "wrong") wrong += 1;
      else if (s === "notAnswered") notAnswered += 1;
    }
    return { correct, wrong, notAnswered };
  }, [status]);

  const computePercentage = useCallback(() => {
    const score = computeScore();
    const pct = total ? (score.correct / total) * 100 : 0;
    return Number(pct.toFixed(2));
  }, [computeScore, total]);

  const startTimer = useCallback(() => {
    if (typeof window === "undefined") return;
    if (tickRef.current) return;

    let startIso = null;
    try {
      startIso = localStorage.getItem(START_KEY);
    } catch {
      startIso = null;
    }
    if (!startIso) {
      startIso = new Date().toISOString();
      try {
        localStorage.setItem(START_KEY, startIso);
      } catch {
        // ignore
      }
    }
    const startTime = new Date(startIso).getTime();

    tickRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const remaining = Math.max(durationSeconds - elapsed, 0);
      setTimeRemaining(remaining);
      if (remaining <= 0 && !finishingRef.current) {
        finishingRef.current = true;
        setFinishOpen(true);
      }
    }, 1000);
  }, [durationSeconds]);

  useEffect(() => {
    if (!total) return;
    startTimer();
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
      tickRef.current = null;
    };
  }, [startTimer, total]);

  useEffect(() => {
    if (!total) return;
    setSelectedId(answers[currentIndex] ?? null);
    setStatus((prev) => {
      const next = prev.slice();
      if (next[currentIndex] === "notVisited") next[currentIndex] = "notAnswered";
      return next;
    });
  }, [answers, currentIndex, total]);

  const gotoQuestion = useCallback(
    (idx) => {
      setCurrentIndex((prev) => {
        const nextIdx = clampIndex(idx, total);
        if (nextIdx === prev) return prev;
        return nextIdx;
      });
    },
    [total],
  );

  const nextQuestion = useCallback(() => {
    setCurrentIndex((prev) => clampIndex(prev + 1, total));
  }, [total]);

  const prevQuestion = useCallback(() => {
    setCurrentIndex((prev) => clampIndex(prev - 1, total));
  }, [total]);

  const submitCurrent = useCallback(() => {
    if (!currentQuestion) return;
    if (!selectedId) {
      showToast("warning", "Select an option", "Please choose an option before submit.");
      return;
    }
    const opt = currentQuestion.options.find((o) => String(o.id) === String(selectedId)) || null;
    const correctOpt = currentQuestion.options.find((o) => o.isCorrect) || null;
    const isCorrect = Boolean(opt?.isCorrect);

    setAnswers((prev) => {
      const next = prev.slice();
      next[currentIndex] = selectedId;
      return next;
    });
    setStatus((prev) => {
      const next = prev.slice();
      next[currentIndex] = isCorrect ? "correct" : "wrong";
      return next;
    });
    setResultModal({
      open: true,
      correct: isCorrect,
      correctText: correctOpt?.text || "—",
    });
  }, [currentIndex, currentQuestion, selectedId, showToast]);

  const skipCurrent = useCallback(() => {
    setAnswers((prev) => {
      const next = prev.slice();
      next[currentIndex] = null;
      return next;
    });
    setStatus((prev) => {
      const next = prev.slice();
      if (next[currentIndex] === "notVisited") next[currentIndex] = "notAnswered";
      return next;
    });
    nextQuestion();
  }, [currentIndex, nextQuestion]);

  const closeResultModal = useCallback(() => {
    setResultModal((prev) => ({ ...prev, open: false }));
    if (currentIndex < total - 1) nextQuestion();
    else setFinishOpen(true);
  }, [currentIndex, nextQuestion, total]);

  const finish = useCallback(() => {
    setFinishOpen(true);
  }, []);

  const confirmFinish = useCallback(async () => {
    if (submittingFinish) return;
    setSubmittingFinish(true);

    const score = computeScore();
    const percentage = computePercentage();
    const totalScore = score.correct;

    try {
      if (!resolvedStudentId) {
        showToast("warning", "Missing student id", "Result not saved. Please login again.");
        setSubmittingFinish(false);
        return;
      }

      await axios.post(
        API + "updateStudentQuiz",
        { studentId: resolvedStudentId, totalScore, percentage },
        { withCredentials: true },
      );
    } catch (err) {
      showToast(
        "error",
        "Result save failed",
        err?.response?.data?.message || "Could not store result. Please try again.",
      );
      setSubmittingFinish(false);
      return;
    } finally {
      // no-op: cleanup happens only after successful save
    }

    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = null;
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(START_KEY);
    } catch {
      // ignore
    }

    showToast("success", "Exam submitted", `Score: ${totalScore}/${total} (${percentage}%)`);
    setSubmittingFinish(false);
    router.push("/");
  }, [computePercentage, computeScore, router, showToast, resolvedStudentId, submittingFinish, total]);

  const progressPct = total ? Math.round(((currentIndex + 1) / total) * 100) : 0;
  const timeLabel = formatTime(timeRemaining);
  const urgent = timeRemaining <= 5 * 60;

  const selectOption = useCallback((id) => setSelectedId(id), []);

  const legend = useMemo(
    () => [
      { key: "correct", label: "Correct Answer", dot: "bg-green-500" },
      { key: "wrong", label: "Wrong Answer", dot: "bg-red-500" },
      { key: "notAnswered", label: "Not Answered", dot: "bg-gray-400" },
      { key: "notVisited", label: "Not Visited", dot: "bg-blue-600" },
    ],
    [],
  );

  if (!total) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-600">
        No questions available.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="">
        {/* Header */}
        <div className="px-4 md:px-6 pt-4 pb-3 border-b border-gray-200">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Image src={logo} alt="Disenosys" width={90} height={30} className="rounded" priority />
              <div className="min-w-0">
                <h1 className="text-sm md:text-base font-semibold text-[#182073] truncate">
                  {title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className={`text-sm font-semibold ${urgent ? "text-red-600" : "text-[#0BA6DC]"}`}>
                  {timeLabel}
                </div>
                <div className="text-[10px] text-gray-500 flex items-center justify-end gap-1">
                  <Clock4 size={12} />
                  Time Remaining
                </div>
              </div>

              <button
                type="button"
                onClick={finish}
                className="bg-[#0BA6DC] hover:bg-[#009EE0] transition text-white text-sm font-semibold px-4 py-2 rounded-md"
              >
                Finish
              </button>
            </div>
          </div>

          <div className="mt-3">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-2 bg-[#0BA6DC] rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 md:p-6">
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start">
              {/* Question area */}
              <div className="md:col-span-8 flex justify-center">
                <div className="w-full">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold text-[#182073]">
                        Question {currentIndex + 1}
                      </span>{" "}
                      of {total}
                    </div>
                  </div>

                  <div className="mt-3 rounded-lg p-6 md:p-10 ">
                    <p className="text-sm md:text-base text-[#182073] font-medium">
                      {currentQuestion?.question}
                    </p>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-3">
                      {currentQuestion?.options?.map((o, idx) => (
                        <OptionCard
                          key={o.id}
                          index={idx + 1}
                          optionId={o.id}
                          text={o.text}
                          selected={String(selectedId || "") === String(o.id)}
                          onSelectOption={selectOption}
                        />
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={submitCurrent}
                        className="bg-[#0BA6DC] hover:cursor-pointer hover:bg-[#009EE0] transition text-white text-sm font-semibold px-6 py-2 rounded-md"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={skipCurrent}
                        className="border border-gray-200 hover:cursor-pointer hover:bg-gray-50 transition text-gray-700 text-sm font-semibold px-6 py-2 rounded-md"
                      >
                        Skip
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigator */}
              <div className="md:col-span-4 flex justify-center">
                <div className="w-full rounded-lg border border-gray-200 p-6">
                  <h2 className="text-sm font-semibold text-[#182073] text-center">
                    Question Navigator
                  </h2>
                  <div className="mt-3 grid grid-cols-10 gap-2 justify-items-center">
                    {status.map((s, idx) => (
                      <NavigatorButton
                        key={`nav-${idx}`}
                        n={idx + 1}
                        index={idx}
                        status={s}
                        active={idx === currentIndex}
                        onGoto={gotoQuestion}
                      />
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
                    {legend.map((l) => (
                      <div key={l.key} className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${l.dot}`} />
                        <span>{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer nav */}
            <div className="mt-10 flex items-center justify-center gap-3 border-t border-gray-200 pt-4">
              <button
                type="button"
                onClick={prevQuestion}
                disabled={currentIndex === 0}
                className="px-4 py-2 mt-6 rounded-md border hover:cursor-pointer border-gray-200 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white transition"
              >
                Previous Question
              </button>

              <button
                type="button"
                onClick={() => {
                  if (currentIndex >= total - 1) setFinishOpen(true);
                  else nextQuestion();
                }}
                className="px-4 py-2 mt-6 rounded-md border hover:cursor-pointer border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Next Question
              </button>
            </div>
          </div>
        </div>
      </div>

      <ResultModal
        open={resultModal.open}
        correct={resultModal.correct}
        correctText={resultModal.correctText}
        onClose={closeResultModal}
      />

      <FinishModal
        open={finishOpen}
        onCancel={() => setFinishOpen(false)}
        onConfirm={confirmFinish}
        score={computeScore()}
        saving={submittingFinish}
      />
    </div>
  );
}
