import React, { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import DashboardWelcome from "./DashboardWelcome";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardWelcome />;
      default:
        return <DashboardWelcome />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar setActivePage={setActivePage} />
      <div className="pt-[5rem] px-4 md:px-8">{renderPage()}</div>
    </div>
  );
}
