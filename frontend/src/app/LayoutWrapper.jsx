"use client";

import { usePathname } from "next/navigation";
import NotificationBar from "@/components/layout/NotificationBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const noLayoutRoutes = ["/signin", "/signup", "/forgot"];
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
