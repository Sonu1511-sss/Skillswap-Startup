// client/src/layouts/DashboardLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../Dashboard/DashboardNavbar';
import { Toaster } from 'react-hot-toast'; 

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
        <Toaster position="top-center" reverseOrder={false} />

      {/* The Dashboard gets its own special Navbar/Sidebar */}
      <DashboardNavbar />
      
      <main className="flex-grow pt-16">
        {/* Outlet will render DashboardWelcome, BrowseSkills, etc. */}
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;