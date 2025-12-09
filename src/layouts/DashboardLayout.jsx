import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import {
  AiOutlineBarChart,
  AiOutlineBook,
  AiOutlineDashboard,
  AiOutlineHome,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { VscSettings } from "react-icons/vsc";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const [clickNav, setClickNav] = useState(false);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 text-indigo-700">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
            onClick={() => {
              setClickNav(!clickNav);
            }}
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

          <div className="px-4 text-lg font-semibold">
            {role === "admin" && <span>ScholarStream Admin Panel</span>}
            {role === "moderator" && <span>ScholarStream Admin Panel</span>}
            {role === "user" && <span>ScholarStream Admin Panel</span>}
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-18 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow text-slate-800 font-semibold">
            {/* My Profile*/}
            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
              >
                {/* profile */}
                <div className="flex items-center gap-2">
                  <img
                    src={user?.photoURL}
                    alt="User"
                    className={`rounded-full border border-gray-300 cursor-pointer transition-all duration-300
                  ${clickNav ? "w-10 h-10" : "w-8 h-8"}`}
                  />
                  {clickNav && (
                    <span className="text-xl font-semibold transition-all duration-300">
                      {user?.displayName}
                    </span>
                  )}
                </div>
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <AiOutlineHome
                  size={24}
                  className="text-sky-600"
                ></AiOutlineHome>
                <span className="is-drawer-close:hidden">Home</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  setDrawerState(false);
                }}
                to={"/dashboard"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard Home"
              >
                {/* Home icon */}
                <AiOutlineDashboard
                  size={24}
                  className="text-indigo-600"
                ></AiOutlineDashboard>
                <span className="is-drawer-close:hidden">Dashboard Home</span>
              </Link>
            </li>
            {/* for admin */}
            {role === "admin" && (
              <>
                <li>
                  <Link
                    to={"/dashboard/add-scholarship"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Scholarship"
                  >
                    <AiOutlinePlusCircle
                      className="text-emerald-600"
                      size={24}
                    />
                    <span className="is-drawer-close:hidden">
                      Add Scholarship
                    </span>
                  </Link>
                </li>
                {/* manage scholarship */}
                <li>
                  <Link
                    to={"/dashboard/manage-scholarship"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Scholarship"
                  >
                    <AiOutlineBook size={24} className="text-amber-600" />
                    <span className="is-drawer-close:hidden">
                      Manage Scholarship
                    </span>
                  </Link>
                </li>
                {/* manage users */}
                <li>
                  <Link
                    to={"/dashboard/manage-users"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage User"
                  >
                    <FaUsers size={24} className="text-purple-600" />
                    <span className="is-drawer-close:hidden">Manage User</span>
                  </Link>
                </li>
                {/* analytics */}
                <li>
                  <Link
                    to={"/dashboard/analytics"}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Analytics"
                  >
                    <AiOutlineBarChart size={24} className="text-rose-600" />
                    <span className="is-drawer-close:hidden">Analytics</span>
                  </Link>
                </li>
              </>
            )}

            {/* setting */}
            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <VscSettings size={24} className="text-gray-600" />
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
