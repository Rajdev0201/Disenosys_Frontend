"use client";
import { usePathname } from "next/navigation";
import NotificationBar from "@/components/layout/NotificationBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useDispatch } from "react-redux";
import { getProfile } from "@/components/Redux/actions/auth";
import { useEffect, useState } from "react";
import Loader from "@/components/custom/LoadingStyle";
// import { isLaunchActive } from "@/components/utils/constant";
import LaunchMode from "@/components/custom/Launch";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // const [launchActive, setLaunchActive] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const noLayoutRoutes = [
    "/signin",
    "/signup",
    "/forgot",
    "/user/dashboard",
    "/user/assesments",
    "/user/leader-board",
    "/user/mycourse",
    "/user/quiz-result",
    "/user/settings",
    "/user/AIChatbot",
    "/launch",
    "/launch2",
    "/details",
    "/results",
    "/edit-profile",
    "/reset-password",
    "/mern-stack"
  ];
  const hideLayout = noLayoutRoutes.includes(pathname);

  //  useEffect(() => {
  //   setLaunchActive(isLaunchActive());
  //   // auto switch at 12:00 AM
  //   const timer = setInterval(() => {
  //     setLaunchActive(isLaunchActive());
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

    // 🎉 BEFORE 12:00 AM → Launch UI
  // if (launchActive) {
  //   return <LaunchMode />;
  // }

  return (
    <>
      {loading ? <Loader /> : 
      <>
      {!hideLayout && <NotificationBar />}
      {!hideLayout && <Navbar />}
      {children} 
      {!hideLayout && <Footer />}
      </>
      }
    </>
  );
}
