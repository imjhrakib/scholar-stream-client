import React, { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import PrimaryBtn from "../ui/PrimaryBtn";
import SecondaryBtn from "../ui/SecondaryBtn";
import useAuth from "../../hooks/useAuth";
import { ThemeContext } from "../../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const closeMobile = () => setMobileOpen(false);

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

  // Navbar links
  const links = (
    <>
      {["/", "/scholarships", "/about"].map((path, i) => {
        const name =
          path === "/"
            ? "Home"
            : path
                .replace("/", "")
                .replace("-", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase());
        return (
          <li key={i} className="font-semibold transition">
            <NavLink
              to={path}
              onClick={closeMobile}
              className={({ isActive }) =>
                isActive
                  ? `text-blue-500 border-b-2 border-blue-500 pb-1`
                  : `hover:text-${
                      theme === "dark" ? "blue-400" : "blue-600"
                    } hover:border-b-2 border-transparent pb-1`
              }
            >
              {name}
            </NavLink>
          </li>
        );
      })}
      {user && (
        <li className="font-semibold transition">
          <NavLink
            to="/dashboard"
            onClick={closeMobile}
            className={({ isActive }) =>
              isActive
                ? `text-blue-500 border-b-2 border-blue-500 pb-1`
                : `hover:text-${
                    theme === "dark" ? "blue-400" : "blue-600"
                  } hover:border-b-2 border-transparent pb-1`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav
      className={`sticky top-0 z-50 px-4 lg:px-10 py-3 shadow-md transition-colors
      `}
      style={{
        backgroundColor:
          theme === "dark" ? colors.dark.bgNav : colors.light.bgNav,
      }}
    >
      <div className="flex items-center justify-between">
        {/* Left: Logo + Mobile button */}
        <div className="flex items-center gap-2">
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className={`p-2 rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-gray-700`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
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
          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" width={40} height={40} />
            <span
              className={`font-bold text-xl transition-colors ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Scholar Stream
            </span>
          </NavLink>
        </div>

        {/* Center Links */}
        <div className="hidden lg:flex">
          <ul className="flex gap-6">{links}</ul>
        </div>
        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Brightness toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-colors ${
              theme === "dark"
                ? "border-gray-600 hover:bg-gray-700"
                : "border-gray-300 hover:bg-gray-200"
            }`}
            title={
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            {theme === "dark" ? (
              // Sun
              <FaSun className="text-yellow-400 h-5 w-5" />
            ) : (
              <FaMoon className="text-gray-800 h-5 w-5" />
            )}
          </button>

          {user ? (
            <div ref={dropdownRef} className="relative">
              <img
                onClick={() => setProfileOpen(!profileOpen)}
                src={user?.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
              />

              {profileOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg transition-colors ${
                    theme === "dark" ? colors.dark.bgCard : colors.light.bgCard
                  }`}
                >
                  <Link to={"/dashboard/my-profile"}>
                    <p
                      className={`flex items-center gap-3 px-4 py-2 text-sm border-b transition-colors ${
                        theme === "dark"
                          ? "text-white border-gray-600 hover:bg-gray-700"
                          : "text-black border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <span className="rounded-xl">
                        <img
                          src={user?.photoURL}
                          className="w-8 h-8 rounded-full object-cover cursor-pointer ring-2 ring-blue-500 transition"
                          alt=""
                        />
                      </span>
                      <span>{user.displayName || "User"}</span>
                    </p>
                  </Link>

                  <NavLink
                    to="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      theme === "dark"
                        ? "text-white hover:bg-gray-700"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    Dashboard
                  </NavLink>

                  <button
                    onClick={logOut}
                    className={`w-full text-left px-4 py-2 text-sm text-red-600 transition-colors ${
                      theme === "dark"
                        ? "hover:bg-red-800/20"
                        : "hover:bg-red-50"
                    }`}
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
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className={`fixed inset-0 z-40 transition-colors ${
                theme === "dark" ? "bg-black/70" : "bg-gray-300/80"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
            />

            {/* Slide Menu */}
            <motion.ul
              className={`menu menu-vertical gap-6 p-6 shadow-lg rounded-r-2xl fixed top-20 left-0 h-full w-64 z-50 transition-colors ${
                theme === "dark" ? colors.dark.bgCard : colors.light.bgCard
              }`}
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
