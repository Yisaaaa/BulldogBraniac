import React, { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import Signin from "./pages/Signin";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useMatch,
} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { setUser } from "./reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Loading from "./components/Loading";
import MyQuizzesPage from "./pages/MyQuizzesPage";

const App = () => {
  const matchLandingPage = useMatch("/");
  const [isLoading, setIsLoading] = useState(!matchLandingPage);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const matchSignInUrl = useMatch("/signin");

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("user logged in");
        const userRef = doc(db, `users/${user.uid}`);
        user = JSON.stringify((await getDoc(userRef)).data());
        dispatch(setUser(JSON.parse(user)));

        if (matchSignInUrl) {
          navigate("/main");
        }

        setIsLoading(false);
      } else {
        console.log("no user");
        setIsLoading(false);
      }

      setIsLoading(false);

      return subscribe;
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/main/*"
          element={user ? <MainPage /> : <Navigate replace to="/signin" />}
        >
          <Route path="home" element={<HomePage />} />
          <Route path="my-quizzes" element={<MyQuizzesPage />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
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
