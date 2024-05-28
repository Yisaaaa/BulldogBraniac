import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Sidebar = ({ currentlySelected, setCurrentlySelected }) => {
  return (
    <div className="w-60 h-screen py-6 border-r-[2px] border-r-[#ddd] ">
      <header className="px-4 mb-12">
        <img className="w-14" src={logo} alt="BulldogBraniac logo" />
        <p className="font-semibold text-2xl">BulldogBraniac</p>
      </header>

      <nav className="mb-6">
        <ul className="flex flex-col gap-1">
          <li
            className={`pl-4 py-1 font-semibold ${
              currentlySelected === "my quizzes" && "bg-[#FFEDD5]"
            }`}
          >
            <Link
              onClick={() => setCurrentlySelected("my quizzes")}
              className={` hover:text-primary duration-300 
                ${
                  currentlySelected === "my quizzes"
                    ? "bg-[#FFEDD5] text-primary"
                    : ""
                }
              `}
            >
              My Quizzes
            </Link>
          </li>
          <li
            className={`pl-4 py-1 font-semibold ${
              currentlySelected === "public quizzes" && "bg-[#FFEDD5]"
            }`}
          >
            <Link
              onClick={() => setCurrentlySelected("public quizzes")}
              className={` hover:text-primary duration-300 
                ${
                  currentlySelected === "public quizzes"
                    ? "bg-[#FFEDD5] text-primary"
                    : ""
                }
              `}
            >
              Public Quizzes
            </Link>
          </li>
          <li
            className={`pl-4 py-1 font-semibold ${
              currentlySelected === "home" && "bg-[#FFEDD5]"
            }`}
          >
            <Link
              onClick={() => setCurrentlySelected("home")}
              className={` hover:text-primary duration-300 
                ${
                  currentlySelected === "home"
                    ? "bg-[#FFEDD5] text-primary"
                    : ""
                }
              `}
            >
              Home
            </Link>
          </li>
          <li
            className={`pl-4 py-1 font-semibold ${
              currentlySelected === "profile" && "bg-[#FFEDD5]"
            }`}
          >
            <Link
              onClick={() => setCurrentlySelected("profile")}
              className={` hover:text-primary duration-300 
                ${
                  currentlySelected === "profile"
                    ? "bg-[#FFEDD5] text-primary"
                    : ""
                }
              `}
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex px-4">
        <button className="bg-primary rounded-full mx-auto w-full py-1 font-semibold text-white hover:bg-[#c2410c] transition-colors duration-300">
          Create quiz
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
