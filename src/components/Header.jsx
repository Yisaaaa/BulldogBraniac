import React from "react";
import logo from "../assets/logo.svg";
import PrimaryLinkButton from "./PrimaryLinkButton";

const Header = () => {
  return (
    <header className="grid grid-cols-3 items-center fixed w-full left-0 top-0 px-60 py-4 bg-[#fff7ed] z-10">
      <div className="flex items-center gap-4">
        <img src={logo} alt="image of a brainy bulldog" />
        <p className="text-3xl font-medium">BulldogBraniac</p>
      </div>

      <div className="flex gap-6 font-medium justify-self-center text-lg">
        <a
          className="hover:text-primary transition-colors duration-150"
          href="#hero"
        >
          Home
        </a>
        <a
          className="hover:text-primary transition-colors duration-150"
          href="#faq"
        >
          FAQs
        </a>
        <a
          className="hover:text-primary transition-colors duration-150"
          href=""
        >
          About us
        </a>
      </div>

      <div className="justify-self-end">
        <PrimaryLinkButton href={""} text={"Get started"} />
      </div>
    </header>
  );
};

export default Header;
