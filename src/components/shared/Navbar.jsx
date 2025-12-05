import React from "react";
import logo from "../../assets/logo.png";
import PrimaryBtn from "../ui/PrimaryBtn";
import SecondaryBtn from "../ui/SecondaryBtn";
const Navbar = () => {
  const links = (
    <>
      <li>
        <a>Home</a>
      </li>
      <li>
        <a>All Scholarships</a>
      </li>
    </>
  );
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
        <PrimaryBtn btnText={"Login"}></PrimaryBtn>
        <SecondaryBtn btnText={"Register"}></SecondaryBtn>
      </div>
    </div>
  );
};

export default Navbar;
