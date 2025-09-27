import React, { useState, useEffect } from "react";
import { FaBell, FaEnvelope, FaChevronDown } from "react-icons/fa";

export default function DashboardNavbar({ setActivePage }) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const profileMenu = [
    { name: "Dashboard", page: "dashboard" },
    { name: "Browse Skills", page: "browseSkills" },
    { name: "My Matches", page: "myMatches" },
    { name: "Messages", page: "messages" },
    { name: "Schedule", page: "schedule" },
    { name: "Progress", page: "progress" },
    { name: "Achievements", page: "achievements" },
  ];

  const menuItems = [
    { name: "How It Works", page: "howItWorks" },
    { name: "Features", page: "features" },
    { name: "Process Flow", page: "processFlow" },
    { name: "About Us", page: "aboutUs" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg border-b" : "bg-gray-50 border-b"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-2 md:px-4 py-1 md:py-2">
        {/* Logo */}
        <div className="flex-shrink-0">
         <a href="/"><img
            src="./src/assids/Skillswap-logo.png"
            className="h-[3.5rem] md:h-[4rem] w-auto"
            alt="logo"
          /></a> 
        </div>

        {/* Search */}
        <div className="flex-1 px-4">
          <input
            type="text"
            placeholder="Search skills, matches, messages..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-[23rem] focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto block transition"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 relative">
          <FaEnvelope className="text-gray-700 cursor-pointer text-xl hover:text-blue-600 transition" />
          <FaBell className="text-gray-700 cursor-pointer text-xl hover:text-blue-600 transition" />

          {/* Profile */}
          <div className="relative">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-2 border-gray-300 hover:border-blue-500 transition">
                <span>SU</span>
              </div>
              <FaChevronDown className="text-gray-700" />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                {profileMenu.map((item, i) => (
                  <button
                    key={i}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left"
                    onClick={() => {
                      setActivePage(item.page);
                      setDropdownOpen(false);
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none p-2 rounded hover:bg-gray-200 transition text-gray-800"
          onClick={() => setMobileOpen(!mobileOpen)}
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
                mobileOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[35rem] opacity-100 py-4" : "max-h-0 opacity-0"
        } bg-white shadow border-t border-gray-200`}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          {menuItems.map((item, i) => (
            <button
              key={i}
              className="p-4 w-full text-center border-b border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition"
              onClick={() => {
                setActivePage(item.page);
                setMobileOpen(false);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
