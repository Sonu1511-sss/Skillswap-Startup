// client/src/Dashboard/MyMatches.jsx

import React, { useState, useEffect, useMemo, useContext } from "react";
import { FaStar, FaCheckCircle, FaCommentDots, FaTimesCircle, FaHistory, FaMapMarkerAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import RequestModal from "./RequestModal";

const tabs = ["Recommended", "Active Swaps", "Requests", "History"];

export default function MyMatches() {
  const [activeTab, setActiveTab] = useState("Recommended");
  const [swaps, setSwaps] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const { user: loggedInUser ,fetchUnreadRequestCount  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [swapsRes, usersRes] = await Promise.all([
          fetch('/api/swaps/me', { credentials: 'include' }),
          fetch('/api/users', { credentials: 'include' })
        ]);
        const swapsData = await swapsRes.json();
        if (swapsData.success) setSwaps(swapsData.data);
        else throw new Error(swapsData.message || 'Failed to fetch swaps');
        const usersData = await usersRes.json();
        if (usersData.success) setUsers(usersData.data);
        else throw new Error(usersData.message || 'Failed to fetch users');
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

   useEffect(() => {
        const markAsRead = async () => {
            // If the user is viewing the requests and there are unread ones
            if (activeTab === 'Requests' && unreadRequestCount > 0) {
                try {
                    await fetch('/api/swaps/read-requests', {
                        method: 'PUT',
                        credentials: 'include'
                    });
                    // Refresh the count in the navbar (it should become 0)
                    fetchUnreadRequestCount();
                } catch (error) {
                    console.error("Failed to mark requests as read", error);
                }
            }
        };
        markAsRead();
    }, [activeTab]); 

  const activeSwaps = useMemo(() => swaps.filter(s => s.status === 'accepted'), [swaps]);
  const pendingRequests = useMemo(() => swaps.filter(s => s.status === 'pending'), [swaps]);
  const swapHistory = useMemo(() => swaps.filter(s => ['completed', 'rejected', 'cancelled'].includes(s.status)), [swaps]);

  const handleUpdateRequest = async (swapId, newStatus) => {
    try {
      const res = await fetch(`/api/swaps/${swapId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      toast.success(data.message);
      setSwaps(prev => prev.map(s => (s._id === swapId ? { ...s, status: newStatus } : s)));
    } catch (err) {
      toast.error(err.message);
    }
  };
  
  const handleChatClick = async (otherUser) => {
      try {
          const res = await fetch('/api/conversations', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({ otherUserId: otherUser._id })
          });
          const data = await res.json();
          if (data.success) {
              // On success, navigate to the messages page and pass the conversation data
              navigate('/dashboard/messages', { state: { activeConversation: data.data } });
          } else {
              throw new Error(data.message || "Failed to start conversation.");
          }
      } catch (err) {
          toast.error(err.message);
          console.error(err);
      }
  };

  const unreadRequestCount = useMemo(() => 
        swaps.filter(s => s.receiver._id === loggedInUser.id && s.status === 'pending' && !s.isRead).length
    , [swaps, loggedInUser]);
    

  const tabClass = (tab) => `px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 focus:outline-none ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600 font-semibold" : "text-gray-500 hover:text-gray-800"}`;

  const renderContent = () => {
    if (loading) return <p className="text-center col-span-full text-gray-500">Loading your matches...</p>;
    if (error) return <p className="text-center col-span-full text-red-500">Error: {error}</p>;

    switch (activeTab) {
      case "Recommended":
        return users.length > 0 ? users.map(user => <RecommendedCard key={user.id} user={user} onSendRequest={setActiveModal} />) : <EmptyState tab="Recommended" />;
      case "Active Swaps":
        return activeSwaps.length > 0 ? activeSwaps.map(swap => <ActiveSwapCard key={swap._id} swap={swap} currentUser={loggedInUser} onChat={handleChatClick} />) : <EmptyState tab="Active Swaps" />;
      case "Requests":
        return pendingRequests.length > 0 ? pendingRequests.map(req => <RequestCard key={req._id} req={req} currentUser={loggedInUser} onUpdate={handleUpdateRequest} />) : <EmptyState tab="Requests" />;
      case "History":
        return swapHistory.length > 0 ? swapHistory.map(h => <HistoryCard key={h._id} h={h} currentUser={loggedInUser} />) : <EmptyState tab="History" />;
      default: return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Matches</h1>
      <p className="text-gray-500">Manage your skill exchange connections.</p>
      <div className="border-b border-gray-200"><nav className="-mb-px flex space-x-2 sm:space-x-4 overflow-x-auto">{tabs.map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={tabClass(tab)}>{tab}</button>)}</nav></div>
      <div className="space-y-6">{renderContent()}</div>
      {activeModal && <RequestModal isOpen={!!activeModal} onClose={() => setActiveModal(null)} userToSwapWith={activeModal} />}
    </div>
  );
}

// --- Helper Components ---

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
    <button onClick={() => onSendRequest(user)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow flex-shrink-0">Send Request</button>
  </div>
);

const ActiveSwapCard = ({ swap, currentUser, onChat }) => {
  const otherUser = swap.requester._id === currentUser.id ? swap.receiver : swap.requester;
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h2 className="text-lg font-bold text-gray-800">{otherUser.name}</h2>
      <p className="text-gray-600 mt-2 font-medium">{swap.skillOffered} ↔ {swap.skillWanted}</p>
      <div className="flex gap-2 mt-4">
        <button onClick={() => onChat(otherUser)} className="bg-blue-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-700 transition">Chat</button>
        <Link to={`/dashboard/swaps/${swap._id}`} className="bg-gray-200 text-gray-700 px-4 py-2 text-sm rounded-lg hover:bg-gray-300 transition text-center">View Details</Link>
      </div>
    </div>
  );
};

const RequestCard = ({ req, currentUser, onUpdate }) => {
    const isReceiver = req.receiver._id === currentUser.id;
    const otherUser = isReceiver ? req.requester : req.receiver;
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h2 className="text-lg font-bold text-gray-800">{otherUser.name}</h2>
        <p className="text-sm text-gray-500 mt-1">Request {isReceiver ? 'Received' : 'Sent'} • {new Date(req.createdAt).toLocaleDateString()}</p>
        <p className="text-gray-600 mt-3 font-medium">{req.skillOffered} ↔ {req.skillWanted}</p>
        <p className="text-sm text-gray-500 mt-2 italic bg-gray-50 p-3 rounded-lg">"{req.message}"</p>
        {isReceiver && (
          <div className="flex gap-2 mt-4">
            <button onClick={() => onUpdate(req._id, 'accepted')} className="bg-green-500 text-white px-4 py-2 text-sm rounded-lg hover:bg-green-600 transition">Accept</button>
            <button onClick={() => onUpdate(req._id, 'rejected')} className="bg-red-500 text-white px-4 py-2 text-sm rounded-lg hover:bg-red-600 transition">Decline</button>
          </div>
        )}
      </div>
    );
};

const HistoryCard = ({ h, currentUser }) => {
  const otherUser = h.requester._id === currentUser.id ? h.receiver : h.requester;
  const statusColors = {
    completed: 'text-green-600 bg-green-100',
    rejected: 'text-red-600 bg-red-100',
    cancelled: 'text-gray-600 bg-gray-100'
  };
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border opacity-80">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">{otherUser.name}</h2>
        <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusColors[h.status]}`}>{h.status}</span>
      </div>
      <p className="text-gray-600 mt-2 font-medium">{h.skillOffered} ↔ {h.skillWanted}</p>
      <p className="text-sm text-gray-500 mt-1">Finished on: {new Date(h.updatedAt).toLocaleDateString()}</p>
    </div>
  );
};

const EmptyState = ({ tab }) => (
    <div className="col-span-full bg-white rounded-lg p-10 shadow-sm flex flex-col items-center justify-center gap-4 text-center border">
      <FaHistory className="h-12 w-12 text-gray-300" />
      <h2 className="text-xl font-bold text-gray-800">No {tab} Yet</h2>
      <p className="text-gray-500 max-w-xs">When you have {tab.toLowerCase()}, they will appear here.</p>
      <Link to="/dashboard/browse-skills" className="mt-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">Browse Skills</Link>
    </div>
);