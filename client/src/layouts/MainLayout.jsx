// client/src/layouts/MainLayout.jsx

import React, { useState, useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast'; // 1. Import Toaster
import { AuthContext } from '../context/AuthContext'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegisterModal from '../components/Register';

// ..............................Main Layout Founction........................................
function MainLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();


// ..............................On Login Click Function........................................

  const onLoginClick = () => setIsModalOpen(true);
  
  const handleLoginSuccess = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      login(JSON.parse(storedUser));
    }
    setIsModalOpen(false);
    navigate('/dashboard');
  };
  
  const handleLogout = async () => {
    try {
        await fetch('/api/auth/logout', { 
            method: 'POST', 
            credentials: 'include' 
        });
        logout();
        toast.success("Logged out successfully!");
        navigate('/');
    } catch (error) {
        console.error("Logout failed", error);
        toast.error("Logout failed.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar
        user={user}
        onLoginClick={onLoginClick}
        onLogout={handleLogout}
      />

      <main className="flex-grow pt-16">
        <Outlet context={{ onLoginClick }} />
      </main>

      <Footer />

      {isModalOpen && (
        <RegisterModal
          onClose={() => setIsModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}

export default MainLayout;