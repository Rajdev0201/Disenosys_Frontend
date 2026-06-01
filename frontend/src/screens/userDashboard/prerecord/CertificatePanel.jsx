"use client";

import React, { useState } from "react";
import axios from "axios";
import { Download, FileBadge2, Lock, Sparkles } from "lucide-react";
import { useToast } from "@/components/context/ToastContext";
import { API } from "@/components/utils/constant";
import html2pdf from "html2pdf.js";
import "../../../app/globals.css";

const UNSUPPORTED_COLOR_PATTERN = /(oklch|oklab|color|lab|lch)\(/i;

function getSafeStyleValue(property, value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (!UNSUPPORTED_COLOR_PATTERN.test(raw)) return raw;

  const prop = String(property || "").toLowerCase();

  if (prop.includes("shadow")) return "none";
  if (prop.includes("background-image")) return "none";
  if (prop.includes("text-decoration")) return "none";
  if (prop.includes("border")) return "#d1d5db";
  if (prop.includes("outline")) return "transparent";
  if (prop === "fill" || prop === "stroke") return "#000000";
  if (prop.includes("color")) return "#000000";
  if (prop.includes("background")) return "#ffffff";

  return "";
}

function createPrintableClone(sourceElement) {
  const clone = sourceElement.cloneNode(true);
  const sourceNodes = [sourceElement, ...sourceElement.querySelectorAll("*")];
  const cloneNodes = [clone, ...clone.querySelectorAll("*")];

  cloneNodes.forEach((node, index) => {
    const sourceNode = sourceNodes[index];
    if (!(node instanceof HTMLElement) || !(sourceNode instanceof HTMLElement)) {
      return;
    }

    node.removeAttribute("class");
    if (node !== clone) node.removeAttribute("id");

    const computed = window.getComputedStyle(sourceNode);
    Array.from(computed).forEach((property) => {
      if (property.startsWith("--")) return;
      const safeValue = getSafeStyleValue(
        property,
        computed.getPropertyValue(property)
      );
      if (!safeValue) return;
      node.style.setProperty(property, safeValue);
    });
  });

  clone.style.display = "block";
  clone.style.visibility = "visible";
  clone.style.position = "fixed";
  clone.style.left = "-20000px";
  clone.style.top = "0";
  clone.style.zIndex = "-1";
  clone.style.pointerEvents = "none";
  clone.style.opacity = "1";
  clone.style.width = "1100px";
  clone.style.height = "770px";
  clone.style.overflow = "hidden";
  clone.style.backgroundColor = "#ffffff";
  clone.querySelectorAll("video").forEach((video) => video.remove());

  return clone;
}

export default function CertificatePanel({
  studentName,
  studentEmail,
  courseName,
  completionDate,
  unlocked = false,
}) {
  const [downloading, setDownloading] = useState(false);
  const { showToast } = useToast();
  const [singleStudent, setSingleStudent] = useState({
    name: studentName || "",
    course: courseName || "",
    date: completionDate
      ? new Date(completionDate).toISOString().slice(0, 10)
      : "",
    email: studentEmail || "",
  });
  const [udin, setUdin] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);

  const generateRandomUdin = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSingleStudent((prev) => ({ ...prev, [name]: value }));
  };

  const generateSinglePDF = async (id, name, course, email, date, generatedUdin) => {
    setShowCertificate(true);
    let printableNode = null;

    try {
      await new Promise((resolve) => requestAnimationFrame(resolve));

      const element = document.getElementById(id);
      if (!element) {
        throw new Error("Certificate template not found.");
      }

      printableNode = createPrintableClone(element);
      document.body.appendChild(printableNode);

      const options = {
        margin: [0, 0, 0, 0],
        filename: `${name}_certificate.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2.5,
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#ffffff",
        },
        jsPDF: {
          unit: "px",
          format: [1080, 770],
          orientation: "landscape",
        },
      };

      const pdfDataUrl = await html2pdf()
        .from(printableNode)
        .set(options)
        .outputPdf("datauristring");

      const formData = new FormData();
      formData.append("pdfDataUrl", pdfDataUrl);
      formData.append("email", email);
      formData.append("name", name);
      formData.append("course", course);
      formData.append("date", date);
      formData.append("udin", generatedUdin);

      await axios.post(`${API}send-single-certificate-course`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showToast("success", "Certificate sent", `Certificate sent to ${email}`);
    } catch (error) {
      console.error("Error generating or sending certificate:", error);

      showToast(
        "error",
        "Certificate failed",
        error?.message || "Unable to generate or send the certificate."
      );
    } finally {
      if (printableNode?.parentNode) {
        printableNode.parentNode.removeChild(printableNode);
      }
      setShowCertificate(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDownloading(true);
    const { name, course, email, date } = singleStudent;
    if (!email || !name || !course || !date) {
      setDownloading(false);
      alert("Please fill all the fields.");
      return;
    }
    try {
      const newUdin = generateRandomUdin();
      setUdin(newUdin);
      const uniqueId = "certificate-single";
      await generateSinglePDF(uniqueId, name, course, email, date, newUdin);
    } finally {
      setDownloading(false);
    }
  };

  if (!unlocked) {
    return (
      <div className="rounded-[28px] border border-[#0BA6DC]/20 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#182073] text-white">
            <Lock size={20} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[#182073] font-semibold">
              <FileBadge2 size={18} className="text-[#0BA6DC]" />
              Certificate
            </div>
            <p className="mt-2 text-sm text-[#42526B]">
              Complete the quiz successfully to unlock your certificate download.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#009EE0] shadow-sm ring-1 ring-[#0BA6DC]/15">
              <Sparkles size={14} />
              Certificate unlocks after quiz completion
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-[#0BA6DC]/20 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[#182073] font-semibold">
            <FileBadge2 size={18} className="text-[#0BA6DC]" />
            Certificate
          </div>
          <p className="mt-1 text-sm text-[#5F6C80]">
            Please check your details before sending your certificate.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-[#182073]">Name</span>
          <input
            name="name"
            value={singleStudent.name}
            // onChange={handleInputChange}
             disabled
            className="w-full cursor-not-allowed rounded-2xl border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#0BA6DC] focus:ring-2 focus:ring-[#0BA6DC]/10"
            // placeholder="Learner name"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-[#182073]">Email</span>
          <input
            name="email"
            type="email"
            value={singleStudent.email}
            // onChange={handleInputChange}
             disabled
            className="w-full cursor-not-allowed rounded-2xl border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#0F172A] outline-none focus:border-[#0BA6DC] focus:ring-2 focus:ring-[#0BA6DC]/10"
            // placeholder="student@example.com"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-[#182073]">Course</span>
          <input
            name="course"
            value={singleStudent.course}
            disabled
            className="w-full cursor-not-allowed rounded-2xl border border-[#CBD5E1] bg-[#F8FAFF] px-4 py-3 text-sm text-[#64748B]"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-[#182073]">Date</span>
          <input
            name="date"
            type="date"
            value={singleStudent.date}
            disabled
            className="w-full cursor-not-allowed rounded-2xl border border-[#CBD5E1] bg-[#F8FAFF] px-4 py-3 text-sm text-[#64748B]"
          />
        </label>

        <div className="sm:col-span-2 flex items-center justify-end">
          <button
            type="submit"
            disabled={downloading}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#009EE0_0%,#45D2FF_100%)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:opacity-60"
          >
            <Download size={16} />
            {downloading ? "Sending..." : "Generate & Send"}
          </button>
        </div>
      </form>

      <div
        id="certificate-single"
        className={`certificate-bg w-[1100px] h-full p-10 relative ${showCertificate ? "" : "hidden"}`}
      >
        <div className="text-center mt-32">
          <h2 className="text-5xl space-x-2 text-[#182073] font-semibold font-josefin">
            CERTIFICATE
          </h2>
          <p className="text-3xl font-light font-josefin mt-2">
            OF ACHIEVEMENT
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-xl mt-10 font-light font-nunito">
            THIS CERTIFICATE IS PROUDLY PRESENTED TO
          </p>
          <h2 className="text-5xl font-bold mt-4 text-[#182073] font-montheavy">
            {singleStudent.name}
          </h2>
          <div className="w-[600px] border-2 border-gray-800 mb-0 mt-7" />
        </div>

        <div className="text-center mt-5">
          <p className="text-xl font-light font-nunito">
            for successfully completing the course on
          </p>
          <p className="text-3xl font-light font-lexend text-blue-500 mt-2">
            {singleStudent.course.toUpperCase()}
          </p>
        </div>

        <div className="flex justify-between mt-16">
          <div className="mt-20 mx-64">
            <p className="text-sm font-light font-sans">
              Certificate UDIN : <span className="font-light">{udin}</span>
            </p>
            <p className="text-sm font-light font-sans">
              Completion Date :{" "}
              <span className="font-light">{singleStudent?.date}</span>
            </p>
          </div>

          <div className="flex flex-col justify-end mt-12 mr-16">
            <p className="text-xl font-bold text-blue-900 mt-12">
              PRAVEEN KUMAR S
            </p>
            <p className="text-gray-700 text-center mr-5">CEO, Disenosys</p>
          </div>
        </div>
      </div>
    </div>
  );
}
