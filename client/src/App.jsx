import React from "react";
import { Routes, Route } from "react-router-dom";
import HowItWorks from "./components/HowItWorks";
import ProcessFlow from "./components/ProcessFlow";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import GettingStarted from "./components/Features";
import Register from "./components/Register";
import DashboardNavbar from "./Dashboard/DashboardNavbar";
import DashboardWelcome from "./Dashboard/DashboardWelcome";
import BrowseSkills from "./Dashboard/BrowseSkills";
import Dashboard from "./Dashboard/Dashobard";
import MyMatches from "./Dashboard/MyMatches";
import Messages from "./Dashboard/Message";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/features" element={<GettingStarted />} />
        <Route path="/process-flow" element={<ProcessFlow />} />
        <Route path="/about-Us" element={<AboutUs />} />
        <Route path="/Sign-In" element={<Register />} />
        <Route path="/dashboard-nav" element={<DashboardNavbar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard-wel" element={<DashboardWelcome />} />
        <Route path="/BrowseSkills" element={<BrowseSkills />} />
        <Route path="/MyMatches" element={<MyMatches />} />
        <Route path="/msg" element={<Messages />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
