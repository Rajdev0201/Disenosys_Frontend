"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Award, CheckCircle2, ChevronRight, Lock, RefreshCw } from "lucide-react";
import { useSelector } from "react-redux";
import { API } from "@/components/utils/constant";
import CertificatePanel from "./prerecord/CertificatePanel";
import { prerecordEndpoints } from "./prerecord/prerecordApi";

const clampPercent = (value) => {
  const n = Math.round(Number(value) || 0);
  return Math.max(0, Math.min(100, n));
};

const toMs = (value) => {
  if (!value) return 0;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : 0;
};

const parseProgressDoc = (resData) => {
  return resData?.progress || resData?.courseProgress || resData || null;
};

const parseQuizMeta = (doc) => { 
  const rawScore = Number(doc?.quizScore);
  const rawCorrect = Number(doc?.quizCorrectCount ?? doc?.correctAnswersCount);
  const rawTotal = Number(doc?.quizTotalQuestions ?? doc?.totalQuizQuestions);

  return {
    percent: Number.isFinite(rawScore) ? clampPercent(rawScore) : null,
    correctCount: Number.isFinite(rawCorrect) ? Math.max(0, Math.round(rawCorrect)) : null,
    totalQuestions: Number.isFinite(rawTotal) ? Math.max(0, Math.round(rawTotal)) : null,
  };
};

