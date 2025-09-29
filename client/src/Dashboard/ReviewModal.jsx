// client/src/Dashboard/ReviewModal.jsx

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { X, Star } from 'lucide-react';

export default function ReviewModal({ isOpen, onClose, sessionData, currentUser }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Find the user who is being reviewed
  const userToReview = sessionData.swapId.requester._id === currentUser.id
    ? sessionData.swapId.receiver
    : sessionData.swapId.requester;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
        toast.error("Please select a rating.");
        return;
    }
    setLoading(true);
    
    try {
        const res = await fetch(`/api/users/${userToReview._id}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ rating, comment })
        });
        const data = await res.json();
        if(!res.ok || !data.success) {
            throw new Error(data.message || "Failed to submit review.");
        }
        toast.success("Review submitted successfully!");
        onClose(); // Close the modal
    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
        <h2 className="text-xl font-bold mb-2 text-gray-800">Leave a Review</h2>
        <p className="text-sm text-gray-500 mb-4">How was your session for "{sessionData.title}" with {userToReview.name}?</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`cursor-pointer transition-colors ${ (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300' }`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        fill="currentColor"
                        size={28}
                    />
                ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comment (Optional)</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience..." rows={4} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 mt-4">
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}