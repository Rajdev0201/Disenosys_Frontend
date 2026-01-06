"use client"
import Image from 'next/image'
import React from 'react'
import L1 from "@/components/assests/971.jpg"
import L2 from "@/components/assests/side.jpg"
import L3 from "@/components/assests/code.jpg"
import dev from "@/components/assests/dev.jpg"
import { motion } from "framer-motion";
const Learning = () => {

    const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

  return (
    <div className="flex justify-center items-center flex-col mx-auto 
                bg-gradient-to-b from-[#080b18] via-[#0b0b1c] to-black
                p-6 space-y-2 py-28 border-b border-[#45D2FF]/20 
                font-dm-sans">

  {/* Section Header */}
  <motion.h3
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    className="text-[#45D2FF] text-md font-bold mb-4"
  >
    Why You’ll Love Learning Here
  </motion.h3>

  <motion.p
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.3 }}
    className="text-white font-extrabold text-4xl md:text-5xl mb-28 text-center"
  >
    Quality, Structure, and Real Results
  </motion.p>

  {/* BLOCK 1 */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl mb-28 items-center">
    <motion.div
      variants={fadeLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col"
    >
      <h5 className="text-[#45D2FF] mb-3 text-lg">
        A clear path to master coding
      </h5>
      <p className="text-4xl font-bold text-white mb-5">
        Perfectly Structured Courses
      </p>
      <p className="text-xl font-medium text-[#9aa1c7]">
        No more jumping between random tutorials. Follow a clear,
        step-by-step roadmap designed for real developer growth.
      </p>
    </motion.div>

    <motion.div
      variants={fadeRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <Image src={L1} className="rounded-xl shadow-xl" alt="" />
    </motion.div>
  </div>

  {/* BLOCK 2 */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl mb-28 items-center">
    <motion.div
      variants={fadeLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <Image src={L2} className="rounded-xl shadow-xl" alt="" />
    </motion.div>

    <motion.div
      variants={fadeRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col"
    >
      <h5 className="text-[#45D2FF] mb-3 text-lg">
        Straightforward and practical
      </h5>
      <p className="text-4xl font-bold text-white mb-5">
        Clear & Bite-Sized Lessons
      </p>
      <p className="text-xl font-medium text-[#9aa1c7]">
        Focused lessons with zero fluff. Learn exactly what matters,
        even with a busy schedule.
      </p>
    </motion.div>
  </div>

  {/* BLOCK 3 */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl mb-28 items-center">
    <motion.div
      variants={fadeLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col"
    >
      <h5 className="text-[#45D2FF] mb-3 text-lg">
        Deep understanding, not shortcuts
      </h5>
      <p className="text-4xl font-bold text-white mb-5">
        More Than Just Code
      </p>
      <p className="text-xl font-medium text-[#9aa1c7]">
        Learn the “why” and “how” behind every concept so you can
        confidently build and debug real systems.
      </p>
    </motion.div>

    <motion.div
      variants={fadeRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <Image src={L3} className="rounded-xl shadow-xl" alt="" />
    </motion.div>
  </div>

  {/* BLOCK 4 */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl items-center">
    <motion.div
      variants={fadeLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <Image src={dev} className="rounded-xl shadow-xl" alt="" />
    </motion.div>

    <motion.div
      variants={fadeRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col"
    >
      <h5 className="text-[#45D2FF] mb-3 text-lg">
        Real industry experience
      </h5>
      <p className="text-4xl font-bold text-white mb-5">
        Built on Years of Production Work
      </p>
      <p className="text-xl font-medium text-[#9aa1c7]">
        Learn from real-world systems, mistakes, and best practices —
        not textbook examples.
      </p>
    </motion.div>
  </div>

</div>
  )
}

export default Learning;