import React, { useState } from "react";
import { FaStar, FaMapMarkerAlt, FaUserCircle, FaUserFriends, FaExchangeAlt, FaClock } from "react-icons/fa";
import RequestModal from "./RequestModal";

export default function DashboardWelcome() {
  const [activeModal, setActiveModal] = useState(null); // store swap to show in modal

    const activeSwaps = [
    {
      name: "Emma Wilson",
      location: "Mumbai",
      rating: 4.5,
      reviews: 12,
      skillsOffer: ["Photography", "French"],
      skillsWant: ["Spanish", "Cooking"],
      availability: ["Weekends", "Evenings"],
    },
    {
      name: "James Brown",
      location: "Delhi",
      rating: 4.8,
      reviews: 8,
      skillsOffer: ["React Development", "UI/UX Design", "Figma"],
      skillsWant: ["Guitar", "Frontend Development"],
      availability: ["Weekdays", "Mornings"],
    },
    {
      name: "Sophia Khan",
      location: "Bangalore",
      rating: 4.7,
      reviews: 10,
      skillsOffer: ["Digital Marketing", "SEO"],
      skillsWant: ["Public Speaking"],
      availability: ["Evenings"],
    },
    {
      name: "Rahul Sharma",
      location: "Pune",
      rating: 4.6,
      reviews: 15,
      skillsOffer: ["Data Science", "Python"],
      skillsWant: ["Cooking", "Music"],
      availability: ["Weekends"],
    },
    {
      name: "Olivia Thomas",
      location: "Hyderabad",
      rating: 4.9,
      reviews: 20,
      skillsOffer: ["Content Writing", "Blogging"],
      skillsWant: ["Design", "Social Media"],
      availability: ["Weekdays", "Mornings"],
    },
    {
      name: "Arjun Mehta",
      location: "Chennai",
      rating: 4.4,
      reviews: 9,
      skillsOffer: ["JavaScript", "React"],
      skillsWant: ["Photography"],
      availability: ["Evenings", "Weekends"],
    },
  ];


  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome to SkillSwap Dashboard
        </h1>
        <p className="mt-1 text-sm text-blue-100">
          Discover your active swaps and connect with amazing learners.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[{ icon: <FaUserFriends />, value: "12", label: "Swaps Completed" },
          { icon: <FaStar />, value: "4.8", label: "Average Rating" },
          { icon: <FaExchangeAlt />, value: "2", label: "Active Swaps" },
          { icon: <FaClock />, value: "24h", label: "Learning Hours" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center"
          >
            <div className="text-blue-600 text-2xl mb-2">{stat.icon}</div>
            <p className="font-bold text-xl">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Active Swap Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeSwaps.map((swap, i) => (
          <div
            key={i}
            className="bg-white text-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-gray-200"
          >
            {/* User Info */}
            <div className="flex items-center gap-3 mb-4">
              <FaUserCircle className="text-4xl text-blue-600" />
              <div>
                <h2 className="font-semibold text-lg">{swap.name}</h2>
                <p className="flex items-center text-sm text-gray-500">
                  <FaMapMarkerAlt className="mr-1 text-blue-500" /> {swap.location}
                </p>
                <p className="flex items-center text-sm mt-1">
                  {[...Array(5)].map((_, idx) => (
                    <FaStar
                      key={idx}
                      className={`${idx < Math.round(swap.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {swap.rating} ({swap.reviews} reviews)
                  </span>
                </p>
              </div>
            </div>

            {/* Skills Offered */}
            <div className="mb-3">
              <p className="font-semibold text-gray-700">Skills Offered</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {swap.skillsOffer.map((skill, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills Wanted */}
            <div className="mb-3">
              <p className="font-semibold text-gray-700">Skills Wanted</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {swap.skillsWant.map((skill, idx) => (
                  <span key={idx} className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-4">
              <p className="font-semibold text-gray-700">Availability</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {swap.availability.map((time, idx) => (
                  <span key={idx} className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                    {time}
                  </span>
                ))}
              </div>
            </div>

            {/* Button */}
            <button
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-700 transition"
              onClick={() => setActiveModal(swap)}
            >
              Request Skill Swap
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeModal && (
        <RequestModal
          isOpen={!!activeModal}
          onClose={() => setActiveModal(null)}
          swap={activeModal}
        />
      )}
    </div>
  );
}
