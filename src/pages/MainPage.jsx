import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, Outlet, useMatch, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { setUser } from "../reducers/userSlice";

const MainPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const match = useMatch("/main");

  useEffect(() => {
    // navigate("home");
    if (match) {
      navigate("overview");
    }
  }, []);

  const handleSignOut = () => {
    console.log("setting user");
    dispatch(setUser(null));
    signOut(auth);
    navigate("/");
  };

  return (
    <div className="bg-[#FFFCF9] grid grid-cols-[18rem_1fr] h-screen overflow-hidden">
      <Sidebar />
      <Outlet />
      <DropdownMenu className="">
        <DropdownMenuTrigger className="absolute top-4 right-6 focus-visible:outline-none">
          <img
            src={user.profileUrl}
            className="w-10 p-1 rounded-full bg-[#818CF8]"
          ></img>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-4 mr-6 w-56 font-semibold ">
          <DropdownMenuLabel className="text-base font-bold">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="" />
          <div className="hover:bg-orange-100 transition-colors duration-300">
            <DropdownMenuItem className="text-base ">
              <Link to={"/#hero"}>Homepage</Link>
            </DropdownMenuItem>
          </div>

          <div className="hover:bg-orange-100 transition-colors duration-300">
            <DropdownMenuItem className="text-base">
              <Link to={"/#faq"}>FAQ</Link>
            </DropdownMenuItem>
          </div>
          <div className="hover:bg-orange-100 transition-colors duration-300">
            <DropdownMenuItem className="text-base mb-2">
              <Link to={"/#aboutus"}>About us</Link>
            </DropdownMenuItem>
          </div>
          <DropdownMenuSeparator className="" />
          <div className="hover:bg-orange-100 transition-colors duration-300">
            <DropdownMenuItem className="text-base">
              <button onClick={handleSignOut}>Logout</button>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MainPage;
