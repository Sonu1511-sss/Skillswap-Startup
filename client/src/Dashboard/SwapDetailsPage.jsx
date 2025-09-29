// client/src/Dashboard/SwapDetailsPage.jsx

import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../context/AuthContext';
import { FaArrowLeft, FaCalendarPlus } from 'react-icons/fa';

export default function SwapDetailsPage() {
  const { swapId } = useParams();
  const { user: loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate(); 
  
  const [swap, setSwap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSwapDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/swaps/${swapId}`, { credentials: 'include' });
        const data = await res.json();
        if (data.success) {
          setSwap(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch swap details');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSwapDetails();
  }, [swapId]);

  const handleScheduleClick = () => {
    navigate('/dashboard/schedule', { state: { swapToScheduleId: swap._id } });
  };

  if (loading) return <div className="p-8">Loading swap details...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!swap) return <div className="p-8">Swap not found.</div>;
  
  const otherUser = swap.requester._id === loggedInUser.id ? swap.receiver : swap.requester;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Link to="/dashboard/my-matches" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
        <FaArrowLeft /> Back to My Matches
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-lg border">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{swap.skillOffered} ↔ {swap.skillWanted}</h1>
            <p className="text-gray-500 mt-1">Swap with {otherUser.name}</p>
          </div>
          <span className="bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full">{swap.status}</span>
        </div>

        <div className="border-t my-6"></div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">You are Offering:</h3>
            <p className="text-2xl text-blue-600 font-light">{swap.skillOffered}</p>
            <p className="text-sm text-gray-500">From: {swap.requester.name}</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">You are Requesting:</h3>
            <p className="text-2xl text-indigo-600 font-light">{swap.skillWanted}</p>
            <p className="text-sm text-gray-500">From: {swap.receiver.name}</p>
          </div>
        </div>

        <div className="mt-8">
            <h3 className="font-bold text-lg mb-2">Original Message:</h3>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg italic">"{swap.message}"</p>
        </div>

        <div className="flex justify-end mt-8">
          <button 
            onClick={handleScheduleClick}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            <FaCalendarPlus /> Schedule a Session
          </button>
        </div>
      </div>
      
    </div>
  );
}