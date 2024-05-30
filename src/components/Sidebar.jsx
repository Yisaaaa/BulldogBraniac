import React from "react";
import logo from "../assets/logo.svg";
import { Link, useMatch } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const matchHome = useMatch("/main/home");
  const matchMyQuizzes = useMatch("/main/my-quizzes");
  const matchPublicQuizzes = useMatch("/main/public-quizzes");
  const matchProfile = useMatch("/main/profile");

  return (
    <div className="h-screen py-6 border-r-[2px] border-r-[#ddd] ">
      <header className="px-6 mb-6 ">
        <img className="w-20" src={logo} alt="BulldogBraniac logo" />
        <p className="font-semibold text-3xl">BulldogBraniac</p>
      </header>

      <nav className="mb-6">
        <ul className="flex flex-col">
          <li
            className={`pl-6 py-1 font-semibold ${
              matchMyQuizzes && "bg-[#FFEDD5]"
            }`}
          >
            <Link
              to={"my-quizzes"}
              className={` hover:text-primary duration-300 text-xl
                ${matchMyQuizzes ? "bg-[#FFEDD5] text-primary" : ""}
              `}
            >
              My Quizzes
            </Link>
          </li>
          <li
            className={`pl-6 py-1 font-semibold ${
              matchPublicQuizzes && "bg-[#FFEDD5]"
            }`}
          >
            <Link
              to={"public-quizzes"}
              className={` hover:text-primary duration-300 text-xl
                ${matchPublicQuizzes ? "bg-[#FFEDD5] text-primary" : ""}
              `}
            >
              Public Quizzes
            </Link>
          </li>
          <li
            className={`pl-6 py-1 font-semibold ${matchHome && "bg-[#FFEDD5]"}`}
          >
            <Link
              to={"home"}
              className={` hover:text-primary duration-300 text-xl
                ${matchHome ? "bg-[#FFEDD5] text-primary" : ""}
              `}
            >
              Home
            </Link>
          </li>
          <li
            className={`pl-6 py-1 font-semibold ${
              matchProfile && "bg-[#FFEDD5]"
            }`}
          >
            <Link
              className={` hover:text-primary duration-300 text-xl
                ${matchProfile ? "bg-[#FFEDD5] text-primary" : ""}
              `}
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex px-6">
        <button className="bg-primary rounded-full mx-auto w-full py-1 font-semibold text-white hover:bg-[#c2410c] transition-colors duration-300 text-lg">
          Create quiz
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
