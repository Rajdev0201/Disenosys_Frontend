"use client";
import React from "react";
import { Facebook, Twitter, Linkedin, Instagram, User2 } from "lucide-react";
import Link from "next/link";

const ImageWithFallback = ({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `https://placehold.co/1080x960/CCCCCC/000000?text=Image+Load+Error`;
      }}
    />
  );
};

export default function ArticleCourses({ slug, blogs }) {
  return (
    <div className="min-h-screen  py-12 px-4 font-sans mb-8">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto bg-white border-1 border-gray-100 rounded-lg shadow-l p-4 sm:p-8">
        {blogs?.data
          ?.filter((blog) => blog._id === slug)
          ?.map((post, index) => (
            <div key={index} className="flex flex-col lg:flex-row gap-8">
              {/* Left Column */}
              <div className="flex-1">
                <div className="rounded-xl overflow-hidden mb-8 relative h-96">
                  <div
                    className="mechanic w-full h-full object-cover"
                    role="img"
                    aria-label="Electric Vehicle Charging"
                  >
                    <div>
                      <img
                        src={post?.filePath}
                        className="object-cover w-full h-56 sm:h-72 md:h-auto rounded shadow-md"
                        alt={post?.title || "Blog image"}
                      />
                    </div>
                  </div>
                </div>

                {/* article body content */}

                <p
                  className="mt-4 text-gray-800 font-medium text-sm sm:text-base md:text-md"
                  dangerouslySetInnerHTML={{
                    __html: post?.description
                      ? post.description
                          .replace(/\n+/g, "<br/>") // Line breaks
                          .replace(
                            /<a\b(.*?)>/g,
                            '<a$1 class="underline text-xl text-blue-500">'
                          ) //link
                          .replace(
                            /<ul>/g,
                            '<ul class="list-disc text-gray-800 pl-5">'
                          ) // Bullet lists
                          .replace(
                            /<ol>/g,
                            '<ol class="list-decimal text-gray-800 pl-5">'
                          ) // Ordered lists
                          .replace(/<li>/g, '<li class="mt-1">') // List items
                          .replace(
                            /<h1>/g,
                            '<h1 class="text-3xl font-bold mt-4 mb-2">'
                          ) // Heading 1
                          .replace(
                            /<h2>/g,
                            '<h2 class="text-2xl font-semibold mt-4 mb-2">'
                          ) // Heading 2
                          .replace(
                            /<h3>/g,
                            '<h3 class="text-xl font-medium mt-3 mb-2">'
                          ) // Heading 3
                          .replace(/<strong>/g, '<strong class="font-bold">') // Bold
                          .replace(/<em>/g, '<em class="italic">') // Italic
                          .replace(/<u>/g, '<u class="underline">') // Underline
                      : "",
                  }}
                ></p>
                <div className="bg-indigo-50 border-l-4 border-indigo-900 p-4 my-6 rounded-r-md">
                  <p className="text-indigo-900 font-semibold">
                    💡 Skill-up. No one is going to replace talent.
                  </p>
                </div>

                {/* bar (Bottom) */}
                <div className=" bg-[#101359] text-white p-4 rounded-lg flex items-center justify-between mt-8 shadow-md">
                  <span>Like what you see? Share with a friend.</span>
                  <div className="flex gap-3">
                    {/* social buttons */}
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition duration-150">
                      <Facebook size={16} className="text-indigo-900" />
                    </button>
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition duration-150">
                      <Twitter size={16} className="text-indigo-900" />
                    </button>
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition duration-150">
                      <Linkedin size={16} className="text-indigo-900" />
                    </button>
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition duration-150">
                      <Instagram size={16} className="text-indigo-900" />
                    </button>
                  </div>
                </div>
              </div>

              {/* right sidebar */}
              <div className="w-full lg:w-80 flex-shrink-0">
                {/* author card */}
                <div className="bg-[#0d1039] text-white rounded-xl p-6 mb-6 shadow-lg font-dm-sans">
                    <div className="flex flex-col justify-center items-center">
                  <div className="w-12 h-12 mx-0 mb-4 overflow-hidden shadow-md rounded-lg">
                    <User2
                       size={10}
                      className="profile w-full h-full object-cover"
                    />
                  </div>
                  <h3 className=" mb-1 text-xl font-bold">{post.name}</h3>
                  <p className=" mb-2 text-sm">{post.designation}</p>
                  </div>
                  {/* <p className=" text-gray-300 mb-4 text-sm ">
                    Expert in CAE analysis, structural design, adept student,
                    confluence
                  </p> */}
                  <div className=" p-8 border-t border-indigo-700 pt-4">
                    <p className="mb-2 text-sm font-medium">
                      Share with your community!
                    </p>
                    <div className="mb-1 flex gap-5 mt-2 ">
                      {/* Social Buttons */}
                      <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition duration-150">
                        <Facebook size={16} className="text-indigo-900" />
                      </button>
                      <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition duration-150">
                        <Twitter size={16} className="text-indigo-900" />
                      </button>
                      <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition duration-150">
                        <Linkedin size={16} className="text-indigo-900" />
                      </button>
                      <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition duration-150">
                        <Instagram size={16} className="text-indigo-900" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Table of Contents */}
                <div className="bg-white   p-6 shadow-md  top-6">
                  <h3 className=" mb-4  text-[#101359] text-med font-semibold bg-white border-l-4 border-indigo-900 p-4 my-3">
                    In this article
                  </h3>
                  <ul className="space-y-3 list-none pl-0 text-sm">
                    {blogs?.data?.map((item, index) => (
                      <li key={index}>
                        <Link
                         href={`/blog-details/${post._id}`}
                          className={
                            item.active
                              ? "text-indigo-900 font-bold"
                              : "text-gray-700 hover:text-indigo-700"
                          }
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
