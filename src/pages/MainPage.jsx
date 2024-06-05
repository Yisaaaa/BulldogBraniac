import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useMatch, useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const match = useMatch("/main");

  useEffect(() => {
    // navigate("home");
    if (match) {
      navigate("home");
    }
  }, []);

  return (
    <div className="bg-[#FFFCF9] grid grid-cols-[18rem_1fr] h-screen overflow-hidden">
      <Sidebar />
      <Outlet />
      <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-red-500"></div>
    </div>
  );
};

export default MainPage;
