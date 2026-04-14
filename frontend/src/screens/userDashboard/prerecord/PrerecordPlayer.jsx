"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  ChevronDown,
  Circle,
  FileText,
  ListVideo,
  Loader2,
  Lock,
  NotebookPen,
  PlayCircle,
  Save,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/components/context/ToastContext";
import QuizPanel from "./QuizPanel";
import {
  clamp,
  formatDuration,
  normalizeLectures,
  prerecordEndpoints,
  safeDecodeSlug,
  useDebouncedFn,
} from "./prerecordApi";

function ProgressPill({ percent }) {
  const p = clamp(Math.round(Number(percent) || 0), 0, 100);
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(to_right,#45D2FF,#009EE0)] text-white px-3 py-1 text-xs font-medium">
      <Sparkles size={14} className="opacity-90" />
      <span>{p}% complete</span>
    </div>
  );
}

function SaveState({ state }) {
  if (state === "saving") {
    return (
      <div className="inline-flex items-center gap-2 text-xs text-slate-500">
        <Loader2 size={14} className="animate-spin" />
        Saving...
      </div>
    );
  }
  if (state === "saved") {
    return (
      <div className="inline-flex items-center gap-2 text-xs text-emerald-600">
        <Save size={14} />
        Saved
      </div>
    );
  }
  if (state === "error") {
    return (
      <div className="inline-flex items-center gap-2 text-xs text-rose-600">
        <Save size={14} />
        Save failed
      </div>
    );
  }
  return null;
}

