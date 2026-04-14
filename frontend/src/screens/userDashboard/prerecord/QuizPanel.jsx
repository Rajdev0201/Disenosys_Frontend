"use client";
import React, { useEffect, useMemo, useState } from "react";
import { CircleAlert, Lock, Trophy } from "lucide-react";

function getQuestionId(question, idx) {
  return question?.id || question?._id || question?.question || `q-${idx}`;
}

function getOptions(question) {
  if (Array.isArray(question?.options)) {
    return question.options.map((opt, idx) => ({
      value: opt?.value ?? opt?.id ?? idx,
      label: opt?.label ?? opt?.text ?? String(opt),
    }));
  }

  if (Array.isArray(question?.choices)) {
    return question.choices.map((opt, idx) => ({
      value: opt?.value ?? opt?.id ?? idx,
      label: opt?.label ?? opt?.text ?? String(opt),
    }));
  }

  return [];
}

function getCorrectValue(question) {
  if (question?.correctIndex != null) return Number(question.correctIndex);
  if (question?.correctAnswer != null) return question.correctAnswer;
  if (question?.answer != null) return question.answer;
  if (question?.correct != null) return question.correct;
  return null;
}

export default function QuizPanel({
  title = "Course Quiz",
  questionsSource,
  attempt,
  onSubmitAttempt,
  saving,
  locked = false,
  lockedMessage = "Please complete all videos before continue quiz exam.",
}) {
  const questions = useMemo(() => {
    const raw = questionsSource || null;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw?.questions)) return raw.questions;
    return [];
  }, [questionsSource]);

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
  }, [title, questionsSource]);

  const computed = useMemo(() => {
    if (!submitted) return null;
    let correct = 0;
    for (let idx = 0; idx < questions.length; idx += 1) {
      const q = questions[idx];
      const qId = getQuestionId(q, idx);
      const chosen = answers[qId];
      const correctAnswer = getCorrectValue(q);
      if (
        chosen != null &&
        correctAnswer != null &&
        String(chosen) === String(correctAnswer)
      ) {
        correct += 1;
      }
    }
    const total = questions.length || 0;
    const scorePercent = total ? Math.round((correct / total) * 100) : 0;
    return { correct, total, scorePercent };
  }, [answers, questions, submitted]);

  if (locked) {
    return (
      <div className="rounded-[28px] border border-[#0BA6DC]/20 bg-[linear-gradient(135deg,#F7FDFF_0%,#EBFAFF_55%,#F4F8FF_100%)] p-6 shadow-[0_18px_45px_rgba(11,166,220,0.08)]">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#182073] text-white">
            <Lock size={20} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[#182073] font-semibold">
              <Trophy size={18} className="text-[#0BA6DC]" />
              {title}
            </div>
            <p className="mt-2 text-sm text-[#42526B]">{lockedMessage}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#009EE0] shadow-sm ring-1 ring-[#0BA6DC]/15">
              <CircleAlert size={14} />
              Finish every video to unlock the exam
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="rounded-[28px] border border-[#0BA6DC]/20 bg-white p-6 shadow-[0_18px_45px_rgba(11,166,220,0.08)]">
        <div className="flex items-center gap-2 text-[#182073] font-semibold">
          <Trophy size={18} className="text-[#0BA6DC]" />
          {title}
        </div>
        <p className="mt-1 text-sm text-[#5F6C80]">No quiz available for this course yet.</p>
        {attempt?.bestScorePercent != null && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#EBFAFF] px-4 py-2 text-sm">
            <span className="text-[#42526B]">Best score:</span>
            <span className="font-semibold text-[#182073]">{attempt.bestScorePercent}%</span>
          </div>
        )}
      </div>
    );
  }

  const submit = () => {
    setSubmitted(true);
    let correct = 0;
    for (let idx = 0; idx < questions.length; idx += 1) {
      const q = questions[idx];
      const qId = getQuestionId(q, idx);
      const chosen = answers[qId];
      const correctAnswer = getCorrectValue(q);
      if (
        chosen != null &&
        correctAnswer != null &&
        String(chosen) === String(correctAnswer)
      ) {
        correct += 1;
      }
    }
    const total = questions.length || 0;
    const scorePercent = total ? Math.round((correct / total) * 100) : 0;
    onSubmitAttempt?.({ correct, total, scorePercent });
  };

  return (
    <div className="rounded-[28px] border border-[#0BA6DC]/20 bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FCFF_100%)] p-6 shadow-[0_18px_45px_rgba(11,166,220,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[#182073] font-semibold">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#009EE0_0%,#45D2FF_100%)] text-white shadow-sm">
            <Trophy size={18} />
          </div>
          <div>
            <div>{title}</div>
            <div className="text-xs font-medium text-[#5F6C80]">
              Complete the quiz and we&apos;ll save the score to your dashboard.
            </div>
          </div>
        </div>
        {attempt?.bestScorePercent != null && (
          <div className="rounded-full bg-white px-3 py-1 text-xs text-[#42526B] ring-1 ring-[#0BA6DC]/15">
            Best: <span className="font-semibold text-[#182073]">{attempt.bestScorePercent}%</span>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-4">
        {questions.map((q, idx) => {
          const qId = getQuestionId(q, idx);
          const options = getOptions(q);
          return (
            <div
              key={qId}
              className="rounded-[22px] border border-[#0BA6DC]/15 bg-white p-4 shadow-sm"
            >
              <div className="text-sm font-semibold text-[#182073]">
                {idx + 1}. {q.question || q.prompt || "Question"}
              </div>
              <div className="mt-2 grid gap-2">
                {options.map((opt, optIdx) => {
                  const value = opt?.value;
                  const label = opt?.label;
                  const checked = String(answers[qId] ?? "") === String(value);
                  return (
                    <label
                      key={`${qId}-${optIdx}`}
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                        checked
                          ? "border-[#0BA6DC] bg-[#EBFAFF] shadow-sm"
                          : "border-slate-200 hover:border-[#45D2FF]/40 hover:bg-[#F8FCFF]"
                      }`}
                    >
                      <input
                        type="radio"
                        name={String(qId)}
                        value={String(value)}
                        checked={checked}
                        onChange={() => setAnswers((prev) => ({ ...prev, [qId]: value }))}
                        className="accent-[#0BA6DC]"
                      />
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                          checked
                            ? "bg-[#0BA6DC] text-white"
                            : "bg-[#F0F5FA] text-[#182073]"
                        }`}
                      >
                        {optIdx + 1}
                      </span>
                      <span className="text-[#24364D]">{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          disabled={saving}
          onClick={submit}
          className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#009EE0_0%,#45D2FF_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(11,166,220,0.24)] transition hover:opacity-95 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Submit quiz"}
        </button>
        {computed && (
          <div className="rounded-full bg-[#182073] px-4 py-2 text-sm text-white">
            <span className="text-white/75">Score:</span>{" "}
            <span className="font-semibold">{computed.scorePercent}%</span>{" "}
            <span className="text-white/75">({computed.correct}/{computed.total})</span>
          </div>
        )}
      </div>
    </div>
  );
}
