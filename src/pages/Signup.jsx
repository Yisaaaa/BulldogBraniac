import React, { useState } from "react";
import logo from "../assets/logo.svg";
import googleLogo from "../assets/google.svg"

const Signup = () => {
  return (
    <div className="flex items-center justify-center bg-[#FED7AA] w-screen h-screen overflow-x-hidden">
        <div className="bg-white rounded-xl py-6 px-4 max-w-395 max-h-500">
        <header className="flex gap-24 items-center mb-4">
          <div className="flex items-center gap-1">
            <img src={logo} alt="image of a brainy bulldog with glasses" />
            <p className="font-semibold text-2xl">BulldogBraniac</p>
          </div>
          <a href="#" className="text-primary text-lg font-semibold hover:text-[#c2410c] transition-colors duration-200">Sign Up</a>
        </header>

        <p className="text-center text-2xl font-semibold mb-4">Sign up</p>
        <div className="px-10">
          <form className="flex flex-col gap-5" action="">
            <div className="flex flex-col gap-2">
            <label htmlFor="email">
              Email
            </label>

            <input className="border-2 border-slate-300 rounded-md p-2 font-medium" type="text" placeholder="youremail@gmail.com"/>
            </div>

            <div className="flex flex-col gap-2">
            <label htmlFor="username">
              Sign up
            </label>

            <input className="border-2 border-slate-300 rounded-md p-2 font-medium" type="text" placeholder="username"/>
            </div>

            <div className="flex flex-col gap-2">
            <label htmlFor="password">
              Password
            </label>

            <input className="border-2 border-slate-300 rounded-md p-2 font-medium" 
            type="password"
            placeholder="password"
            />
            </div>
            <span className="flex self-end gap-2 text-sm text-slate-500 font-medium"  >
              <input type="checkbox" name="showPassword" id="showPassword" />
              <label htmlFor="showPassword">Show password</label>
            </span>

            <div className="flex flex-col gap-8 mb-10">
                <button
                  className="rounded-full bg-primary text-white font-semibold text-md py-2 hover:bg-[#c2410c] transition-colors duration-200"
                  type="submit"
                > Continue
                </button>
                <p className="flex gap-5 items-center text-sm font-medium text-gray-500 self-center">
                  <span className="h-1 w-20 bg-neutral-400 rounded"></span>Or
                  continue with{" "}
                  <span className="h-1 w-20 bg-neutral-400 rounded"></span>
                </p>
                <button
                  className="rounded-full shadow-[0_0_0_3px_#cccccc_inset] text-gray-600 font-semibold text-md py-2 flex justify-center items-center gap-4 hover:bg-[#ccc] transition-colors duration-300"
                >
                  <img src={googleLogo} alt="google logo" className="w-6" />
                  <span>Sign in with Google</span>
                </button>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup