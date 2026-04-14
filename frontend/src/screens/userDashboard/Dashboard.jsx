"use client"
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import car from "@/components/assests/car.jpg";
import speed from "@/components/assests/speed.jpg";
import CustomDatePicker from "@/components/custom/DatePicker";
import UserList from "./LeaderBoardList";
import { BriefcaseBusiness, FileCheck, MedalIcon } from "lucide-react";
import TodoList from "./ToDoList";
import Button from "@/components/custom/Button";
import Card from "@/components/custom/Card";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { API } from "@/components/utils/constant";
import { prerecordEndpoints } from "./prerecord/prerecordApi";

const Dashboard = () => {
   const {data} = useSelector((state) => state.user);
   const router = useRouter();

   const [coursesLoading, setCoursesLoading] = useState(false);
   const [coursesLoaded, setCoursesLoaded] = useState(false);
   const [courses, setCourses] = useState([]);
   const [progressByCourseName, setProgressByCourseName] = useState({});

   useEffect(() => {
    if (!data) router.push("/signup");
   }, [data, router]);

   useEffect(() => {
    if (!data) return;
    let cancelled = false;

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

    const loadDashboardCourses = async () => {
      setCoursesLoaded(false);
      setCoursesLoading(true);
      try {
        const [onlineRes, offlineRes] = await Promise.allSettled([
          axios.get(`${API}online-paid-dashboard`, { withCredentials: true }),
          axios.get(`${API}offline-paid-dashboard`, { withCredentials: true }),
        ]);

        const onlineData =
          onlineRes.status === "fulfilled" ? onlineRes.value?.data : null;
        const offlineData =
          offlineRes.status === "fulfilled" ? offlineRes.value?.data : null;

        const onlineList = Array.isArray(onlineData?.getCourseData)
          ? onlineData.getCourseData
          : [];
        const offlineList = Array.isArray(offlineData?.getCourseData)
          ? offlineData.getCourseData
          : [];

        const merged = [...onlineList, ...offlineList].filter(
          (c) => c?.courseName
        );

        const unique = [];
        const seen = new Set();
        for (const c of merged) {
          const key = String(c.courseName).trim();
          if (!key || seen.has(key)) continue;
          seen.add(key);
          unique.push(c);
        }

        if (cancelled) return;
        setCourses(unique);

        if (!unique.length) {
          setProgressByCourseName({});
          return;
        }

        const progressResults = await Promise.allSettled(
          unique.map((course) =>
            axios.get(prerecordEndpoints.fetchProgress(course.courseName), {
              withCredentials: true,
            })
          )
        );

        const nextProgress = {};
        progressResults.forEach((result, idx) => {
          const courseName = String(unique[idx]?.courseName || "").trim();
          if (!courseName) return;
          if (result.status !== "fulfilled") return;
        const doc = parseProgressDoc(result.value?.data);
        nextProgress[courseName] = {
          percent: clampPercent(
            doc?.progressPercent ?? doc?.percent ?? doc?.coursePercent
          ),
          quizScorePercent: clampPercent(doc?.quizScore),
          updatedAtMs: Math.max(
            toMs(doc?.updatedAt),
            toMs(doc?.lastUpdatedAt),
              toMs(doc?.lastSeenAt),
              toMs(doc?.lastWatchedAt),
              toMs(doc?.createdAt)
            ),
          };
        });

        if (cancelled) return;
        setProgressByCourseName(nextProgress);
      } catch (err) {
        if (cancelled) return;
        setCourses([]);
        setProgressByCourseName({});
      } finally {
        if (!cancelled) {
          setCoursesLoading(false);
          setCoursesLoaded(true);
        }
      }
    };

    loadDashboardCourses();
    return () => {
      cancelled = true;
    };
   }, [data]);

   const courseCount = courses.length;

   const activeCourse = useMemo(() => {
    if (!courses.length) return null;

    const getMeta = (course) => {
      const name = String(course?.courseName || "").trim();
      const meta = progressByCourseName?.[name] || {};
      return {
        name,
        percent: Math.round(Number(meta.percent) || 0),
        updatedAtMs: Number(meta.updatedAtMs) || 0,
      };
    };

    // Prefer: most recently active -> in-progress -> higher completion.
    let best = courses[0];
    for (const c of courses) {
      const a = getMeta(best);
      const b = getMeta(c);
      if (b.updatedAtMs !== a.updatedAtMs) {
        if (b.updatedAtMs > a.updatedAtMs) best = c;
        continue;
      }
      const aInProgress = a.percent > 0 && a.percent < 100;
      const bInProgress = b.percent > 0 && b.percent < 100;
      if (bInProgress !== aInProgress) {
        if (bInProgress) best = c;
        continue;
      }
      if (b.percent !== a.percent) {
        if (b.percent > a.percent) best = c;
      }
    }
    return best || null;
   }, [courses, progressByCourseName]);

   const activeCourseName = String(activeCourse?.courseName || "").trim();
   const activeProgressPercent = Math.max(
    0,
    Math.min(
      100,
      Math.round(Number(progressByCourseName?.[activeCourseName]?.percent) || 0)
    )
   );
   const activeQuizPercent = Math.max(
    0,
    Math.min(
      100,
      Math.round(Number(progressByCourseName?.[activeCourseName]?.quizScorePercent) || 0)
    )
   );
   const hasCourses = Boolean(activeCourse);
   const showLoading = Boolean(data) && !coursesLoaded;
   const showEmptyState = coursesLoaded && !coursesLoading && !hasCourses;
   const disableContent = showLoading || showEmptyState;
  return (
    <section>
      <div className="px-4 xl:px-12 font-dm-sans h-screen">
        {/* Heading */}
        <h1 className="font-medium text-lg lg:text-2xl text-[#333333] mb-2 mt-4">
          {data?.userName} 👋
        </h1>
        <p className="font-medium text-xs lg:text-sm text-[#808080] mb-6">
          Welcome back! Let’s continue your learning journey.
        </p>

        {/* 1st grid box */}
        <div className="grid lg:grid-cols-12 lg:gap-3 xl:gap-8">
         <Card className="lg:col-span-5 relative overflow-hidden">
  {/* Locked Overlay */}
  {showLoading && (
    <div className="absolute inset-0 bg-black/70 z-10 flex flex-col items-center justify-center text-center px-6">
      <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin mb-4" />
      <h3 className="text-white text-lg font-bold mb-2">Loading your courses...</h3>
      <p className="text-gray-300 text-sm">Please wait a moment.</p>
    </div>
  )}

  {showEmptyState && (
  <div className="absolute inset-0 bg-black/70 z-10 flex flex-col items-center justify-center text-center px-6">
    <span className="text-yellow-400 text-sm font-semibold mb-2">
       No paid courses found
    </span>

    <h3 className="text-white text-lg font-bold mb-2">
      Start your learning journey
    </h3>

    <p className="text-gray-300 text-sm mb-4">
      Buy a course to see your active course and progress here.
    </p>

    {/* CTA */}
    <button
      onClick={() => router.push("/course")}
      className="bg-[#45D2FF] hover:bg-[#2bbde8] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg transition"
    >
      Browse Courses
    </button>
  </div>
  )}

  {/* Existing Content (blurred background) */}
  <div className={`${disableContent ? "blur-sm pointer-events-none" : ""}`}>
    <h4 className="text-sm text-[#333333] font-semibold mb-8">
      Recent enrolled course
    </h4>

    <div className="grid lg:grid-cols-2 gap-4 items-start">
      <img
        src={activeCourse?.imagePath || car}
        alt="course-image"
        width={200}
        height={150}
        className="object-cover rounded-md shadow-sm"
      />

      <div className="flex flex-col space-y-2">
        <span className="inline-block bg-[#45D2FF] text-white text-xs font-medium px-3 py-1 rounded-full w-fit">
          {activeCourse?.category || "Course"}
        </span>
        <h2 className="text-[#161439] text-md font-bold leading-snug">
          {activeCourse?.courseName || "No active course yet"}
        </h2>
        {/* <p className="text-sm font-medium text-[#8C8C8C] leading-snug">
          {activeCourse?.description
            ? `${String(activeCourse.description).slice(0, 120)}${
                String(activeCourse.description).length > 120 ? "..." : ""
              }`
            : "Enroll in a course to start tracking your progress."}
        </p> */}

        {hasCourses && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs font-medium text-[#808080]">
              <span>Course Progress</span>
              <span>{coursesLoading ? "..." : `${activeProgressPercent}%`}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-[#45D2FF] h-2 rounded-full"
                style={{ width: `${activeProgressPercent}%` }}
              ></div>
            </div>
          </div>
        )}
        <span className="font-medium text-sm text-[#45D2FF]">
          Happy Learning!
        </span>

        {hasCourses && (
          <button
            onClick={() =>
              router.push(`/pre-record/${encodeURIComponent(activeCourseName)}`)
            }
            className="bg-[#45D2FF] hover:cursor-pointer hover:bg-[#2bbde8] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-md transition w-fit mt-2"
          >
           Continue Course
          </button>
        )}
      </div>
    </div>
  </div>
          </Card>


          <Card className="lg:col-span-4 relative overflow-hidden">
  {/* GAME MODE LOCK OVERLAY */}
  {showLoading && (
    <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60 z-10 flex flex-col items-center justify-center px-5 text-center">
      <div className="w-9 h-9 border-2 border-white/30 border-t-white rounded-full animate-spin mb-3" />
      <div className="text-white text-sm font-bold">Loading performance...</div>
    </div>
  )}

  {showEmptyState && (
  <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60 z-10 flex flex-col items-center justify-center px-5 text-center">
    <span className="text-yellow-400 text-xs font-bold tracking-wide mb-2">
  NO PAID COURSE YET
</span>


    <h3 className="text-white text-base font-bold mb-2">
      Buy a course to unlock stats
    </h3>

    <p className="text-gray-300 text-xs mb-4 leading-relaxed">
      Purchase any course and we’ll start tracking your performance here.
    </p>


    {/* CTA */}
    <button
      onClick={() => router.push("/course")}
      className="bg-[#45D2FF] hover:bg-[#2bbde8] text-white px-5 py-2 rounded-full text-xs font-semibold shadow-md transition"
    >
      Browse Courses
    </button>

  </div>
  )}

  {/* BLURRED ORIGINAL CONTENT */}
  <div className={`${disableContent ? "blur-sm pointer-events-none" : ""}`}>
    <h4 className="text-sm text-[#333333] font-semibold mb-4">
      Performance
    </h4>

    <div className="flex gap-6 mb-3 justify-between items-center">
      <div className="flex gap-2 items-center">
        <div className="bg-[#45D2FF] w-4 h-4"></div>
        <h5 className="text-xs font-bold text-[#42404C]">
          Assignment Submission Performance
        </h5>
      </div>
      <select className="bg-[#F5F5F5] rounded-xs p-1 text-[#808080] outline-none shadow-inner text-xs">
        <option>monthly</option>
      </select>
    </div>

    <div className="flex justify-center mb-5">
      <Image
        src={speed}
        alt="time speed"
        width={150}
        height={150}
        className="object-cover rounded-md shadow-sm"
      />
    </div>

    <p className="text-[#8C8C8C] font-semibold text-center">
      Course Progress:{" "}
      <span className="text-[#000000]">
        {coursesLoading ? "..." : `${activeProgressPercent}%`}
      </span>
    </p>
  </div>
</Card>


          <div className="lg:col-span-3">
            <CustomDatePicker />
          </div>
        </div>

        {/* 2nd grid box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">

          <Card className="lg:col-span-7 xl:col-span-9">
            <h4 className="text-sm text-[#333333] font-semibold mb-2">
              Top Rankers
            </h4>
            <UserList bar="no" list="3" />
          </Card>

  <Card className="lg:col-span-5 xl:col-span-3 relative border border-gray-200 bg-white shadow-sm rounded-md lg:p-4 overflow-hidden">
  
  {/* STATS LOCK OVERLAY */}
  {showLoading && (
    <div className="absolute inset-0 bg-black/70 z-10 flex flex-col items-center justify-center text-center px-4">
      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mb-3" />
      <div className="text-white text-sm font-bold">Loading stats...</div>
    </div>
  )}

  {showEmptyState && (
  <div className="absolute inset-0 bg-black/70 z-10 flex flex-col items-center justify-center text-center px-4">
    <span className="text-yellow-400 text-xs font-semibold mb-2">
      No paid course yet
    </span>

    <h3 className="text-white text-sm font-bold mb-2">
      Buy a course to unlock stats
    </h3>

    <p className="text-gray-300 text-xs mb-4 leading-relaxed">
      Purchase any course to see your active course and progress here.
    </p>

    {/* CTA */}
    <button
      onClick={() => router.push("/course")}
      className="bg-[#45D2FF] hover:bg-[#2bbde8] text-white px-5 py-2 rounded-full text-xs font-semibold shadow-md transition"
    >
      Browse Courses
    </button>
  </div>
  )}

  {/* ORIGINAL CONTENT (BLURRED) */}
           <div className={`${disableContent ? "blur-sm pointer-events-none" : ""} space-y-3 lg:px-3`}>
    {/* keep your existing code here exactly */}
         {/* <p className="flex gap-2 items-center font-semibold text-sm text-[#333333]">
                <BriefcaseBusiness size={20} color="#45D2FF" /> Rank :{" "}
                <span className="text-[#808080] text-xs">
                  #5 among 120 students
                </span>
              </p> */}
              {/* <p className="flex gap-2 items-center font-semibold text-sm text-[#333333]">
                <BriefcaseBusiness size={20} color="#45D2FF" /> Overall Score :{" "}
                <span className="text-[#808080] text-xs">8.96 / 10</span>
              </p> */}
              <div className="flex items-center justify-center mb-6">
              <MedalIcon size={50} color="#45D2FF" className=" ring-2 p-2 ring-gray-300 rounded-full shadow"/>
              </div>
              <p className="flex gap-2 items-center font-semibold text-sm text-[#333333]">
                <BriefcaseBusiness size={20} color="#45D2FF" /> Total hours :{" "}
                <span className="text-[#808080] text-xs">56 hrs</span>
              </p>
              <p className="flex gap-2 items-center font-semibold text-sm text-[#333333]">
                <BriefcaseBusiness size={20} color="#45D2FF" /> Active Course :{" "}
                <span className="text-[#808080] text-xs">
                  {coursesLoading ? "..." : courseCount}
                </span>
              </p>
              <p className="flex gap-2 items-center font-semibold text-sm text-[#333333]">
                <BriefcaseBusiness size={20} color="#45D2FF" /> Course Progress :{" "}
                <span className="text-[#808080] text-xs">
                  {coursesLoading ? "..." : `${activeProgressPercent}%`}
                </span>
              </p>
              <p className="flex gap-2 items-center font-semibold text-sm text-[#333333]">
                <BriefcaseBusiness size={20} color="#45D2FF" /> Quiz Score :{" "}
                <span className="text-[#808080] text-xs">
                  {coursesLoading ? "..." : `${activeQuizPercent}%`}
                </span>
              </p>
            </div>
        </Card>
        </div>

        {/* 3rd grid box */}
        <div className="grid lg:grid-cols-12 gap-6 mt-6">
          <Card className="lg:col-span-9">
            <h4 className="text-sm text-[#333333] font-semibold mb-2">
              Resources
            </h4>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-5 mt-10 lg:w-full">
              {/* add Resources */}
              <div className="flex items-center gap-2">
                <FileCheck size={30} className="text-[#45D2FF]" />
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col space-y-1">
                  <h4 className="text-sm font-bold text=[#121212]">
                    Plastic_trims.png
                  </h4>
                  <p className="text-xs font-medium text-[#8C8C8C]">
                    High-quality reference image for vehicle plastic trim
                    components.
                  </p>
                  </div>
                       <span className="text-xs lg:text-md">8.5 MB</span>
                </div>
              </div>
         
              <Button
                text="Download"
                className="text-md font-medium text-[#45D2FF] hover:cursor-pointer"
              />
            </div>
          </Card>

          <Card className="lg:col-span-3">
            {/* To-do list */}
            <TodoList />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
