// client/src/Dashboard/DashboardWelcome.jsx

import React, { useState, useEffect, useContext } from "react";
import { FaStar, FaUserFriends, FaExchangeAlt, FaClock } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import RequestModal from "./RequestModal";
import UserCard from "./UserCard";

export default function DashboardWelcome() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const { user: loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); 
        const res = await fetch('/api/users', {
          method: 'GET',
          credentials: 'include', 
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch users');
        }

        const data = await res.json();
        if (data.success) {
          setUsers(data.data); 
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchUsers();
  }, []); 

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading user profiles...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  const stats = [
    { icon: <FaUserFriends />, value: loggedInUser?.swapsCompleted || 0, label: "Swaps Completed" },
    { icon: <FaStar />, value: loggedInUser?.averageRating || 0, label: "Your Rating" },
    { icon: <FaExchangeAlt />, value: "2", label: "Active Swaps" }, // This would come from swaps data
    { icon: <FaClock />, value: loggedInUser?.learningHours || 0, label: "Learning Hours" },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome, {loggedInUser?.name}!</h1>
        <p className="mt-1 text-sm text-blue-100">Discover new skills and connect with amazing learners.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
            <div className="text-blue-500 text-2xl mb-2">{stat.icon}</div>
            <p className="font-bold text-2xl">{stat.value}</p>
            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* User Profile Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((user) => (
            <UserCard key={user.id} user={user} onOpenModal={setActiveModal} />
          ))
        ) : (
          <p className="text-gray-500 col-span-3 text-center">No other users found.</p>
        )}
      </div>

      {/* Modal */}
      {activeModal && (
        <RequestModal
          isOpen={!!activeModal}
          onClose={() => setActiveModal(null)}
          userToSwapWith={activeModal}
        />
      )}
    </div>
  );
}