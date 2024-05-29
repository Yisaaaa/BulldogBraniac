import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const MainPage = () => {
  const [currentlySelected, setCurrentlySelected] = useState("home");
  return (
    <div className="bg-[#FFF7ED]">
      <Sidebar
        currentlySelected={currentlySelected}
        setCurrentlySelected={setCurrentlySelected}
      />
    </div>
  );
};

export default MainPage;
