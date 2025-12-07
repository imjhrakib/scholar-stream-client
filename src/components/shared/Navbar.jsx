// Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import logo from "../../assets/logo.png";
import PrimaryBtn from "../ui/PrimaryBtn";
import SecondaryBtn from "../ui/SecondaryBtn";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  // Separate states
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const links = (
    <>
      <li className="font-semibold hover:text-blue-500 transition">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 border-b-2 border-blue-600 pb-1"
              : "hover:text-blue-500 hover:border-b-2 hover:border-blue-500 rounded-sm"
          }
        >
          Home
        </NavLink>
      </li>
      <li className="font-semibold hover:text-blue-500 transition">
        <NavLink
          to="/scholarships"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 border-b-2 border-blue-600 pb-1"
              : "hover:text-blue-500 hover:border-b-2 hover:border-blue-500 rounded-xl"
          }
        >
          All Scholarships
        </NavLink>
      </li>
      {user && (
        <li className="font-semibold hover:text-blue-500 transition">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "hover:text-blue-500 hover:border-b-2 hover:border-blue-500 rounded-xl"
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
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar bg-white shadow-md px-4 py-3 sticky top-0 z-50">
      {/* Logo */}
      <div className="navbar-start flex items-center">
        {/* Mobile Menu Button */}
        <div className="lg:hidden mr-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
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
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <NavLink to="/" className="flex items-center">
          <img src={logo} width={40} height={40} alt="Scholar Stream Logo" />
          <span className="ml-2 font-bold text-xl text-blue-600">
            Scholar Stream
          </span>
        </NavLink>
      </div>

      {/* Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4">{links}</ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end flex items-center gap-2">
        {user ? (
          <div ref={dropdownRef} className="relative">
            <img
              onClick={() => setProfileOpen(!profileOpen)}
              src={user.photoURL}
              alt={user.displayName || "User"}
              className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
            />

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                <p className="px-4 py-2 text-sm text-gray-700 border-b">
                  {user.displayName || "User"}
                </p>
                <NavLink
                  to="/dashboard"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setProfileOpen(false)}
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <ul className="menu menu-vertical gap-2 lg:hidden mt-2 bg-white p-4 shadow-md rounded-md absolute top-20 left-4 right-4 z-40">
          {links}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
