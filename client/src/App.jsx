// client/src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";

// Import Layouts (Frames)
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";


// Import Pages (Pictures)
import Home from "./pages/Home";
import AboutUs from "./components/AboutUs";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import ProcessFlow from "./components/ProcessFlow";
import DashboardWelcome from "./Dashboard/DashboardWelcome";
import BrowseSkills from "./Dashboard/BrowseSkills";
import MyMatches from "./Dashboard/MyMatches";
import Messages from "./Dashboard/Message";
import Achievements from "./Dashboard/Achievements";
import Schedule from "./Dashboard/Schedule";
import ProfilePage from './pages/ProfilePage';
import SwapDetailsPage from './Dashboard/SwapDetailsPage';
// ... other pages

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/process-flow" element={<ProcessFlow />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardWelcome />} />
          <Route path="browse-skills" element={<BrowseSkills />} />
          <Route path="my-matches" element={<MyMatches />} />
           <Route path="profile" element={<ProfilePage />} /> 
          <Route path="messages" element={<Messages />} />
          <Route path="swaps/:swapId" element={<SwapDetailsPage />} />
          <Route path="Achivements" element={<Achievements />} />
          <Route path="schedule" element={<Schedule />} />
        </Route>
      </Route>
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
    </Routes>
  );
}

export default App;