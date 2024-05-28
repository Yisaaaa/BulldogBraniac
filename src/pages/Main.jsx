import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Main = () => {
  const [currentlySelected, setCurrentlySelected] = useState("home");
  return (
    <div className="bg-[#FFFAF5]">
      <Sidebar
        currentlySelected={currentlySelected}
        setCurrentlySelected={setCurrentlySelected}
      />
    </div>
  );
};

export default Main;
