// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RegisterModal from "./Register.jsx"; // Import the modal

export default function Navbar() {
  const [open, setOpen] = useState(false); // Mobile menu
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Register/Login modal
  const [loggedIn, setLoggedIn] = useState(false); // User login state

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "How It Works", path: "/features" },
    { name: "Features", path: "/how-it-works" },
    { name: "Process Flow", path: "/process-flow" },
    { name: "About Us", path: "/about-Us" },
  ];

  const handleAuthClick = () => setModalOpen(true);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-lg border-b border-gray-200"
            : "bg-gray-50 border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center p-1 md:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2 group">
              <img
                src="./src/assids/Skillswap-logo.png"
                className="h-[3.8rem] md:h-[4rem] w-auto"
                alt="logo"
              />
            </a>
          </div>

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
            {!loggedIn ? (
              <>
                <button
                  onClick={handleAuthClick}
                  className="hidden md:block border border-gray-400 px-5 py-2 rounded-xl text-gray-800 hover:border-blue-400 hover:text-blue-600 hover:shadow-md transition"
                >
                  Sign In
                </button>
                <button
                  onClick={handleAuthClick}
                  className="bg-blue-600 px-5 py-2 rounded-xl text-white hover:bg-blue-500 hover:shadow-md transition"
                >
                  Get Started
                </button>
              </>
            ) : (
              <button
                onClick={() => setLoggedIn(false)}
                className="bg-red-500 px-4 py-2 rounded-xl text-white hover:bg-red-400 transition"
              >
                Logout
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              className="md:hidden focus:outline-none p-2 rounded hover:bg-gray-200 transition text-gray-800"
              onClick={() => setOpen(!open)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    open
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-[35rem] opacity-100 py-4" : "max-h-0 opacity-0"
          } bg-white shadow border-t border-gray-200`}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            {menuItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                onClick={() => setOpen(false)}
                className="p-4 w-full text-center border-b border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition"
              >
                {item.name}
              </Link>
            ))}
            {!loggedIn && (
              <>
                <button
                  onClick={handleAuthClick}
                  className="m-4 border border-gray-400 px-4 py-2 rounded-xl text-gray-800 hover:border-blue-400 hover:text-blue-600 hover:shadow-md transition"
                >
                  Sign In / Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Register/Login Modal */}
      {modalOpen && (
        <RegisterModal
          onClose={() => setModalOpen(false)}
          onLogin={() => {
            setLoggedIn(true);
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
}
