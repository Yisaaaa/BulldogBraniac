import React, { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { setUser } from "./reducers/userSlice";
import { useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import Main from "./pages/Main";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    signOut(auth);

    const subscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("user logged in");
        const userRef = doc(db, `users/${user.uid}`);
        user = await getDoc(userRef);
        console.log(user.data());
        dispatch(setUser(user.data()));
      } else {
        console.log("no user");
      }

      return subscribe;
    });
  }, []);

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Main />} />
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
