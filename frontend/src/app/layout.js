import { DM_Sans } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/app/LayoutWrapper.jsx";
import { Providers } from "@/components/Redux/Provide";
import { ToastProvider } from "@/components/context/ToastContext";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: {
  absolute:"",
  default:"Disenosys",
  template:"%s | Disenosys"
  },
 description:"Disenosys is the preferred training and hiring partner for leading automotive OEMs and design studios. We equip mechanical engineers with real-world skills in BIW, Trims, Seating and more through industry-aligned programs that produce job-ready talent.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <ToastProvider>
         <Providers>
        <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
        </ToastProvider>
      </body>
    </html>
  );
}
