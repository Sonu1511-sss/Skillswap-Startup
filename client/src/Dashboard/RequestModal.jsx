// RequestModal.jsx
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function RequestModal({ isOpen, onClose, swap }) {
  const [message, setMessage] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Swap request sent to ${swap.name}!\n\nMessage: ${message}\nPreferred Time: ${preferredTime}`
    );
    setMessage("");
    setPreferredTime("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-11/12 md:w-1/2 lg:w-1/3 relative shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">Request Skill Swap</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Swap With (Read-only) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Swap With</label>
            <input
              type="text"
              value={swap.name}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Skills Offered (Read-only) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Skills Offered</label>
            <input
              type="text"
              value={swap.skillsOffer.join(", ")}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Skills Wanted (Read-only) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Skills Wanted</label>
            <input
              type="text"
              value={swap.skillsWant.join(", ")}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
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
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send Swap Request
          </button>
        </form>
      </div>
    </div>
  );
}
