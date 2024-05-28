import React, { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import { Routes, Route } from "react-router-dom";

const App = () => {
  useEffect(() => {}, []);

  return (
    <div className="">
      <Routes>
        {/* <LandingPage /> */}
        {/* <Signin></Signin> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="*"
          element={
            <div className="h-screen w-screen flex items-center justify-center">
              <h1 className="text-5xl">404 Not Found</h1>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
