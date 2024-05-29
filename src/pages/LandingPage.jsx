import React from "react";
import HeroSection from "../components/HeroSection";
import Header from "../components/Header";
import FAQSection from "../components/FAQSection";
import AboutUs from "../components/AboutUs";

const LandingPage = () => {
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
