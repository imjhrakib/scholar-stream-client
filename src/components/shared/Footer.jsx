// Footer.jsx
import React from "react";
import logo from "../../assets/logo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-start gap-10 md:gap-0">
        {/* Logo & Description */}
        <div className="flex flex-col md:w-1/3">
          <div className="flex items-center mb-4">
            <img
              src={logo}
              alt="Scholar Stream Logo"
              className="w-12 h-12 mr-3"
            />
            <span className="text-2xl font-bold text-white">
              Scholar Stream
            </span>
          </div>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed md:max-w-xs">
            ScholarStream connects students with scholarships worldwide, helping
            them find, apply, and achieve their academic dreams with ease. We
            simplify the scholarship journey so every student can access
            opportunities and secure a brighter future.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:w-1/6">
          <h3 className="font-semibold text-white mb-3 text-lg">Quick Links</h3>
          <a
            href="/"
            className="hover:text-white transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="/scholarships"
            className="hover:text-white transition-colors duration-300"
          >
            Scholarships
          </a>
          <a
            href="/about"
            className="hover:text-white transition-colors duration-300"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:text-white transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        {/* Social Media */}
        <div className="flex flex-col md:w-1/6 sm:mr-15">
          <h3 className="font-semibold text-white mb-3 text-lg">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://github.com/imjhrakib?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-500 transition duration-300 shadow-md hover:shadow-lg"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.facebook.com/imjhrakib"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-lg"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/imjhrakib"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-blue-400 transition duration-300 shadow-md hover:shadow-lg"
            >
              <FaX />
            </a>
            <a
              href="https://www.linkedin.com/in/imjhrakib/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        &copy; 2025 ScholarStream. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
