import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const MainPage = () => {
  const [currentlySelected, setCurrentlySelected] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    navigate("home");
  }, []);

  return (
    <div className="bg-[#FFF7ED] grid grid-cols-[18rem_1fr]">
      <Sidebar
        currentlySelected={currentlySelected}
        setCurrentlySelected={setCurrentlySelected}
      />
      <Outlet />
    </div>
  );
};

export default MainPage;
