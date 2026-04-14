"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Award } from "lucide-react";

import logo from "@/components/assests/white-brand.png";
import d from "@/components/assests/d.png";
import my from "@/components/assests/my.png";
import t from "@/components/assests/t.png";
import q from "@/components/assests/r.png";
// import a from "@/components/assests/a.png";
import s from "@/components/assests/s.png";
import su from "@/components/assests/su.png";

const UserSideBar = () => {
  const path = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", href: "/user/dashboard", icon: d },
    { name: "My Course", href: "/user/mycourse", icon: my },
    { name: "Certificate", href: "/user/certificate", iconComponent: Award },
    { name: "Leader Board", href: "/user/leader-board", icon: t },
    { name: "Quiz", href: "/user/quiz-result", icon: q },
    // { name: "Assessments", href: "/user/assessments", icon: a },
    { name: "Settings", href: "/user/settings", icon: s },
    { name: "Support", href: "/user/AIChatbot", icon: su },
  ];

  return (
    <aside
      className="
        fixed left-0 top-0 h-screen
        xl:flex
        w-16 md:w-32 lg:w-44 xl:w-64 2xl:w-92
        bg-[#101359]
        font-dm-sans
        flex-col
        transition-all duration-300
        z-40
      "
    >
      {/* LOGO */}
      <div className="flex flex-col items-center justify-center py-4 md:py-0 hover:cursor-pointer" onClick={() => router.push("/")}>
        <Image src={logo} alt="logo" className="w-12 md:w-20 lg:w-36 mt-3" />
        <span className="text-gray-300 lg:font-semibold text-xs text-center">
         MyLearningHub
      </span>
      </div>
      <div className="border-b border-white/30  mb-5" />

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-2 px-2 md:px-4">
        {navItems.map((item) => {
          const active = path === item.href;
          const IconComponent = item.iconComponent;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center
                justify-center lg:justify-start
                gap-0 md:gap-3
                px-2 md:px-4 py-3
                rounded-md
                transition
                ${
                  active
                    ? "bg-[#45D2FF] text-white"
                    : "text-white hover:bg-white/10"
                }
              `}
            >
              {IconComponent ? (
                <IconComponent size={20} className="shrink-0" />
              ) : (
                <Image src={item.icon} alt="" className="w-5 h-5" />
              )}

              {/* TEXT FROM MD */}
              <span className="hidden lg:inline lg:text-sm">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default UserSideBar;
