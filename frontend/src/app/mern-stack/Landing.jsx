"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/custom/Button";
// import Card from "@/components/custom/Card";
import DynamicGreetings from "./Greetings";
import About from "./About";
import BannerCards from "./BannerCards";
import {
  Palette,
  Braces,
  Atom,
  Wind,
  Layers,
  Server,
  Database,
  GitBranch,
  FileJson,
  Code,
  Trophy,
  Gamepad2,
  Clock,
  Code2,
  DollarSign,
  ShieldCheck,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import Learning from "./Learning";

const techStack = [
  { name: "HTML", icon: Code },
  { name: "CSS", icon: Palette },
  { name: "JavaScript", icon: Braces },
  { name: "React", icon: Atom },
  { name: "Tailwind", icon: Wind },
  { name: "Redux", icon: Layers },
  { name: "Node.js", icon: Server },
  { name: "MongoDB", icon: Database },
  { name: "Express", icon: Server },
  { name: "Next.js", icon: Atom },
  { name: "JSON", icon: FileJson },
  { name: "Git", icon: GitBranch },
];

const curriculum = [
  {
    week: "Week 1 – HTML & CSS Foundations",
    outcome: "Build responsive websites confidently",
    topics: [
      "HTML5 Semantic Tags",
      "Forms & Accessibility",
      "CSS Flexbox & Grid",
      "Responsive Design",
      "Git & GitHub Basics",
    ],
  },
  {
    week: "Week 2 – JavaScript Core",
    outcome: "Think like a JavaScript developer",
    topics: [
      "Variables & Data Types",
      "Functions & Scope",
      "ES6+ Features",
      "DOM Manipulation",
      "Events & Forms",
    ],
  },
  {
    week: "Week 3 – Advanced JavaScript",
    outcome: "Write clean & async code",
    topics: [
      "Closures & Hoisting",
      "Promises & async/await",
      "Error Handling",
      "Clean Code Practices",
    ],
  },
  {
    week: "Week 4 – React Fundamentals",
    outcome: "Build modern frontend applications",
    topics: [
      "React Architecture",
      "Components & Props",
      "useState & useEffect",
      "JSX & Events",
    ],
  },
  {
    week: "Week 5 – Tailwind CSS & Advanced React",
    outcome: "Create premium UI like startups",
    topics: [
      "Tailwind Utility Classes",
      "Forms & Validation",
      "Conditional Rendering",
      "Performance Basics",
    ],
  },
  {
    week: "Week 6 – Redux Toolkit",
    outcome: "Manage complex app state",
    topics: [
      "Redux Core Concepts",
      "Redux Toolkit",
      "Async Thunks",
      "Global State Management",
    ],
  },
  {
    week: "Week 7 – Node.js & Express",
    outcome: "Build backend APIs",
    topics: [
      "Node.js Fundamentals",
      "Express Routing",
      "REST APIs",
      "Middleware",
    ],
  },
  {
    week: "Week 8 – MongoDB & Database Design",
    outcome: "Design real-world databases",
    topics: [
      "MongoDB Basics",
      "Mongoose ODM",
      "Schema Design",
      "CRUD Operations",
    ],
  },
  {
    week: "Week 9 – Authentication & Security",
    outcome: "Secure production applications",
    topics: [
      "JWT Authentication",
      "Password Hashing",
      "Role-Based Access",
      "API Security",
    ],
  },
  {
    week: "Week 10 – Full MERN Project",
    outcome: "Real-world full stack experience",
    topics: [
      "Frontend + Backend Integration",
      "Protected Routes",
      "Deployment",
    ],
  },
  {
    week: "Week 11 – Next.js",
    outcome: "SEO-ready professional apps",
    topics: ["Next.js Routing", "SSR vs CSR", "SEO Optimization"],
  },
  {
    week: "Week 12 – Placement & Career Prep",
    outcome: "Get job-ready",
    topics: [
      "Resume Building",
      "Mock Interviews",
      "HR & Technical Rounds",
      "Job Referrals",
    ],
  },
];

const sendWhatsAppMessage = () => {
  if (typeof window !== "undefined") {
    // Check if window is defined
    const phoneNumber = "+91-9944478700";
    const message =
      "I’m interested in the courses offered at MERN Stack Program. Could you please share more details? Thanks!";
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  }
};

export default function LandingPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen font-dm-sans bg-white text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-start justify-start mern px-4 lg:px-10 py-32 overflow-hidden border-b border-gray-800">
        {/* Soft Blue Glow */}
        <div className="grid lg:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="text-2xl md:text-5xl font-extrabold 
               text-white max-w-md lg:max-w-4xl"
            >
              MERN STACK ACCELERATOR PROGRAM
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-md md:text-xl text-white font-bold max-w-md lg:max-w-3xl"
            >
              From Beginner to{" "}
              <span className="text-white font-semibold">Paid Developer</span>{" "}
              in 6 Months. A 2-Month High-Intensity Sprint followed by a 4-Month
              Paid Production Deployment.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-sm md:text-lg font-bold text-white"
            >
              Don’t just learn. <span className="">Get Hired.</span>{" "}
              <span className="">Get Paid.</span>{" "}
              <span className="">Get Deployed.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-12 flex flex-col lg:flex-row lg:gap-4"
            >
              <Button
                text="Apply for the Accelerator"
                onClick={sendWhatsAppMessage}
                className="bg-[#45D2FF] hover:bg-sky-400 text-sm lg:text-lg w-60 lg:w-full text-white 
                 font-extrabold lg:px-10 py-4 rounded-2xl shadow-2xl"
              />

              <Button
                text="View Curriculum"
                onClick={() => setOpen(true)}
                className="border border-[#45D2FF]/40 text-white w-60 lg:w-full font-extrabold 
                 px-10 py-4 rounded-2xl hover:bg-[#45D2FF]/10"
              />
            </motion.div>
          </div>
          <BannerCards />
        </div>
      </section>
      ;
      <section className="px-6 py-32 bg-gradient-to-br from-[#080b18] via-[#0b0b1c] to-black overflow-hidden">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-5xl font-extrabold text-center mb-24 text-white"
        >
          The <span className="text-[#45D2FF]">Acceleration Framework</span>
        </motion.h2>

        {/* Timeline */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* PHASE 1 */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative bg-[#0e132a] border border-[#45D2FF]/30 rounded-3xl p-8 w-full md:w-1/3 shadow-xl"
          >
            <h3 className="text-[#45D2FF] text-xl font-bold mb-2">
              THE ACCELERATOR SPRINT
            </h3>
            <p className="text-sm text-[#9aa1c7] mb-4">Months 0–2</p>

            <div className="space-y-3 text-[#9aa1c7] text-sm">
              <p className="flex items-center gap-2">
                <Clock size={16} /> 60-Day Intensive Training
              </p>
              <p className="flex items-center gap-2">
                <Code2 size={16} /> HTML, CSS, JS, React
              </p>
              <p className="flex items-center gap-2">
                <Server size={16} /> Node, Express, MongoDB
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck size={16} /> Production-Ready Stack
              </p>
            </div>

            {/* Glow */}
            <div className="absolute -inset-1 bg-[#45D2FF]/10 blur-2xl rounded-3xl -z-10" />
          </motion.div>

          {/* ARROW */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            className="hidden md:block text-[#45D2FF]"
          >
            <ArrowRight size={48} />
          </motion.div>

          {/* PHASE 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-r from-[#1a2f1f] to-[#0e132a]
                 border border-green-400/30 rounded-3xl p-8 w-full md:w-1/3 shadow-xl"
          >
            <h3 className="text-green-400 text-xl font-bold mb-2">
              PAID PROJECT DEPLOYMENT
            </h3>
            <p className="text-sm text-[#9aa1c7] mb-4">Months 3–6</p>

            <div className="space-y-3 text-[#9aa1c7] text-sm">
              <p className="flex items-center gap-2">
                <Briefcase size={16} /> Associate Developer Role
              </p>
              <p className="flex items-center gap-2">
                <DollarSign size={16} /> ₹10,000 / Month Stipend
              </p>
              <p className="flex items-center gap-2">
                <Server size={16} /> Live Client Projects
              </p>
              <p className="flex items-center gap-2">
                <Code2 size={16} /> Production Codebase
              </p>
            </div>

            <div className="absolute -inset-1 bg-green-400/10 blur-2xl rounded-3xl -z-10" />
          </motion.div>

          {/* ARROW */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            className="hidden md:block text-[#45D2FF]"
          >
            <ArrowRight size={48} />
          </motion.div>

          {/* PHASE 3 */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative bg-[#0e132a] border border-[#45D2FF]/30 rounded-3xl p-8 w-full md:w-1/3 shadow-xl"
          >
            <h3 className="text-[#45D2FF] text-xl font-bold mb-2">
              FULL-TIME CAREER LAUNCH
            </h3>
            <p className="text-sm text-[#9aa1c7] mb-4">Month 7+</p>

            <div className="space-y-3 text-[#9aa1c7] text-sm">
              <p>✔ Permanent Junior Developer</p>
              <p>✔ Disenosys Core Team</p>
              <p>✔ Career Growth Path</p>
              <p>✔ Long-Term Mentorship</p>
            </div>

            <div className="absolute -inset-1 bg-[#45D2FF]/10 blur-2xl rounded-3xl -z-10" />
          </motion.div>
        </div>
      </section>
      <DynamicGreetings />
      <About />
      {/* Tech Stack */}
      <section className="px-6 py-28">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl md:text-5xl font-extrabold text-center mb-20 text-[#101359]"
        >
          The <span className="text-[#45D2FF]">Tech Stack You’ll Master</span>
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {techStack.map(({ name, icon: Icon }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.08 }}
              className="bg-[#0e132a] border border-[#45D2FF]/25 
                   rounded-2xl p-6 text-center 
                   hover:border-[#45D2FF] 
                   hover:shadow-[#45D2FF]/30 shadow-xl"
            >
              <Icon className="mx-auto mb-4 text-[#45D2FF]" size={36} />
              <p className="font-semibold text-white">{name}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <Learning />
      {/* Features */}
      <section className="px-6 py-24 ">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-5xl font-extrabold text-center mb-20 text-[#101359]"
        >
          The <span className="text-[#45D2FF]">Accelerator Advantage</span>
        </motion.h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <Feature
            icon={<Gamepad2 />}
            title="Game‑Style Learning"
            desc="Level up through weekly coding battles."
          />
          <Feature
            icon={<Code />}
            title="Real Projects"
            desc=" Move beyond To-Do apps. Build the very tools Disenosys uses for its clients."
          />
          <Feature
            icon={<Trophy />}
            title="Guaranteed Deployment"
            desc="The program is built to fill our own talent pipeline."
          />
        </div>
      </section>
      {/* Pricing */}
      <section className="px-6 py-28 text-center bg-[#101359]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-2xl lg:text-5xl font-extrabold mb-6"
        >
          What You’ll <span className="text-[#45D2FF]">Actually Build</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto text-lg text-[#9aa1c7] leading-relaxed"
        >
          This is not a theory-heavy bootcamp.
          <br />
          You’ll follow a{" "}
          <span className="text-white font-semibold">
            production-first curriculum
          </span>{" "}
          designed around real company workflows, deadlines, and deployment
          standards.
          <br />
          <br />
          Before you ask about fees —
          <span className="text-[#45D2FF] font-semibold">
            understand the depth of what you’ll be trained to build.
          </span>
        </motion.p>

        {/* Key Outcomes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 max-w-4xl mx-auto grid md:grid-cols-3 gap-6"
        >
          {[
            "Production-grade MERN applications",
            "Live client modules used by real users",
            "Code reviews & architecture discussions",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#0e132a] border border-[#45D2FF] rounded-2xl p-6 text-[#9aa1c7]"
            >
              {item}
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <Button
            text="View Full Curriculum"
            onClick={() => setOpen(true)}
            className="px-12 py-5 text-lg font-extrabold rounded-2xl
                 border border-[#45D2FF]/50 text-white
                 hover:bg-[#45D2FF]/10 hover:scale-105 transition"
          />
          <p className="mt-4 text-sm text-[#9aa1c7]">
            Detailed roadmap • Real projects • Deployment flow
          </p>
        </motion.div>
      </section>
      {/* Footer */}
      <footer className="py-10 text-center text-[#101359] text-sm">
        © 2026 MERN STACK ACCELERATOR PROGRAM • Build. Level Up. Get Hired.
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
};

function Feature({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center"
    >
      <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-green-500/10 text-[#45D2FF]">
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
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#45D2FF]">
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
              className="border border-zinc-800 rounded-2xl p-6 hover:border-white transition"
            >
              <h3 className="text-xl font-bold text-cyan-400 mb-1">
                {week.week}
              </h3>

              <p className="text-zinc-400 mb-3">🎯 {week.outcome}</p>

              <ul className="grid md:grid-cols-2 gap-2 text-zinc-300 list-disc list-inside text-sm">
                {week.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          {/* Value Highlights */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#9aa1c7] mb-6 text-lg"
          >
            Paid Internship • ₹10,000 / Month • Internship Certificate • Junior
            Developer Role
          </motion.p>

          {/* Apply CTA */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="px-14 py-6 bg-[#45D2FF] hover:bg-sky-400 
               text-black font-extrabold rounded-2xl 
               text-lg shadow-2xl hover:cursor-pointer"
            onClick={sendWhatsAppMessage}
          >
            Apply for the Accelerator
          </motion.button>

          {/* Trust Line */}
          <p className="mt-4 text-sm text-[#9aa1c7]">
            Limited seats • Selection-based entry • Real company deployment
          </p>
        </div>

        <section className="px-6 py-2 max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-md md:text-xl font-extrabold text-white mt-3">
              Explore the{" "}
              <span className="text-[#45D2FF]">Complete MERN Curriculum</span>
            </h2>
            <p className="text-zinc-400 mt-2 text-md">
              Corporate-structured roadmap designed for real-world development
              roles
            </p>
          </div>

          {/* Download Button */}
          <div className="flex justify-center ">
            <a
              href="https://res.cloudinary.com/dapilmiei/image/upload/Disenosys-mern.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-1 rounded-2xl 
                 bg-gradient-to-r from-[#45D2FF] to-[#4F8CFF]
                 text-black font-bold text-lg
                 hover:scale-105 transition-transform shadow-xl"
            >
              📄 Download Full Curriculum (PDF)
            </a>
          </div>

          {/* PDF Preview */}
          {/* <div className="relative rounded-3xl overflow-hidden border border-[#45D2FF]/30 shadow-2xl">
    <iframe
      src="https://res.cloudinary.com/dapilmiei/image/upload/Disenosys-mern.pdf"
      title="Disenosys MERN Curriculum"
      className="w-full h-[600px] md:h-[800px] bg-black"
    />
  </div> */}
        </section>
      </motion.div>
    </div>
  );
}
