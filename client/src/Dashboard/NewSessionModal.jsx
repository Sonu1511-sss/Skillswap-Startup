// client/src/Dashboard/NewSessionModal.jsx

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';

export default function NewSessionModal({ isOpen, onClose, activeSwaps, onSessionCreated,defaultSwapId  }) {
  // State for the form inputs
  const [swapId, setSwapId] = useState(defaultSwapId ||activeSwaps[0]?._id || '');
  const [title, setTitle] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [durationInMinutes, setDurationInMinutes] = useState(60);
  const [meetingLink, setMeetingLink] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bodyData = {
      swapId,
      title,
      scheduledAt,
      durationInMinutes: Number(durationInMinutes),
      meetingLink,
    };

    try {
      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to create session.');
      }

      toast.success('Session created successfully!');
      onSessionCreated(data.data); // Pass the new session back to the parent
      onClose(); // Close the modal
    } catch (error) {
      toast.error(error.message);
      console.error("Error creating session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative shadow-xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Schedule a New Session</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select an Active Swap</label>
            <select
              value={swapId}
              onChange={(e) => setSwapId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              {activeSwaps.map(swap => (
                <option key={swap._id} value={swap._id}>
                  {swap.skillOffered} ↔ {swap.skillWanted} (with {swap.requester.name} & {swap.receiver.name})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Session Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Introduction to React Hooks"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date and Time</label>
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
              <input
                type="number"
                value={durationInMinutes}
                onChange={(e) => setDurationInMinutes(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Link (Optional)</label>
            <input
              type="url"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              placeholder="https://zoom.us/j/..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 mt-4"
          >
            {loading ? 'Scheduling...' : 'Schedule Session'}
          </button>
        </form>
      </div>
    </div>
  );
}