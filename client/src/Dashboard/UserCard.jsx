// client/src/Dashboard/UserCard.jsx

import React from 'react';
import { FaStar, FaMapMarkerAlt, FaUserCircle, FaGithub, FaLinkedin } from "react-icons/fa";

export default function UserCard({ user, onOpenModal }) {
  return (
    <div className="bg-white text-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-gray-200 flex flex-col h-full">
      <div className="flex-grow">
        {/* User Info Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <img 
              src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
              alt={user.name} 
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
            />
            <div>
              <h2 className="font-semibold text-lg">{user.name}</h2>
              <p className="flex items-center text-sm text-gray-500">
                <FaMapMarkerAlt className="mr-1 text-blue-500" /> {user.location || 'Not specified'}
              </p>
            </div>
          </div>
          <div className="flex gap-3 text-gray-500 flex-shrink-0 mt-1">
            {user.github && (
              <a href={user.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900" title="GitHub Profile">
                <FaGithub className="h-5 w-5" />
              </a>
            )}
            {user.linkedin && (
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700" title="LinkedIn Profile">
                <FaLinkedin className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        {/* Rating */}
        <p className="flex items-center text-sm mb-4">
          {[...Array(5)].map((_, idx) => (
            <FaStar key={idx} className={`${idx < Math.round(user.averageRating) ? "text-yellow-400" : "text-gray-300"}`} />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {user.averageRating} ({user.reviews.length} reviews)
          </span>
        </p>

        {/* Skills Offered */}
        <div className="mb-3">
          <p className="font-semibold text-gray-700 text-sm">Skills Offered</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {user.skillsOffered.map((skill, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">{skill}</span>
            ))}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="mb-3">
          <p className="font-semibold text-gray-700 text-sm">Skills Wanted</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {user.skillsWanted.map((skill, idx) => (
              <span key={idx} className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs font-medium">{skill}</span>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="mb-4">
          <p className="font-semibold text-gray-700 text-sm">Availability</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {user.availability.map((time, idx) => (
              <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">{time}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-700 transition"
        onClick={() => onOpenModal(user)}
      >
        Request Skill Swap
      </button>
    </div>
  );
}