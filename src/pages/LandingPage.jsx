import React from "react";
import logo from "../assets/logo.svg";
import hero from "../assets/hero_img.svg";
import PrimaryLinkButton from "../components/PrimaryLinkButton";
import SecondaryLinkButton from "../components/SecondaryLinkButton";

const LandingPage = () => {
  return (
    <div
      className={`bg-[url("/src/assets/hero_bg.svg")] bg-no-repeat bg-bottom bg-cover h-screen`}
    >
      <div className="max-w-screen-xl mx-auto py-5 h-full">
        <header className="grid grid-cols-3 items-center mb-20">
          <div className="flex items-center gap-3">
            <img src={logo} alt="image of a brainy bulldog" />
            <p className="text-3xl font-medium">BulldogBraniac</p>
          </div>

          <div className="flex gap-3 font-medium justify-self-center text-lg">
            <a
              className="hover:text-primary transition-colors duration-150"
              href=""
            >
              Home
            </a>
            <a
              className="hover:text-primary transition-colors duration-150"
              href=""
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

        <main>
          <div
            className={`grid grid-cols-2 justify-content-end justify-items-ends mx-18 gap-20`}
          >
            <div className="pt-20">
              <h1 className="text-7xl font-semibold leading-tight mb-4">
                Study <span className="text-primary">smarter</span>, <br />
                not harder
              </h1>
              <p className="text-xl leading-relaxed mb-12 pr-20">
                Our interactive quiz reviews make learning easy and effective.
                Test your knowledge, see your progress, and excel in your
                studies.
              </p>
              <div className="flex gap-2">
                <PrimaryLinkButton href={""} text={"Study now"} />
                <SecondaryLinkButton href={""} text={"Learn more"} />
              </div>
            </div>
            <img
              className="w-full just"
              src={hero}
              alt="image of a boy with a certificate between his hands"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
