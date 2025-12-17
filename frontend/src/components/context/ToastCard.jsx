"use client";

import { CircleCheck, XCircle, Info, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const variants = {
  success: {
    icon: <CircleCheck className="text-white" size={20} />,
    bg: "bg-green-500",
  },
  error: {
    icon: <XCircle className="text-white" size={20} />,
    bg: "bg-red-500",
  },
  info: {
    icon: <Info className="text-white" size={20} />,
    bg: "bg-blue-500",
  },
  warning: {
    icon: <AlertTriangle className="text-white" size={20} />,
    bg: "bg-yellow-500",
  },
};

const ToastCard = ({ type, title, message }) => {
  const v = variants[type] || variants.info;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-lg rounded-2xl w-80 p-4 border border-gray-200"
    >
      <div className="flex gap-4 items-start">
        <div className={`${v.bg} w-10 h-10 rounded-full flex items-center justify-center`}>
          {v.icon}
        </div>

        <div className="">
          <h1 className="font-semibold text-[#0B0D3F] text-base">{title}</h1>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ToastCard;
