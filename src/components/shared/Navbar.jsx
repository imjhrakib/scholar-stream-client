import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";
import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "../../hooks/useTheme";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme, colors } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const closeMobile = () => setMobileOpen(false);

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
          <li key={i} style={{ fontWeight: 600 }}>
            <NavLink
              to={path}
              onClick={closeMobile}
              style={({ isActive }) => ({
                color: isActive
                  ? colors[theme].primary
                  : colors[theme].textPrimary,
                borderBottom: isActive
                  ? `2px solid ${colors[theme].primary}`
                  : "2px solid transparent",
                paddingBottom: "2px",
                transition: "color 0.3s",
              })}
            >
              {name}
            </NavLink>
          </li>
        );
      })}
      {user && (
        <li style={{ fontWeight: 600 }}>
          <NavLink
            to="/dashboard"
            onClick={closeMobile}
            style={({ isActive }) => ({
              color: isActive
                ? colors[theme].primary
                : colors[theme].textPrimary,
              borderBottom: isActive
                ? `2px solid ${colors[theme].primary}`
                : "2px solid transparent",
              paddingBottom: "2px",
              transition: "color 0.3s",
            })}
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav
      style={{
        backgroundColor: colors[theme].bgNav,
        color: colors[theme].textPrimary,
        transition: "0.3s",
      }}
      className="sticky top-0 z-50 px-4 lg:px-10 py-3 shadow-md"
    >
      <div className="flex items-center justify-between">
        {/* Left: Logo + Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              style={{
                backgroundColor: colors[theme].bgCard,
                color: colors[theme].textPrimary,
              }}
              className="p-2 rounded-md transition-colors"
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
          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" width={40} height={40} />
            <span
              style={{ color: colors[theme].textPrimary }}
              className="font-bold text-xl transition-colors"
            >
              Scholar Stream
            </span>
          </NavLink>
        </div>

        {/* Center Links */}
        <div className="hidden lg:flex">
          <ul className="flex gap-6">{links}</ul>
        </div>

        {/* Right Section: Theme & Auth */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              borderColor: colors[theme].border,
              backgroundColor: colors[theme].bgCard,
            }}
            className="p-2 rounded-full border transition-all"
            title={
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            {theme === "dark" ? (
              <FaSun style={{ color: colors[theme].primary }} />
            ) : (
              <FaMoon style={{ color: colors[theme].textPrimary }} />
            )}
          </button>

          {/* User / Auth Buttons */}
          {user ? (
            <div ref={dropdownRef} className="relative">
              <img
                onClick={() => setProfileOpen(!profileOpen)}
                src={user?.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full border cursor-pointer transition"
                style={{ borderColor: colors[theme].border }}
              />
              {profileOpen && (
                <div
                  style={{
                    backgroundColor: colors[theme].bgCard,
                    color: colors[theme].textPrimary,
                  }}
                  className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg transition-all"
                >
                  <Link
                    to="/dashboard/my-profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm border-b"
                  >
                    <img
                      src={user?.photoURL}
                      className="w-8 h-8 rounded-full"
                      alt=""
                    />
                    <span>{user.displayName || "User"}</span>
                  </Link>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-sm"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={logOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Login Button */}
              <NavLink to="/login">
                <button
                  style={{
                    backgroundColor: colors[theme].primary,
                    color: "#fff",
                  }}
                  className="btn-outline px-5 py-2 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
                >
                  Login
                </button>
              </NavLink>

              {/* Register Button */}
              <NavLink to="/register" className="hidden md:block">
                <button
                  style={{
                    backgroundColor:
                      theme === "dark"
                        ? colors.dark.primary
                        : colors.light.primary,
                    color: "#fff",
                  }}
                  className="px-5 py-2 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
                >
                  Register
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              style={{
                backgroundColor:
                  theme === "dark"
                    ? "rgba(0,0,0,0.7)"
                    : "rgba(200,200,200,0.7)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
            />
            <motion.ul
              className="menu menu-vertical gap-6 p-6 shadow-lg rounded-r-2xl fixed top-20 left-0 h-full w-64 z-50"
              style={{
                backgroundColor: colors[theme].bgCard,
                color: colors[theme].textPrimary,
              }}
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
