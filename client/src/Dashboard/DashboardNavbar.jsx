// client/src/Dashboard/DashboardNavbar.jsx

import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { FaBell, FaEnvelope, FaChevronDown } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import logo from '../assids/Skillswap-logo.png';
export default function DashboardNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();


  //...........................Profile Menu.............................................
  const profileMenu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Browse Skills", path: "/dashboard/browse-skills" },
    { name: "My Matches", path: "/dashboard/my-matches" },
    { name: "Messages", path: "/dashboard/messages" },
    { name: "Schedule", path: "/dashboard/schedule" },
    { name: "Achievements", path: "/dashboard/Achivements" },
  ];

  //...........................Logout Function.............................................
  const handleLogout = async () => {
    console.log("1. Logout button CLICKED in DashboardNavbar!");
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      logout();
      toast.success("Logged out successfully!");
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed.");
    }
  };

  //...........................Get User Initials.............................................

  const getUserInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    return nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`
      : `${nameParts[0][0]}`;
  };

  const navLinkStyles = "block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left";

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-2 md:px-4 py-1 md:py-2">
        <NavLink to="/"><img
          src={logo}
          className="h-[3.5rem] md:h-[4rem] w-auto"
          alt="logo"
        /></NavLink>

        <div className="flex-1 px-4">
          <input
            type="text"
            placeholder="Search skills, matches, messages..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-[23rem] focus:outline-none focus:ring-2 focus:ring-blue-500 mx-auto block transition"
          />
        </div>

        <div className="flex items-center gap-4 relative">
          <FaEnvelope className="text-gray-700 cursor-pointer text-xl hover:text-blue-600 transition" />
          <FaBell className="text-gray-700 cursor-pointer text-xl hover:text-blue-600 transition" />

          {/* 3. This 'user' is now guaranteed to be the global, correct user */}
          {user && (
            <div className="relative">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center border-2 border-gray-300 hover:border-blue-500 transition">
                  <span>{getUserInitials(user.name)}</span>
                </div>
                <FaChevronDown className="text-gray-700" />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                  <div className="p-4 border-b">
                    <p className="font-bold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  {profileMenu.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={navLinkStyles}
                      onClick={() => setDropdownOpen(false)}
                      end={item.path === "/dashboard"}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                  <button
                    onClick={handleLogout}
                    className={`${navLinkStyles} border-t`}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}