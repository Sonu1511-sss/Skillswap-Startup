// client/src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assids/Skillswap-logo.png';


export default function Navbar({ user, onLoginClick, onLogout }) {
  const [open, setOpen] = useState(false); 
  const [scrolled, setScrolled] = useState(false);
  
  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const menuItems = [
    { name: "How It Works", path: "/how-it-works" },
    { name: "Features", path: "/features" },
    { name: "Process Flow", path: "/process-flow" },
    { name: "About Us", path: "/about-Us" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg border-b border-gray-200"
          : "bg-gray-50 border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-1 md:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={logo} 
            className="h-[3.8rem] md:h-[4rem] w-auto"
            alt="logo"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 font-medium">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="relative pb-1 text-gray-700 group hover:text-blue-600 transition"
            >
              <span>{item.name}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 items-center">
         {!user ? (
    <>
      <button
        onClick={onLoginClick}
        className="hidden md:block border border-gray-400 px-5 py-2 rounded-xl text-gray-800 hover:border-blue-400 hover:text-blue-600 hover:shadow-md transition"
      >
        Sign In
      </button>
      <button
        onClick={onLoginClick}
        className="bg-blue-600 px-5 py-2 rounded-xl text-white hover:bg-blue-500 hover:shadow-md transition"
      >
        Get Started
      </button>
    </>
  ) : (
    <>
      {/* If user IS logged in, show a welcome message and a link to the dashboard */}
      <span className="font-medium hidden sm:block">Welcome, {user.name}!</span>
      <Link
        to="/dashboard"
        className="bg-blue-600 px-5 py-2 rounded-xl text-white hover:bg-blue-500 hover:shadow-md transition"
      >
        Go to Dashboard
      </Link>
    </>
  )}
          {/* Mobile Hamburger */}
          <button
            className="md:hidden focus:outline-none p-2 rounded hover:bg-gray-200 transition text-gray-800"
            onClick={() => setOpen(!open)}
          >
            {/* ... SVG icon ... */}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[35rem] opacity-100 py-4" : "max-h-0 opacity-0"
        } bg-white shadow border-t border-gray-200`}
      >
        {/* ... mobile links ... */}
      </div>
    </nav>
    // 5. REMOVED the modal from here. The parent (MainLayout) will render it.
  );
}