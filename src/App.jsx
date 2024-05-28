import React, { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { setUser } from "./reducers/userSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    signOut(auth);

    const subscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user logged in");
        dispatch(setUser(user));
      } else {
        console.log("no user");
      }

      return subscribe;
    });
  }, []);

  return (
    <div className="">
      <Routes>
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
