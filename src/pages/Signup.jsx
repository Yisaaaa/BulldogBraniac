import React, { useState } from "react";
import logo from "../assets/logo.svg";
import googleLogo from "../assets/google.svg";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import profileUrls from "../profileUrls";
import { VscLoading } from "react-icons/vsc";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUpWithEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCreds = await createUserWithEmailAndPassword(
        auth,
        userCredentials.email,
        userCredentials.password
      );

      console.log(userCreds.user.uid);

      const randomProfile =
        profileUrls[Math.floor(Math.random() * profileUrls.length)];

      const profileUrl = `https://ssl.gstatic.com/docs/common/profile/${randomProfile}_lg.png`;

      const userData = {
        id: userCreds.user.uid,
        username: userCredentials.username,
        email: userCredentials.email,
        profileUrl,
        favSubject: "",
        myQuizzes: [],
        quizzesTaken: [],
        recentQuizzes: [],
      };
      await setDoc(doc(db, `users/${userCreds.user.uid}`), userData);

      navigate("/signin");
    } catch (e) {
      console.log("Failed to signup user");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#FED7AA] w-screen h-screen overflow-x-hidden">
      <div className="bg-white rounded-xl py-6 px-4 max-w-395 max-h-500">
        <header className="flex gap-24 items-center mb-4">
          <div className="flex items-center gap-1">
            <img src={logo} alt="image of a brainy bulldog with glasses" />
            <p className="font-semibold text-2xl">BulldogBraniac</p>
          </div>
          <Link
            to={"/signin"}
            href="#"
            className="text-primary text-lg font-semibold hover:text-[#c2410c] transition-colors duration-200"
          >
            Sign In
          </Link>
        </header>

        <p className="text-center text-2xl font-semibold mb-4">Sign up</p>
        <div className="px-10">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSignUpWithEmail}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>

              <input
                className="border-2 border-slate-300 rounded-md p-2 font-medium"
                type="text"
                id="email"
                placeholder="youremail@gmail.com"
                value={userCredentials.email}
                onChange={(e) => {
                  setUserCredentials((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username</label>

              <input
                className="border-2 border-slate-300 rounded-md p-2 font-medium"
                type="text"
                id="username"
                placeholder="username"
                value={userCredentials.username}
                onChange={(e) => {
                  setUserCredentials((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>

              <input
                className="border-2 border-slate-300 rounded-md p-2 font-medium"
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="password"
                value={userCredentials.password}
                onChange={(e) => {
                  setUserCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
            </div>
            <span className="flex self-end gap-2 text-sm text-slate-500 font-medium">
              <input
                type="checkbox"
                onChange={(e) => setPasswordVisible((prev) => !prev)}
                id="showPassword"
              />
              <label htmlFor="showPassword">Show password</label>
            </span>

            <div className="flex flex-col gap-8 mb-10">
              <button
                className="rounded-full bg-primary text-white font-semibold text-md py-2 hover:bg-[#c2410c] transition-colors duration-200"
                type="submit"
              >
                {isLoading ? (
                  <div className="flex gap-2 justify-center items-center">
                    <VscLoading className="animate-spin text-2xl" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Continue"
                )}
              </button>
              <p className="flex gap-5 items-center text-sm font-medium text-gray-500 self-center">
                <span className="h-1 w-20 bg-neutral-400 rounded"></span>Or
                continue with{" "}
                <span className="h-1 w-20 bg-neutral-400 rounded"></span>
              </p>
              <button className="rounded-full shadow-[0_0_0_3px_#cccccc_inset] text-gray-600 font-semibold text-md py-2 flex justify-center items-center gap-4 hover:bg-[#ccc] transition-colors duration-300">
                <img src={googleLogo} alt="google logo" className="w-6" />
                <span>Sign in with Google</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