export default function PrerecordPlayer({ courseSlug }) {
  const router = useRouter();
  const { showToast } = useToast();
  const courseName = useMemo(() => safeDecodeSlug(courseSlug), [courseSlug]);
  const [loading, setLoading] = useState(true);
  const [courseDoc, setCourseDoc] = useState(null);
  // console.log("courseDoc", courseDoc);
  const [progressDoc, setProgressDoc] = useState(null);
  const [selectedLectureId, setSelectedLectureId] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // overview | notes | quiz
  const [notesByLecture, setNotesByLecture] = useState({});
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openSectionId, setOpenSectionId] = useState(null);

  const videoRef = useRef(null);
  const lastTimeUpdateRef = useRef(0);
  const watchAccumulatorRef = useRef({ lastAt: 0, watchedSec: 0 });
  const watchedSecBaseRef = useRef(0);

  const normalized = useMemo(() => normalizeLectures(courseDoc), [courseDoc]);
  const flatLectures = normalized.flat;
  const totalLectures = flatLectures.length || 0;

  const completedIdList = useMemo(() => {
    const raw =
      progressDoc?.completedLectureIds || progressDoc?.completedLectures || [];
    return (Array.isArray(raw) ? raw : []).map(String);
  }, [progressDoc]);

  const completedLectureIds = useMemo(() => {
    return new Set(completedIdList);
  }, [completedIdList]);

  const isLectureCompleted = useCallback(
    (lecture) => {
      if (!lecture?.id) return false;
      if (completedLectureIds.has(String(lecture.id))) return true;
      if (lecture?.completionKey && completedLectureIds.has(String(lecture.completionKey))) {
        return true;
      }
      const legacy = Array.isArray(lecture.legacyIds) ? lecture.legacyIds : [];
      if (legacy.some((id) => completedLectureIds.has(String(id)))) return true;
      const url = String(lecture.url || "");
      if (!url) return false;
      if (completedLectureIds.has(url)) return true;
      // Backward-compat: old clients stored ids that embed the URL.
      return completedIdList.some((id) => id.includes(url));
    },
    [completedIdList, completedLectureIds]
  );

  const canonicalCompletedKeys = useMemo(() => {
    if (!flatLectures.length) return [];
    return flatLectures
      .filter((l) => isLectureCompleted(l))
      .map((l) => String(l.completionKey || l.url || l.id))
      .filter(Boolean);
  }, [flatLectures, isLectureCompleted]);

  const completedCount = canonicalCompletedKeys.length;
  const progressPercent = totalLectures
    ? Math.round((completedCount / totalLectures) * 100)
    : 0;
  const allVideosCompleted = totalLectures > 0 && completedCount >= totalLectures;

  const selectedLecture = useMemo(() => {
    const id =
      selectedLectureId ||
      progressDoc?.lastLectureId ||
      progressDoc?.lastLecture ||
      null;
    if (!id) return flatLectures[0] || null;
    const idStr = String(id);
    return (
      flatLectures.find((l) => {
        if (String(l.id) === idStr) return true;
        if (String(l.completionKey || "") === idStr) return true;
        if (String(l.url || "") === idStr) return true;
        const url = String(l.url || "");
        if (url && idStr.includes(url)) return true;
        const legacy = Array.isArray(l.legacyIds) ? l.legacyIds : [];
        return legacy.some((x) => String(x) === idStr);
      }) ||
      flatLectures[0] ||
      null
    );
  }, [flatLectures, progressDoc, selectedLectureId]);

  const courseQuizQuestions = useMemo(() => {
    const raw =
      courseDoc?.questions ||
      courseDoc?.quiz?.questions ||
      courseDoc?.quiz ||
      courseDoc?.examQuestions ||
      null;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw?.questions)) return raw.questions;
    return [];
  }, [courseDoc]);

  const courseQuizAttempt = useMemo(() => {
    const score = progressDoc?.quizScore;
    if (score == null) return null;
    return {
      bestScorePercent: Number(score),
      attempts: null,
      lastScorePercent: Number(score),
      correctCount: Number(progressDoc?.quizCorrectCount || 0),
      totalQuestions: Number(progressDoc?.quizTotalQuestions || 0),
    };
  }, [progressDoc]);
  const certificateUnlocked = progressDoc?.quizScore != null;
  const unlockedSectionIndex = useMemo(() => {
    const sections = normalized.sections || [];
    for (let i = 0; i < sections.length; i += 1) {
      const lectures = sections[i]?.lectures || [];
      if (!lectures.length) continue;
      const done = lectures.every((l) => isLectureCompleted(l));
      if (!done) return i;
    }
    return Math.max(0, sections.length - 1);
  }, [isLectureCompleted, normalized.sections]);

  useEffect(() => {
    const sections = normalized.sections || [];
    if (!sections.length) return;
    const preferredIndex = clamp(unlockedSectionIndex, 0, sections.length - 1);
    const preferredId = sections[preferredIndex]?.id || sections[0]?.id || null;
    if (!preferredId) return;
    setOpenSectionId((prev) => {
      if (!prev) return preferredId;
      const exists = sections.some((s) => String(s.id) === String(prev));
      if (!exists) return preferredId;
      const prevIndex = sections.findIndex((s) => String(s.id) === String(prev));
      if (prevIndex > unlockedSectionIndex) return preferredId;
      return prev;
    });
  }, [normalized.sections, unlockedSectionIndex]);

  const load = useCallback(async () => {
    if (!courseName) return;
    setLoading(true);
    try {
      const [courseRes, progressRes] = await Promise.allSettled([
        axios.get(prerecordEndpoints.fetchCourse(courseName), {
          withCredentials: true,
        }),
        axios.get(prerecordEndpoints.fetchProgress(courseName), {
          withCredentials: true,
        }),
      ]);

      if (courseRes.status === "fulfilled") {
        const paidCourse = courseRes.value?.data?.paidCourse;
        const doc = Array.isArray(paidCourse) ? paidCourse[0] : paidCourse;
        setCourseDoc(doc || null);
      } else {
        setCourseDoc(null);
      }

      if (progressRes.status === "fulfilled") {
        const data =
          progressRes.value?.data?.progress ||
          progressRes.value?.data?.courseProgress ||
          progressRes.value?.data;
        setProgressDoc(data || null);
        const initialNotes = data?.notesByLecture || data?.notes || null;
        if (initialNotes && typeof initialNotes === "object") {
          setNotesByLecture(initialNotes);
        }
      } else {
        setProgressDoc(null);
      }
    } catch (err) {
      showToast(
        "error",
        "Failed to load",
        err?.response?.data?.message || "Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [courseName, showToast]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    watchedSecBaseRef.current = Number(progressDoc?.watchedSec || 0) || 0;
  }, [progressDoc?.watchedSec]);

  useEffect(() => {
    if (!selectedLecture?.id) return;
    setSelectedLectureId(selectedLecture.id);
  }, [selectedLecture?.id]);

  const saveProgress = useCallback(
    async (patch) => {
      if (!courseName) return;
      setSaveState("saving");
      try {
        const current = progressDoc || {};
        const merged = {
          ...current,
          courseName,
          courseId: courseDoc?._id || current.courseId,
          completedLectureIds: canonicalCompletedKeys,
          lastLectureId:
            selectedLecture?.completionKey ||
            selectedLecture?.url ||
            selectedLecture?.id ||
            current.lastLectureId ||
            null,
          progressPercent,
          notesByLecture,
          clientUpdatedAt: new Date().toISOString(),
          ...(patch || {}),
        };

        const res = await axios.post(prerecordEndpoints.saveProgress(), merged, {
          withCredentials: true,
        });
        const data = res?.data?.progress || res?.data?.courseProgress || res?.data;
        setProgressDoc(data || merged);
        setSaveState("saved");
        setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 1200);
      } catch (err) {
        setSaveState("error");
        showToast(
          "error",
          "Progress not saved",
          err?.response?.data?.message || "Backend save failed."
        );
        setTimeout(() => setSaveState((s) => (s === "error" ? "idle" : s)), 1800);
      }
    },
    [
      canonicalCompletedKeys,
      courseDoc?._id,
      courseName,
      notesByLecture,
      progressDoc,
      progressPercent,
      selectedLecture?.completionKey,
      selectedLecture?.id,
      selectedLecture?.url,
      showToast,
    ]
  );

  const saveProgressDebounced = useDebouncedFn(saveProgress, 900);
  const saveProgressSilent = useCallback(
    async (patch) => {
      if (!courseName) return;
      try {
        const current = progressDoc || {};
        const merged = {
          ...current,
          courseName,
          courseId: courseDoc?._id || current.courseId,
          completedLectureIds: canonicalCompletedKeys,
          lastLectureId:
            selectedLecture?.completionKey ||
            selectedLecture?.url ||
            selectedLecture?.id ||
            current.lastLectureId ||
            null,
          progressPercent,
          notesByLecture,
          clientUpdatedAt: new Date().toISOString(),
          ...(patch || {}),
        };
        await axios.post(prerecordEndpoints.saveProgress(), merged, {
          withCredentials: true,
        });
      } catch {
        // silent: avoid UI re-renders on background saves
      }
    },
    [
      canonicalCompletedKeys,
      courseDoc?._id,
      courseName,
      notesByLecture,
      progressDoc,
      progressPercent,
      selectedLecture?.completionKey,
      selectedLecture?.id,
      selectedLecture?.url,
    ]
  );
  const saveProgressDebouncedSilent = useDebouncedFn(saveProgressSilent, 1500);

  const selectLecture = useCallback(
    (lecture) => {
      if (!lecture?.id) return;
      setSelectedLectureId(lecture.id);
      setActiveTab("overview");
      saveProgressDebounced({
        lastLectureId: lecture.completionKey || lecture.url || lecture.id,
      });
    },
    [saveProgressDebounced]
  );

  const markLectureCompleted = useCallback(
    (lecture) => {
      if (!lecture?.id) return;
      const next = new Set(canonicalCompletedKeys.map(String));
      next.add(String(lecture.completionKey || lecture.url || lecture.id));
      const legacy = Array.isArray(lecture.legacyIds) ? lecture.legacyIds : [];
      legacy.forEach((id) => next.delete(String(id)));
      const url = String(lecture.url || "");
      if (url) {
        completedIdList.forEach((id) => {
          if (id.includes(url)) next.delete(String(id));
        });
      }
      const nextArray = Array.from(next);
      setProgressDoc((prev) => ({ ...(prev || {}), completedLectureIds: nextArray }));
      saveProgress({ completedLectureIds: nextArray });
    },
    [canonicalCompletedKeys, completedIdList, saveProgress]
  );

  const toggleLectureCompleted = useCallback(
    (lecture) => {
      if (!lecture?.id) return;
      const next = new Set(canonicalCompletedKeys.map(String));
      const legacy = Array.isArray(lecture.legacyIds) ? lecture.legacyIds : [];
      const key = String(lecture.completionKey || lecture.url || lecture.id);
      const idsToCheck = [key, String(lecture.id), ...legacy.map(String)];
      const url = String(lecture.url || "");
      const isDone = idsToCheck.some((id) => next.has(id));
      if (isDone) {
        idsToCheck.forEach((id) => next.delete(id));
        if (url) next.delete(url);
      } else {
        next.add(key);
      }
      const nextArray = Array.from(next);
      setProgressDoc((prev) => ({ ...(prev || {}), completedLectureIds: nextArray }));
      saveProgressDebounced({ completedLectureIds: nextArray });
    },
    [canonicalCompletedKeys, saveProgressDebounced]
  );

  const handleTimeUpdate = useCallback(() => {
    const el = videoRef.current;
    if (!el || Number.isNaN(el.currentTime)) return;
    const now = Date.now();
    if (now - lastTimeUpdateRef.current < 7000) return;
    lastTimeUpdateRef.current = now;

    const currentTimeSec = Math.floor(el.currentTime || 0);
    const acc = watchAccumulatorRef.current;
    if (!acc.lastAt) acc.lastAt = currentTimeSec;
    const delta = Math.max(0, currentTimeSec - acc.lastAt);
    acc.lastAt = currentTimeSec;
    acc.watchedSec += delta;

    watchedSecBaseRef.current += acc.watchedSec;
    saveProgressDebouncedSilent({
      lastLectureId: selectedLecture?.id || null,
      lastPositionSec: currentTimeSec,
      watchedSec: watchedSecBaseRef.current,
    });
    acc.watchedSec = 0;
  }, [saveProgressDebouncedSilent, selectedLecture?.id]);

  const handleLoadedMetadata = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    const target = Number(progressDoc?.lastPositionSec || 0);
    if (target > 0 && Number.isFinite(target)) {
      el.currentTime = clamp(target, 0, Math.max(0, Number(el.duration || 0) - 2));
    }
  }, [progressDoc?.lastPositionSec]);

  const submitQuizAttempt = useCallback(
    (result) => {
      saveProgress({
        quizScore: Number(result.scorePercent || 0),
        quizCorrectCount: Number(result.correct || 0),
        quizTotalQuestions: Number(result.total || 0),
        lastLectureId:
          selectedLecture?.completionKey ||
          selectedLecture?.url ||
          selectedLecture?.id ||
          null,
      });
      if (result?.isPerfectScore) {
        showToast(
          "success",
          "Quiz submitted",
          `Your score is ${Number(result.scorePercent || 0)}% (${Number(
            result.correct || 0
          )}/${Number(result.total || 0)}). It is now saved to your dashboard.`
        );
        return;
      }

      showToast(
        "warning",
        "Quiz checked",
        `You got ${Number(result.correct || 0)}/${Number(
          result.total || 0
        )} correct. Review the popup for correct answers.`
      );
    },
    [
      saveProgress,
      selectedLecture?.completionKey,
      selectedLecture?.id,
      selectedLecture?.url,
      showToast,
    ]
  );

  const openQuizTab = useCallback(() => {
    setActiveTab("quiz");
    if (!allVideosCompleted) {
      showToast(
        "error",
        "Quiz locked",
        "Please complete all videos before continue quiz exam."
      );
      return;
    }
    if (!(courseQuizQuestions?.length || 0)) {
      showToast("warning", "Quiz unavailable", "No quiz questions available right now.");
    }
  }, [allVideosCompleted, courseQuizQuestions?.length, showToast]);

  const notesValue = selectedLecture?.id
    ? notesByLecture?.[selectedLecture.id] || ""
    : "";
  const mainColClass = sidebarOpen ? "lg:col-span-8" : "lg:col-span-12";

  if (!courseName) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl border bg-white p-6 text-center">
          <div className="text-lg font-semibold text-slate-900">Course not found</div>
          <p className="text-sm text-slate-500 mt-1">Invalid course link.</p>
          <button
            type="button"
            onClick={() => router.push("/user/mycourse")}
            className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:cursor-pointer"
          >
            Back to My Courses
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 font-dm-sans">
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => router.push("/user/mycourse")}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <ArrowLeft size={16} />
              </button>
              <div className="min-w-0">
                <div className="text-xs text-slate-500">Pre-recorded course</div>
                <h1 className="text-sm sm:text-base font-semibold text-slate-900 truncate">
                  {courseDoc?.courseName || courseName}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <ProgressPill percent={progressPercent} />
              </div>
              <SaveState state={saveState} />
              <button
                type="button"
                onClick={() => setSidebarOpen((v) => !v)}
                className="inline-flex hover:cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <ListVideo size={16} />
                <span className="hidden sm:inline">Curriculum</span>
              </button>
            </div>
          </div>

          <div className="mt-3">
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-600 to-cyan-500"
                style={{ width: `${clamp(progressPercent, 0, 100)}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <div>
                {completedCount}/{totalLectures || 0} lectures completed
              </div>
              <div className="sm:hidden">
                <ProgressPill percent={progressPercent} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 lg:px-8 py-5">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-slate-600">
            <Loader2 size={22} className="animate-spin" />
            <span className="ml-2">Loading course...</span>
          </div>
        ) : !courseDoc ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="text-lg font-semibold text-slate-900">No course found</div>
            <p className="text-sm text-slate-500 mt-1">
              Make sure you are logged in and the course name matches exactly.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={load}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:cursor-pointer"
              >
                Retry
              </button>
              <Link
                href="/user/mycourse"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Back to My Courses
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className={`${mainColClass} space-y-4`}>
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-slate-500">Now playing</div>
                    <div className="text-sm font-semibold text-slate-900 truncate">
                      {selectedLecture?.title || "Select a lecture"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedLecture?.id &&
                    isLectureCompleted(selectedLecture) ? (
                      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 size={14} />
                        Completed
                      </div>
                    ) : (
                      <button
                        type="button"
                        disabled={!selectedLecture?.id}
                        onClick={() =>
                          selectedLecture?.id &&
                          markLectureCompleted(selectedLecture)
                        }
                        className="inline-flex items-center gap-2 rounded-xl border hover:cursor-pointer border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                      >
                        <CheckCircle2 size={14} />
                        Mark complete
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-black">
                  {selectedLecture?.url ? (
                    <video
                      key={selectedLecture.url}
                      ref={videoRef}
                      width="100%"
                      height="600px"
                      controls
                      disablePictureInPicture
                      controlsList="nodownload"
                      onContextMenu={(e) => e.preventDefault()}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onEnded={() =>
                        selectedLecture?.id && markLectureCompleted(selectedLecture)
                      }
                      src={selectedLecture.url}
                      className="w-full bg-black"
                    />
                  ) : (
                    <div className="aspect-video flex items-center justify-center text-white/80">
                      <div className="text-center">
                        <PlayCircle size={38} className="mx-auto opacity-90" />
                        <div className="mt-2 text-sm">
                          No video available for this lecture.
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="px-4 py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab("overview")}
                      className={`rounded-xl px-4 py-2 text-sm font-semibold hover:cursor-pointer ${
                        activeTab === "overview"
                          ? "bg-slate-900 text-white"
                          : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:cursor-pointer"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("notes")}
                      className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                        activeTab === "notes"
                          ? "bg-slate-900 text-white"
                          : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:cursor-pointer"
                      }`}
                    >
                      Notes
                    </button>
                    <button
                      type="button"
                      onClick={openQuizTab}
                      className={`rounded-xl px-4 py-2 text-sm font-semibold hover:cursor-pointer ${
                        activeTab === "quiz"
                          ? "bg-[#182073] text-white"
                          : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      Quiz
                      {!allVideosCompleted ? (
                        <span className="ml-2 inline-flex items-center rounded-full bg-[#EBFAFF] px-2 py-0.5 text-[10px] font-semibold text-[#009EE0]">
                          Locked
                        </span>
                      ) : null}
                    </button>
                  </div>

                  <div className="mt-4">
                    {activeTab === "overview" && (
                      <div className="grid gap-4">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-slate-900">
                                About this lecture
                              </div>
                              <p className="mt-1 text-sm text-slate-600">
                                {selectedLecture?.summary ||
                                  courseDoc?.description ||
                                  ""}
                              </p>
                            </div>
                            <div className="shrink-0 text-right">
                              <div className="text-xs text-slate-500">
                                Completed
                              </div>
                              <div className="text-sm font-semibold text-slate-900">
                                {completedCount}/{totalLectures || 0}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <div className="flex items-center gap-2 text-slate-900 font-semibold">
                            <FileText size={18} />
                            Resources
                          </div>
                          {Array.isArray(selectedLecture?.resources) &&
                          selectedLecture.resources.length ? (
                            <div className="mt-3 grid gap-2">
                              {selectedLecture.resources.map((r, idx) => {
                                const href = r?.url || r?.href || r;
                                const label =
                                  r?.title || r?.name || `Resource ${idx + 1}`;
                                return (
                                  <a
                                    key={`${selectedLecture.id}-res-${idx}`}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
                                  >
                                    <span className="text-slate-800 truncate">
                                      {label}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                      Open
                                    </span>
                                  </a>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="text-sm text-slate-500 mt-2">
                              No resources attached.
                            </p>
                          )}
                        </div>

                        <div className="rounded-2xl border border-[#0BA6DC]/20 bg-[linear-gradient(135deg,#F6FDFF_0%,#ECF8FF_100%)] p-5">
                          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="min-w-0">
                              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#182073]">
                                <Award size={18} className="text-[#0BA6DC]" />
                                Download certificate from separate page
                              </div>
                              <p className="mt-2 text-sm text-[#5F6C80]">
                                To improve course performance, certificate download
                                is now available on the dedicated certificate page.
                              </p>
                              <div className="mt-3 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#009EE0] ring-1 ring-[#0BA6DC]/15">
                                {certificateUnlocked
                                  ? "Your certificate is ready there."
                                  : "Complete the quiz to unlock it there."}
                              </div>
                            </div>

                            <Link
                              href={`/user/certificate?course=${encodeURIComponent(
                                courseDoc?.courseName || courseName
                              )}`}
                              className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#009EE0_0%,#45D2FF_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(11,166,220,0.24)] transition hover:opacity-95"
                            >
                              Open Certificate Page
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "notes" && (
                      <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <div className="flex items-center gap-2 text-slate-900 font-semibold">
                          <NotebookPen size={18} />
                          Notes (saved to your account)
                        </div>
                        <textarea
                          value={notesValue}
                          onChange={(e) => {
                            const text = e.target.value;
                            const lectureId = selectedLecture?.id;
                            if (!lectureId) return;
                            setNotesByLecture((prev) => {
                              const next = { ...prev, [lectureId]: text };
                              saveProgressDebouncedSilent({
                                lastLectureId: lectureId,
                                notesByLecture: next,
                              });
                              return next;
                            });
                          }}
                          placeholder="Write key points, timestamps, and action items..."
                          className="mt-3 w-full min-h-[160px] rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-sky-200"
                        />
                        <div className="mt-2 text-xs text-slate-500">
                          Notes auto-save in the background.
                        </div>
                      </div>
                    )}

                    {activeTab === "quiz" && (
                      <QuizPanel
                        title={`${courseDoc?.courseName || courseName} Quiz`}
                        questionsSource={courseQuizQuestions}
                        attempt={courseQuizAttempt}
                        onSubmitAttempt={submitQuizAttempt}
                        saving={saveState === "saving"}
                        locked={!allVideosCompleted}
                        lockedMessage="Please complete all videos before continue quiz exam."
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {sidebarOpen && (
              <aside className="lg:col-span-4">
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                    <div className="text-sm font-semibold text-slate-900">
                      Course content
                    </div>
                    <button
                      type="button"
                      onClick={() => setSidebarOpen(false)}
                      className="text-xs font-semibold text-slate-600 hover:cursor-pointer hover:text-slate-900"
                    >
                      Hide
                    </button>
                  </div>

                  <div className="max-h-[calc(100vh-220px)] overflow-auto">
                    {normalized.sections.map((section, sectionIndex) => {
                      const isUnlocked = sectionIndex <= unlockedSectionIndex;
                      return (
                      <details
                        key={section.id}
                        className="border-b border-slate-100"
                        open={String(openSectionId) === String(section.id)}
                        onToggle={(e) => {
                          if (!isUnlocked) {
                            e.preventDefault();
                            return;
                          }
                          const isOpen = e.currentTarget.open;
                          setOpenSectionId((prev) => {
                            if (isOpen) return section.id;
                            if (String(prev) === String(section.id)) return null;
                            return prev;
                          });
                        }}
                      >
                        <summary
                          className={`cursor-pointer list-none px-4 py-3 hover:bg-slate-50 ${
                            isUnlocked ? "" : "opacity-70"
                          }`}
                          onClick={(e) => {
                            if (isUnlocked) return;
                            e.preventDefault();
                            showToast(
                              "error",
                              "Module locked",
                              "Complete the previous module to unlock this one."
                            );
                          }}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-slate-900 truncate">
                                {section.title}
                              </div>
                              <div className="text-xs text-slate-500">
                                {section.lectures.length} lectures
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {!isUnlocked && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700">
                                  <Lock size={12} />
                                  Locked
                                </span>
                              )}
                              <ChevronDown size={16} className="text-slate-500" />
                            </div>
                          </div>
                        </summary>
                        <div className="px-2 pb-2">
                          {section.lectures.map((lecture) => {
                            const isActive =
                              String(lecture.id) === String(selectedLecture?.id);
                            const isCompleted = isLectureCompleted(lecture);
                            return (
                              <div
                                key={lecture.id}
                                className={`flex items-start gap-2 rounded-xl px-2 py-2 ${
                                  isActive ? "bg-sky-50" : "hover:bg-slate-50"
                                }`}
                              >
                                <button
                                  type="button"
                                  disabled={!isUnlocked}
                                  onClick={() => {
                                    if (!isUnlocked) {
                                      showToast(
                                        "error",
                                        "Locked",
                                        "Complete the previous module to unlock."
                                      );
                                      return;
                                    }
                                    toggleLectureCompleted(lecture);
                                  }}
                                  className="mt-0.5 hover:cursor-pointer"
                                  aria-label={
                                    isCompleted ? "Mark incomplete" : "Mark complete"
                                  }
                                >
                                  {isCompleted ? (
                                    <CheckCircle2 size={18} className="text-emerald-600" />
                                  ) : (
                                    <Circle size={18} className="text-slate-300" />
                                  )}
                                </button>
                                <button
                                  type="button"
                                  disabled={!isUnlocked}
                                  onClick={() => {
                                    if (!isUnlocked) {
                                      showToast(
                                        "error",
                                        "Module locked",
                                        "Finish the previous module to unlock."
                                      );
                                      return;
                                    }
                                    selectLecture(lecture);
                                  }}
                                  className={`flex-1 text-left hover:cursor-pointer ${
                                    isUnlocked ? "" : "opacity-60 cursor-not-allowed"
                                  }`}
                                >
                                  <div className="text-sm font-semibold text-slate-900 line-clamp-2">
                                    {lecture.title}
                                  </div>
                                  <div className="text-xs text-slate-500 mt-0.5">
                                    {lecture.durationSec
                                      ? formatDuration(lecture.durationSec)
                                      : ""}
                                    {lecture.durationSec ? " • " : ""}
                                    {isCompleted ? "Completed" : "In progress"}
                                  </div>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </details>
                    );
                    })}
                  </div>

                  <div className="px-4 py-4 bg-slate-50">
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span className="font-semibold">Tracking</span>
                      <span>{progressPercent}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-white border border-slate-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-600 to-cyan-500"
                        style={{ width: `${clamp(progressPercent, 0, 100)}%` }}
                      />
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                      Progress + quiz scores + notes are saved to your account.
                    </div>
                  </div>
                </div>
              </aside>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
