import React, { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import logo from "../../assets/logo.png";
import PrimaryBtn from "../ui/PrimaryBtn";
import SecondaryBtn from "../ui/SecondaryBtn";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const closeMobile = () => setMobileOpen(false);

  const links = (
    <>
      <li className="font-semibold transition">
        <NavLink
          to="/"
          onClick={closeMobile}
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 border-b-2 border-blue-600 pb-1"
              : "hover:text-blue-500 hover:border-b-2 border-transparent pb-1 hover:border-blue-500"
          }
        >
          Home
        </NavLink>
      </li>

      <li className="font-semibold transition">
        <NavLink
          to="/scholarships"
          onClick={closeMobile}
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 border-b-2 border-blue-600 pb-1"
              : "hover:text-blue-500 hover:border-b-2 border-transparent pb-1 hover:border-blue-500"
          }
        >
          All Scholarships
        </NavLink>
      </li>

      {user && (
        <li className="font-semibold transition">
          <NavLink
            to="/dashboard"
            onClick={closeMobile}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "hover:text-blue-500 hover:border-b-2 border-transparent pb-1 hover:border-blue-500"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar bg-white shadow-md px-4 lg:px-10 py-3 sticky top-0 z-50">
      {/* Left: Logo + Mobile Button */}
      <div className="navbar-start flex items-center">
        <div className="lg:hidden mr-2">
          <button
            onClick={() => setMobileOpen(true)}
            className="btn btn-ghost p-2 hover:bg-gray-100 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <NavLink to="/" className="flex items-center">
          <img src={logo} width={40} height={40} alt="Logo" />
          <span className="ml-2 font-bold text-xl text-blue-600">
            Scholar Stream
          </span>
        </NavLink>
      </div>

      {/* Center Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6">{links}</ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end flex items-center gap-2">
        {user ? (
          <div ref={dropdownRef} className="relative">
            <img
              onClick={() => setProfileOpen(!profileOpen)}
              src={user?.photoURL}
              alt="User"
              className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
            />

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                <p className="px-4 py-2 text-sm text-gray-700 border-b">
                  {user.displayName || "User"}
                </p>

                <NavLink
                  to="/dashboard"
                  onClick={() => setProfileOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Dashboard
                </NavLink>

                <button
                  onClick={logOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink to="/login">
              <PrimaryBtn btnText="Login" />
            </NavLink>
            <NavLink to="/register" className="hidden md:block">
              <SecondaryBtn btnText="Register" />
            </NavLink>
          </>
        )}
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
            />

            {/* Slide Menu */}
            <motion.ul
              className="menu menu-vertical gap-6 bg-white p-6 shadow-lg rounded-r-2xl fixed top-20 left-0 h-full  w-64 z-50 lg:hidden"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
            >
              {links}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
