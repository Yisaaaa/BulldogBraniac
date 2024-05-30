import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import googleLogo from "../assets/google.svg";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { VscLoading } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Signin = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/main");
    }
  }, []);

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sign in");
    setIsLoading(true);
    try {
      const userCreds = await signInWithEmailAndPassword(
        auth,
        userCredentials.email,
        userCredentials.password
      );

      // console.log(userCreds);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    console.log("Google sign in");
  };

  return (
    <div className="flex items-center justify-center bg-[#FED7AA] w-screen h-screen">
      <main className="bg-white rounded-xl py-6 px-4">
        <header className="flex gap-24 items-center mb-12">
          <div className="flex gap-2 items-center">
            <img src={logo} alt="image of a brainy bulldog with glasses" />
            <p className="font-semibold text-2xl">BulldogBraniac</p>
          </div>
          <Link
            to={"/signup"}
            className="text-primary text-lg font-semibold hover:text-[#c2410c] transition-colors duration-200"
            href="#"
          >
            Sign up
          </Link>
        </header>

        <div>
          <p className="text-center text-2xl font-semibold mb-10">Sign in</p>
          <div className="px-10">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-slate-500 font-semibold" htmlFor="email">
                  Email
                </label>
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
              <div className="flex flex-col gap-2 mb-3">
                <label
                  className="text-slate-500 font-semibold"
                  htmlFor="password"
                >
                  Password
                </label>
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
                <span className="flex self-end gap-2 text-sm text-slate-500 font-medium">
                  <input
                    type="checkbox"
                    onChange={(e) => setPasswordVisible((prev) => !prev)}
                    id="showPassword"
                  />
                  <label htmlFor="showPassword">Show password</label>
                </span>
              </div>
              <div className="flex flex-col gap-8 mb-14">
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
                <button
                  className="rounded-full shadow-[0_0_0_3px_#cccccc_inset] text-gray-600 font-semibold text-md py-2 flex justify-center items-center gap-4 hover:bg-[#ccc] transition-colors duration-300"
                  onClick={handleGoogleSignIn}
                >
                  <img src={googleLogo} alt="google logo" className="w-6" />
                  <span>Sign in with Google</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signin;
