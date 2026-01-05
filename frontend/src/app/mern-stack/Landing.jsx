"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/custom/Button";
import Card from "@/components/custom/Card";
import { Code, Trophy, Gamepad2 } from "lucide-react";
import DynamicGreetings from "./Greetings";
import About from "./About";




const curriculum = [
  {
    week: "Week 1 – HTML & CSS Foundations",
    outcome: "Build responsive websites confidently",
    topics: [
      "HTML5 Semantic Tags",
      "Forms & Accessibility",
      "CSS Flexbox & Grid",
      "Responsive Design",
      "Git & GitHub Basics"
    ]
  },
  {
    week: "Week 2 – JavaScript Core",
    outcome: "Think like a JavaScript developer",
    topics: [
      "Variables & Data Types",
      "Functions & Scope",
      "ES6+ Features",
      "DOM Manipulation",
      "Events & Forms"
    ]
  },
  {
    week: "Week 3 – Advanced JavaScript",
    outcome: "Write clean & async code",
    topics: [
      "Closures & Hoisting",
      "Promises & async/await",
      "Error Handling",
      "Clean Code Practices"
    ]
  },
  {
    week: "Week 4 – React Fundamentals",
    outcome: "Build modern frontend applications",
    topics: [
      "React Architecture",
      "Components & Props",
      "useState & useEffect",
      "JSX & Events"
    ]
  },
  {
    week: "Week 5 – Tailwind CSS & Advanced React",
    outcome: "Create premium UI like startups",
    topics: [
      "Tailwind Utility Classes",
      "Forms & Validation",
      "Conditional Rendering",
      "Performance Basics"
    ]
  },
  {
    week: "Week 6 – Redux Toolkit",
    outcome: "Manage complex app state",
    topics: [
      "Redux Core Concepts",
      "Redux Toolkit",
      "Async Thunks",
      "Global State Management"
    ]
  },
  {
    week: "Week 7 – Node.js & Express",
    outcome: "Build backend APIs",
    topics: [
      "Node.js Fundamentals",
      "Express Routing",
      "REST APIs",
      "Middleware"
    ]
  },
  {
    week: "Week 8 – MongoDB & Database Design",
    outcome: "Design real-world databases",
    topics: [
      "MongoDB Basics",
      "Mongoose ODM",
      "Schema Design",
      "CRUD Operations"
    ]
  },
  {
    week: "Week 9 – Authentication & Security",
    outcome: "Secure production applications",
    topics: [
      "JWT Authentication",
      "Password Hashing",
      "Role-Based Access",
      "API Security"
    ]
  },
  {
    week: "Week 10 – Full MERN Project",
    outcome: "Real-world full stack experience",
    topics: [
      "Frontend + Backend Integration",
      "Protected Routes",
      "Deployment"
    ]
  },
  {
    week: "Week 11 – Next.js",
    outcome: "SEO-ready professional apps",
    topics: [
      "Next.js Routing",
      "SSR vs CSR",
      "SEO Optimization"
    ]
  },
  {
    week: "Week 12 – Placement & Career Prep",
    outcome: "Get job-ready",
    topics: [
      "Resume Building",
      "Mock Interviews",
      "HR & Technical Rounds",
      "Job Referrals"
    ]
  }
];



export default function LandingPage() {
  const [open, setOpen] = useState(false);

    const sendWhatsAppMessage = () => {
    if (typeof window !== 'undefined') { // Check if window is defined
      const phoneNumber = '+91-9944478700';
      const message = 'I’m interested in the courses offered at MERN Stack Program. Could you please share more details? Thanks!';
      const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500"
        >
          MERN STACK BOOTCAMP
        </motion.h1>

        <p className="mt-6 text-md md:text-xl text-zinc-300 max-w-2xl">
          Become a <span className="text-green-400 font-semibold">Job‑Ready Full Stack Developer</span> in 60 Days
          with Real‑World Projects & Placement Support.
        </p>

        <div className="mt-10 flex gap-2 lg:gap-4">
          <Button type="button" text="Apply Now" onClick={sendWhatsAppMessage} className="bg-green-500 hover:bg-green-600 text-md lg:text-xl hover:cursor-pointer text-black font-bold px-5 py-1 lg:px-8 lg:py-1 rounded-2xl shadow-lg" />
          <Button
            type="button"
            variant="outline"
            text="View Curriculum"
            onClick={() => setOpen(true)}
            className="border-zinc-600 lg:px-8 lg:py-2 rounded-2xl px-5 py-1 text-md lg:text-xl hover:cursor-pointer"
          />

        </div>
    
        {/* Floating glow */}
        <div className="absolute -z-10 w-[500px] h-[500px] bg-green-500/20 blur-[150px] rounded-full" />
      </section>
       <DynamicGreetings/>

         <About/>

      {/* Tech Stack */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <h2 className="text-xl lg:text-4xl font-bold text-center mb-14">Tech Stack You'll Master</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["HTML", "CSS", "JavaScript", "React", "Tailwind", "Redux", "Node.js", "MongoDB", "Express", "Next.js"].map(
            (tech) => (
              <Card
                key={tech}
                className="bg-zinc-900 border border-zinc-800 hover:border-green-400 transition rounded-2xl"
              >
                <p className="p-6 text-center font-semibold">
                  {tech}
                </p>
              </Card>
            )
          )}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <Feature icon={<Gamepad2 />} title="Game‑Style Learning" desc="Level up weekly with challenges & projects." />
          <Feature icon={<Code />} title="Real Projects" desc="Build startup‑level MERN applications." />
          <Feature icon={<Trophy />} title="Placement Support" desc="Resume, interviews & job referrals." />
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-xl lg:text-4xl font-bold mb-6">Bootcamp Fee</h2>
        <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-xl">
          <p className="text-5xl font-extrabold text-green-400">₹1,00,000</p>
          <p className="text-zinc-400 mt-4">60 Days • Live Training • Placement Support</p>
          <Button text="Enroll Now" onClick={sendWhatsAppMessage} className="mt-8 w-full py-6 hover:cursor-pointer text-lg font-bold bg-green-500 hover:bg-green-600 text-black rounded-2xl" />

        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-zinc-500 text-sm">
        © 2026 MERN Bootcamp • Build. Level Up. Get Hired.
      </footer>

      {open && <CurriculumModal onClose={() => setOpen(false)} />}

    </div>
  );
}

({ icon, title, desc }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center"
    >
      <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-green-500/10 text-green-400">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-zinc-400">{desc}</p>
    </motion.div>
  );
}


function Feature({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center"
    >
      <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-green-500/10 text-green-400">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-zinc-400">{desc}</p>
    </motion.div>
  );
}



function CurriculumModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl w-full bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-8 overflow-y-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-400">
            Disenosys MERN Stack Curriculum – 60 Days
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Curriculum */}
        <div className="space-y-6">
          {curriculum.map((week) => (
            <div
              key={week.week}
              className="border border-zinc-800 rounded-2xl p-6 hover:border-green-400 transition"
            >
              <h3 className="text-xl font-bold text-cyan-400 mb-1">
                {week.week}
              </h3>

              <p className="text-zinc-400 mb-3">
                🎯 {week.outcome}
              </p>

              <ul className="grid md:grid-cols-2 gap-2 text-zinc-300 list-disc list-inside text-sm">
                {week.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-zinc-400 mb-4">
            ₹1,00,000 • 60 Days • Placement Support Included
          </p>
          <button className="px-12 py-6 bg-green-500 hover:bg-green-600 text-black font-bold rounded-2xl text-lg hover:cursor-pointer">
            Apply Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}
