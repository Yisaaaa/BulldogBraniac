import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import Header from "../components/Header";
import FAQSection from "../components/FAQSection";
import AboutUs from "../components/AboutUs";
import { useLocation } from "react-router-dom";

const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div>
      <Header />
      <HeroSection />
      <FAQSection />
      <AboutUs />
    </div>
  );
};

export default LandingPage;
