"use client";
import { usePathname } from "next/navigation";
import NotificationBar from "@/components/layout/NotificationBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useEffect } from "react";
import { fetchCourse } from "@/components/Redux/actions/Course";
import { useDispatch } from "react-redux";
import { getProfile } from "@/components/Redux/actions/auth";


export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
    
     useEffect(() => {
     dispatch(fetchCourse());
     dispatch(getProfile());
   },[dispatch])
 

  const noLayoutRoutes = ["/signin", "/signup", "/forgot","/user/dashboard","/user/assesments","/user/leader-board","/user/mycourse","/user/quiz-result","/user/settings","/user/AIChatbot","/launch","/launch2","/details","/results","/edit-profile","/reset-password"];
  const hideLayout = noLayoutRoutes.includes(pathname);

 
  return (
    <>
      {!hideLayout && <NotificationBar />}
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
