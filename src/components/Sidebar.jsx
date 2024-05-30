import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Sidebar = ({ currentlySelected, setCurrentlySelected }) => {
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
              currentlySelected === "my quizzes" && "bg-[#FFEDD5]"
            }`}
          >
            <Link
              to={"my-quizzes"}
              onClick={() => setCurrentlySelected("my quizzes")}
              className={` hover:text-primary duration-300 text-xl
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
            className={`pl-6 py-1 font-semibold ${
              currentlySelected === "public quizzes" && "bg-[#FFEDD5]"
            }`}
          >
            <Link
              to={"public-quizzes"}
              onClick={() => setCurrentlySelected("public quizzes")}
              className={` hover:text-primary duration-300 text-xl
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
            className={`pl-6 py-1 font-semibold ${
              currentlySelected === "home" && "bg-[#FFEDD5]"
            }`}
          >
            <Link
              to={"home"}
              onClick={() => setCurrentlySelected("home")}
              className={` hover:text-primary duration-300 text-xl
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
            className={`pl-6 py-1 font-semibold ${
              currentlySelected === "profile" && "bg-[#FFEDD5]"
            }`}
          >
            <Link
              onClick={() => setCurrentlySelected("profile")}
              className={` hover:text-primary duration-300 text-xl
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
      <div className="flex px-6">
        <button className="bg-primary rounded-full mx-auto w-full py-1 font-semibold text-white hover:bg-[#c2410c] transition-colors duration-300 text-lg">
          Create quiz
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
