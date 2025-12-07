import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import PrimaryBtn from "../ui/PrimaryBtn";
import SecondaryBtn from "../ui/SecondaryBtn";
import { NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const links = (
    <>
      <li className="font-semibold">
        <NavLink>Home</NavLink>
      </li>
      <li className="font-semibold">
        <NavLink>All Scholarships</NavLink>
      </li>
      {user && <></>}
    </>
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <img src={logo} width={40} height={20} alt="" />
          <p className="ml-2.5">Scholar Stream</p>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex gap-2.5">
        {user ? (
          <>
            <div ref={dropdownRef} className="relative">
              {/* Profile Image */}
              <img
                onClick={() => setOpen(!open)}
                src={user?.photoURL}
                className="w-8 h-8 rounded-full border border-gray-600 p-0.5 cursor-pointer
              transition duration-300 hover:shadow-xl hover:ring-2 hover:ring-blue-500"
                alt="User"
              />

              {/* Dropdown Menu */}
              {open && (
                <div className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg z-50">
                  <p className="px-4 py-2 text-sm text-gray-700 border-b">
                    {user?.displayName || "User"}
                  </p>
                  <NavLink
                    to="/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={logOut}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              {" "}
              <PrimaryBtn btnText={"Login"}></PrimaryBtn>
            </NavLink>

            <div className="hidden md:block">
              <NavLink to={"/register"}>
                <SecondaryBtn btnText={"Register"}></SecondaryBtn>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
