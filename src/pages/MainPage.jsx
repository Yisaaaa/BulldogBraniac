import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useMatch, useNavigate } from "react-router-dom";

const MainPage = () => {
  const [currentlySelected, setCurrentlySelected] = useState("home");
  const navigate = useNavigate();

  const match = useMatch("/main");

  useEffect(() => {
    // navigate("home");
    if (match) {
      navigate("home");
    }
  }, []);

  return (
    <div className="bg-[#FFF7ED] grid grid-cols-[18rem_1fr] h-screen overflow-hidden">
      <Sidebar
        currentlySelected={currentlySelected}
        setCurrentlySelected={setCurrentlySelected}
      />
      <Outlet />
      <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-red-500"></div>
    </div>
  );
};

export default MainPage;