export default function CertificatePage() {
  const searchParams = useSearchParams();
  const requestedCourse = String(searchParams.get("course") || "").trim();
  const { data: userData } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCourseName, setSelectedCourseName] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadCertificates = async () => {
      setLoading(true);
      try {
        const [onlineRes, offlineRes] = await Promise.allSettled([
          axios.get(`${API}online-paid-dashboard`, {
            withCredentials: true,
          }),
          axios.get(`${API}offline-paid-dashboard`, {
            withCredentials: true,
          }),
        ]);

        const onlineCourses =
          onlineRes.status === "fulfilled" &&
          Array.isArray(onlineRes.value?.data?.getCourseData)
            ? onlineRes.value.data.getCourseData.map((course) => ({
                ...course,
                learningMode: "online",
              }))
            : [];

        const offlineCourses =
          offlineRes.status === "fulfilled" &&
          Array.isArray(offlineRes.value?.data?.getCourseData)
            ? offlineRes.value.data.getCourseData.map((course) => ({
                ...course,
                learningMode: "offline",
              }))
            : [];

        const rawCourses = [...onlineCourses, ...offlineCourses];

        const uniqueCourses = [];
        const seen = new Set();
        rawCourses.forEach((course) => {
          const name = String(course?.courseName || "").trim();
          if (!name || seen.has(name)) return;
          seen.add(name);
          uniqueCourses.push(course);
        });

        const progressResults = await Promise.allSettled(
          uniqueCourses.map((course) =>
            axios.get(prerecordEndpoints.fetchProgress(course.courseName), {
              withCredentials: true,
            })
          )
        );

        const nextCourses = uniqueCourses.map((course, index) => {
          const doc =
            progressResults[index]?.status === "fulfilled"
              ? parseProgressDoc(progressResults[index].value?.data)
              : null;
          const progressPercent = clampPercent(
            doc?.progressPercent ?? doc?.percent ?? doc?.coursePercent
          );
          const quizMeta = parseQuizMeta(doc);
          const quizScorePercent = quizMeta.percent;
          const unlocked = progressPercent >= 100 && quizScorePercent != null && quizScorePercent > 0;

          return {
            ...course,
            progressDoc: doc,
            progressPercent,
            quizScorePercent,
            quizCorrectCount: quizMeta.correctCount,
            quizTotalQuestions: quizMeta.totalQuestions,
            unlocked,
            completionDate:
              doc?.clientUpdatedAt ||
              doc?.updatedAt ||
              doc?.lastUpdatedAt ||
              course?.updatedAt ||
              new Date().toISOString(),
            updatedAtMs: Math.max(
              toMs(doc?.updatedAt),
              toMs(doc?.lastUpdatedAt),
              toMs(doc?.clientUpdatedAt),
              toMs(course?.updatedAt)
            ),
          };
        });

        nextCourses.sort((a, b) => {
          if (Number(b.unlocked) !== Number(a.unlocked)) {
            return Number(b.unlocked) - Number(a.unlocked);
          }
          return (b.updatedAtMs || 0) - (a.updatedAtMs || 0);
        });

        if (cancelled) return;
        setCourses(nextCourses);
      } catch {
        if (cancelled) return;
        setCourses([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadCertificates();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!courses.length) {
      setSelectedCourseName("");
      return;
    }

    const requestedMatch = courses.find(
      (course) => String(course?.courseName || "").trim() === requestedCourse
    );
    const preferred =
      requestedMatch ||
      courses.find((course) => course.unlocked) ||
      courses[0] ||
      null;

    setSelectedCourseName((prev) => {
      if (requestedMatch) {
        return requestedMatch.courseName;
      }
      if (prev && courses.some((course) => course.courseName === prev)) {
        return prev;
      }
      return preferred?.courseName || "";
    });
  }, [courses, requestedCourse]);

  const selectedCourse = useMemo(() => {
    return (
      courses.find(
        (course) => String(course?.courseName || "").trim() === selectedCourseName
      ) || null
    );
  }, [courses, selectedCourseName]);

  const learnerName =
    userData?.userName || userData?.name || userData?.fullName || "Learner";
  const learnerEmail = userData?.userEmail || userData?.email || "";
  const selectedCourseHref = selectedCourse
    ? selectedCourse.learningMode === "offline"
      ? "/user/mycourse"
      : `/pre-record/${encodeURIComponent(selectedCourse.courseName)}`
    : "/user/mycourse";
  const selectedCourseActionLabel =
    selectedCourse?.learningMode === "offline" ? "View My Courses" : "Open Course";

  return (
    <section className="min-h-screen bg-[#F7FAFC] px-4 py-5 lg:px-12 font-dm-sans">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F8FF] px-4 py-2 text-xs font-semibold text-[#009EE0]">
            <Award size={14} />
            Pre-record certificates
          </div>
          <h1 className="mt-3 text-2xl font-bold text-[#182073]">Certificates</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#5F6C80]">
            Download and send your online and offline course certificates from one
            page after you finish the quiz.
          </p>
        </div>

        <Link
          href="/user/mycourse"
          className="inline-flex items-center gap-2 rounded-2xl border border-[#D7E7EF] bg-white px-4 py-3 text-sm font-semibold text-[#182073] transition hover:bg-[#F8FCFF]"
        >
          Browse My Courses
          <ChevronRight size={16} />
        </Link>
      </div>

      {loading ? (
        <div className="rounded-[28px] border border-[#D7E7EF] bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3 text-sm font-medium text-[#5F6C80]">
            <RefreshCw size={18} className="animate-spin text-[#009EE0]" />
            Loading your certificate courses...
          </div>
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-[#B6D9E6] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F8FF] text-[#009EE0]">
            <Award size={26} />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-[#182073]">
            No paid course found
          </h2>
          <p className="mt-2 text-sm text-[#5F6C80]">
            Enroll in an online or offline paid course first, then your
            certificates will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[340px,1fr]">
          <div className="rounded-[28px] border border-[#D7E7EF] bg-white p-4 shadow-sm">
            <div className="mb-3 text-sm font-semibold text-[#182073]">
              Your certificate list
            </div>

            <div className="grid gap-3">
              {courses.map((course) => {
                const active =
                  String(course?.courseName || "").trim() === selectedCourseName;

                return (
                  <button
                    key={course.courseName}
                    type="button"
                    onClick={() => setSelectedCourseName(course.courseName)}
                    className={`rounded-3xl border p-4 text-left transition hover:cursor-pointer ${
                      active
                        ? "border-[#0BA6DC] bg-[#F2FBFF] shadow-[0_10px_30px_rgba(11,166,220,0.12)]"
                        : "border-[#E2E8F0] bg-white hover:border-[#B6D9E6]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="line-clamp-2 text-sm font-semibold text-[#182073]">
                          {course.courseName}
                        </div>
                        <div className="mt-1 inline-flex items-center rounded-full bg-[#F3F7FB] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5F6C80]">
                          {course.learningMode || "course"}
                        </div>
                        <div className="mt-1 text-xs text-[#6B7A90]">
                          Progress: {course.progressPercent}%
                        </div>
                      </div>

                      <div
                        className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          course.unlocked
                            ? "bg-[#EAFBF3] text-[#15803D]"
                            : "bg-[#FFF4E8] text-[#B45309]"
                        }`}
                      >
                        {course.unlocked ? (
                          <CheckCircle2 size={13} />
                        ) : (
                          <Lock size={13} />
                        )}
                        {course.unlocked ? "Ready" : "Locked"}
                      </div>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E8EEF3]">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#009EE0_0%,#45D2FF_100%)]"
                        style={{ width: `${course.progressPercent}%` }}
                      />
                    </div>

                    <div className="mt-3 text-xs text-[#6B7A90]">
                      Quiz score:{" "}
                      <span className="font-semibold text-[#182073]">
                        {course.quizScorePercent == null
                          ? "Not completed"
                          : course.quizTotalQuestions
                          ? `${course.quizCorrectCount}/${course.quizTotalQuestions} (${course.quizScorePercent}%)`
                          : `${course.quizScorePercent}%`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6">
            {selectedCourse && (
              <div className="rounded-[28px] border border-[#D7E7EF] bg-[linear-gradient(135deg,#182073_0%,#0E57A3_100%)] p-6 text-white shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                      Selected course
                    </div>
                    <h2 className="mt-2 text-2xl font-semibold">
                      {selectedCourse.courseName}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-white/80">
                      {selectedCourse.unlocked
                        ? "Your certificate is ready. Review your details and send it to your email."
                        : "Complete 100% course progress and finish the quiz successfully to unlock this certificate."}
                    </p>
                  </div>

                  <Link
                    href={selectedCourseHref}
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#182073] transition hover:bg-[#EAF8FF]"
                  >
                    {selectedCourseActionLabel}
                  </Link>
                </div>
              </div>
            )}

            {selectedCourse && !selectedCourse.unlocked && (
              <div className="rounded-[28px] border border-[#F4D7A8] bg-[#FFF9ED] p-5 text-sm text-[#7A5B22]">
                This certificate is still locked. Reach 100% progress and complete
                the quiz successfully, then return here to download it.
              </div>
            )}

            {selectedCourse ? (
              <CertificatePanel
                key={selectedCourse.courseName}
                unlocked={selectedCourse.unlocked}
                studentName={learnerName}
                studentEmail={learnerEmail}
                courseName={selectedCourse.courseName}
                completionDate={selectedCourse.completionDate}
              />
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}
