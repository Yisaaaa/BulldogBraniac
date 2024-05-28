import React from "react";
import PrimaryLinkButton from "./PrimaryLinkButton";
import SecondaryLinkButton from "./SecondaryLinkButton";
import hero from "../assets/hero_img.svg";
import { FaArrowDownLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div
      id="hero"
      className={`bg-[url("/src/assets/hero_bg.svg")] bg-no-repeat bg-bottom bg-cover h-screen `}
    >
      <div className="max-w-screen-xl mx-auto py-5 h-full relative">
        <main
          className={`grid grid-cols-2 justify-content-end justify-items-ends mx-18 gap-20 mt-28 mb-80`}
        >
          <div className="pt-20">
            <h1 className="text-6xl font-semibold leading-tight mb-4">
              Study <span className="text-primary">smarter</span>, <br />
              not harder
            </h1>
            <p className="text-xl leading-relaxed mb-12 pr-20">
              Our interactive quiz reviews make learning easy and effective.
              Test your knowledge, see your progress, and excel in your studies.
            </p>
            <div className="flex gap-4 items-center">
              <PrimaryLinkButton to={"/signin"} href={""}>
                Study now
              </PrimaryLinkButton>
              <SecondaryLinkButton href={"#faq"}>
                <span className="flex items-center gap-2">
                  Learn more <FaArrowDownLong />
                </span>
              </SecondaryLinkButton>
            </div>
          </div>
          <img
            className="w-full just"
            src={hero}
            alt="image of a boy with a certificate between his hands"
          />
        </main>
      </div>
    </div>
  );
};

export default HeroSection;
