import { DM_Sans } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/app/LayoutWrapper.jsx";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: "Disenosys | Automotive Learning Platform",
  description: "Upskill in automotive technology with Disenosys",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
