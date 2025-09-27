import React from "react";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import ProcessFlow from "../components/ProcessFlow";
import Features from "../components/Features";
import AboutUs from "../components/AboutUs";

function Home() {
  return (
    <div>
      <Hero />
      <ProcessFlow />
      <HowItWorks />
      <AboutUs />
      <Features />
    </div>
  );
}

export default Home;
