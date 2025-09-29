// client/src/Dashboard/RecommendedCard.jsx (or inside MyMatches.jsx)

import React from 'react';
import { FaStar, FaCheckCircle } from "react-icons/fa";

// 1. Receive the new 'onSendRequest' prop
const RecommendedCard = ({ user, onSendRequest }) => (
  <div className="bg-white rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-sm hover:shadow-lg transition duration-300 border">
    <img src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white ring-2 ring-gray-200"/>
    <div className="flex-1 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mt-2 sm:mt-0">95% match</span>
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start items-center text-sm text-gray-500 gap-x-3 gap-y-1 mt-1">
        <span className="flex items-center gap-1"><FaStar className="text-yellow-400" /> {user.averageRating}</span>
        <span>{user.reviews.length} swaps completed</span>
        <span>📍 {user.location}</span>
      </div>
      <div className="text-sm my-3 flex flex-col sm:flex-row gap-x-4 gap-y-2">
        <div><span className="font-semibold text-gray-600">Offers:</span> {user.skillsOffered.join(", ")}</div>
        <div><span className="font-semibold text-gray-600">Wants:</span> {user.skillsWanted.join(", ")}</div>
      </div>
    </div>
    {/* 2. Use the onSendRequest function in the onClick handler */}
    <button
      onClick={() => onSendRequest(user)}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow flex-shrink-0 flex items-center gap-2 justify-center"
    >
      <FaCheckCircle /> Send Request
    </button>
  </div>
);

export default RecommendedCard; 