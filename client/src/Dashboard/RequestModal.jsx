// client/src/Dashboard/RequestModal.jsx

import React, { useState, useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import { AuthContext } from "../context/AuthContext"; 

export default function RequestModal({ isOpen, onClose, userToSwapWith }) {
  
  const { user: loggedInUser } = useContext(AuthContext);

  const [skillOffered, setSkillOffered] = useState(loggedInUser?.skillsOffered[0] || "");
  const [skillWanted, setSkillWanted] = useState(userToSwapWith?.skillsOffered[0] || "");
  const [message, setMessage] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bodyData = {
      receiverId: userToSwapWith.id, 
      skillOffered,
      skillWanted,
      message,
      preferredTime,
    };

    try {
      const res = await fetch('/api/swaps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to send request.');
      }

      toast.success(data.message);
      onClose(); 
    } catch (error) {
      toast.error(error.message);
      console.error("Swap request error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative shadow-lg">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={onClose}>
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">Request Skill Swap</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Swap With</label>
            <input type="text" value={userToSwapWith.name} readOnly className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 cursor-not-allowed"/>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Skill I'll Offer</label>
            <select
              value={skillOffered}
              onChange={(e) => setSkillOffered(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              {loggedInUser?.skillsOffered.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Skill I Want</label>
            <select
              value={skillWanted}
              onChange={(e) => setSkillWanted(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              {userToSwapWith?.skillsOffered.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write a friendly message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={3}
            />
          </div>

          {/* Preferred Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Preferred Time</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="E.g., Weekends, Evenings"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-500 transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Swap Request'}
          </button>
        </form>
      </div>
    </div>
  );
}