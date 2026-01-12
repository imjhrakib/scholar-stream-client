import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import {
  AiOutlineAppstore,
  AiOutlineBarChart,
  AiOutlineBook,
  AiOutlineDashboard,
  AiOutlineHome,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import {
  FaClipboardList,
  FaMoon,
  FaStar,
  FaSun,
  FaUsers,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { VscSettings } from "react-icons/vsc";
import { MdRateReview } from "react-icons/md";
import useTheme from "../hooks/useTheme";

const DashboardLayout = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const { user } = useAuth();
  const { role } = useRole();
  const [clickNav, setClickNav] = useState(false);

  return (
    <div
      className="drawer lg:drawer-open"
      style={{
        backgroundColor: colors[theme].bg,
        color: colors[theme].textPrimary,
      }}
    >
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav
          className="navbar w-full z-50 fixed"
          style={{
            backgroundColor: colors[theme].bgCard,
            color: colors[theme].textPrimary,
            borderBottom: `1px solid ${colors[theme].border}`,
          }}
        >
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
            onClick={() => setClickNav(!clickNav)}
            style={{ color: colors[theme].textPrimary }}
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>

          <div className="px-4 text-lg font-semibold flex items-center gap-4">
            <span className="mr-5" style={{ color: colors[theme].textPrimary }}>
              ScholarStream Control Panel
            </span>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                borderColor: colors[theme].border,
                backgroundColor: colors[theme].bgCard,
              }}
              className="p-2 rounded-full border transition-all"
              title={
                theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
            >
              {theme === "dark" ? (
                <FaSun style={{ color: colors[theme].primary }} />
              ) : (
                <FaMoon style={{ color: colors[theme].textPrimary }} />
              )}
            </button>
          </div>
        </nav>

        {/* Page content */}
        <div
          className="p-4 mt-14"
          style={{
            backgroundColor: colors[theme].bg,
            color: colors[theme].textPrimary,
          }}
        >
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className="drawer-side is-drawer-close:overflow-visible"
        style={{
          backgroundColor: colors[theme].bgCard,
          color: colors[theme].textPrimary,
        }}
      >
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start">
          <ul className="menu w-full grow font-semibold">
            {/* My Profile */}
            <li>
              <Link
                to={"/dashboard/my-profile"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={user?.photoURL}
                    alt="User"
                    className={`rounded-full border cursor-pointer transition-all duration-300 ${
                      clickNav ? "w-10 h-10" : "w-8 h-8"
                    }`}
                    style={{ borderColor: colors[theme].primary }}
                  />
                  {clickNav && (
                    <span
                      className="text-xl font-semibold transition-all duration-300"
                      style={{ color: colors[theme].textPrimary }}
                    >
                      {user?.displayName}
                    </span>
                  )}
                </div>
              </Link>
            </li>

            {/* Links */}
            <li>
              <Link to={"/"}>
                <AiOutlineHome
                  size={24}
                  style={{ color: colors[theme].primary }}
                />
                <span className="is-drawer-close:hidden">Home</span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard"}>
                <AiOutlineDashboard
                  size={24}
                  style={{ color: colors[theme].primary }}
                />
                <span className="is-drawer-close:hidden">Dashboard Home</span>
              </Link>
            </li>

            {/* Admin Links */}
            {role === "admin" && (
              <>
                <li>
                  <Link to={"/dashboard/add-scholarship"}>
                    <AiOutlinePlusCircle
                      size={24}
                      style={{ color: colors[theme].success }}
                    />
                    <span className="is-drawer-close:hidden">
                      Add Scholarship
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={"/dashboard/manage-scholarship"}>
                    <AiOutlineBook
                      size={24}
                      style={{ color: colors[theme].warning }}
                    />
                    <span className="is-drawer-close:hidden">
                      Manage Scholarship
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={"/dashboard/manage-users"}>
                    <FaUsers size={24} style={{ color: colors[theme].info }} />
                    <span className="is-drawer-close:hidden">Manage User</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/dashboard/analytics"}>
                    <AiOutlineBarChart
                      size={24}
                      style={{ color: colors[theme].danger }}
                    />
                    <span className="is-drawer-close:hidden">Analytics</span>
                  </Link>
                </li>
              </>
            )}

            {/* Student Links */}
            {role === "student" && (
              <>
                <li>
                  <Link to={"/dashboard/my-application"}>
                    <FaClipboardList
                      size={24}
                      style={{ color: colors[theme].primary }}
                    />
                    <span className="is-drawer-close:hidden">
                      My Applications
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={"/dashboard/my-reviews"}>
                    <FaStar
                      size={24}
                      style={{ color: colors[theme].primary }}
                    />
                    <span className="is-drawer-close:hidden">My Reviews</span>
                  </Link>
                </li>
              </>
            )}

            {/* Moderator Links */}
            {role === "moderator" && (
              <>
                <li>
                  <Link to={"/dashboard/manage-application"}>
                    <AiOutlineAppstore
                      size={24}
                      style={{ color: colors[theme].primary }}
                    />
                    <span className="is-drawer-close:hidden">
                      Manage Application
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={"/dashboard/manage-reviews"}>
                    <MdRateReview
                      size={24}
                      style={{ color: colors[theme].primary }}
                    />
                    <span className="is-drawer-close:hidden">
                      Manage Reviews
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* Settings */}
            <li>
              <Link>
                <VscSettings
                  size={24}
                  style={{ color: colors[theme].textPrimary }}
                />
                <span className="is-drawer-close:hidden">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
