"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0d1039] font-dm-sans">
      {/* Top Section */}
      <div className="px-6 sm:px-10 lg:px-24 py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & About */}
          <div>
            <h1 className="font-bold text-xl text-white mb-4">DISENOSYS</h1>
            <p className="text-sm md:text-base text-white mb-6">
              Welcome to Disenosys, your premier destination for specialized
              computational engineering services and training. Empowering
              innovation through expert engineering solutions.
            </p>
            <div className="flex justify-center sm:justify-start space-x-6">
              <a href="https://youtube.com/@disenosysindia?feature=shared">
                <Youtube
                  size={28}
                  className="text-white hover:text-gray-400 transition-colors"
                />
              </a>
              <a href="https://www.instagram.com/disenosys_official/">
                <Instagram
                  size={28}
                  className="text-white hover:text-gray-400 transition-colors"
                />
              </a>
              <a href="https://www.facebook.com/disenosysofficial/">
                <Facebook
                  size={28}
                  className="text-white hover:text-gray-400 transition-colors"
                />
              </a>
              <a href="https://www.linkedin.com/school/disenosys/">
                <Linkedin
                  size={28}
                  className="text-white hover:text-gray-400 transition-colors"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h1 className="font-bold text-xl text-white mb-4">QUICK LINKS</h1>
            <div className="space-y-3 flex flex-col">
              <Link href="/about" className="text-white hover:text-gray-300">
                About Us
              </Link>
              <Link href="/event" className="text-white hover:text-gray-300">
                Event
              </Link>
              <Link
                href="/successstory"
                className="text-white hover:text-gray-300"
              >
                Success Story
              </Link>
              <Link href="/contact" className="text-white hover:text-gray-300">
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h1 className="font-bold text-xl text-white mb-4">SERVICES</h1>
            <div className="space-y-3 flex flex-col">
              <Link
                href="/eng&research"
                className="text-white hover:text-gray-300"
              >
                Engineering & Research
              </Link>
              <Link href="/l&d" className="text-white hover:text-gray-300">
                Learning & Development
              </Link>
              <Link href="/staffing" className="text-white hover:text-gray-300">
                Staffing
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h1 className="font-bold text-xl text-white mb-4">CONTACT</h1>
            <div className="space-y-4">
              <p className="text-white flex items-start gap-3">
                <MapPin className="w-6 h-6 mt-1" />
                <span>
                  11, VOC St, Ranga Colony, Rajakilpakam, Tamilnadu 60073
                </span>
              </p>
              <p className="text-white flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span>+91-9944303400</span>
              </p>
              <p className="text-white flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>info@Disenosys.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#45D2FF] flex flex-col sm:flex-row justify-between items-center gap-2 px-6 sm:px-10 lg:px-20 py-3">
        <h1 className="text-white text-xs sm:text-sm md:text-base font-medium text-center sm:text-left">
          © 2026 Disenosys. All rights reserved.
        </h1>
        <div className="flex gap-3 text-white text-xs sm:text-sm md:text-base">
          <Link href="/termsandconditions" className="hover:text-gray-200">
            Terms & Conditions
          </Link>
          <span>|</span>
          <Link href="/privacyandpolicy" className="hover:text-gray-200">
            Privacy Policy
          </Link>
          <span>|</span>
          <Link href="/faq" className="hover:text-gray-200">
            FAQ
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
