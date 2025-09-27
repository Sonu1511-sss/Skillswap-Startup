import React, { useState } from "react";
import { FaStar, FaClock, FaCheckCircle, FaCommentDots } from "react-icons/fa";

const tabs = ["Recommended", "Active Swaps", "Requests", "History"];

const recommended = [
  {
    name: "Alex Chen",
    rating: 4.9,
    swapsCompleted: 15,
    location: "San Francisco, CA",
    match: "95%",
    offers: ["Spanish Language"],
    wants: ["React Development"],
    description:
      "Native Spanish speaker with 5 years of teaching experience. Loves technology and wants to learn modern web development.",
    tags: ["Beginner-friendly", "Patient", "Flexible schedule"],
    availability: "Weekends",
  },
   {
    name: "Alex Chen",
    rating: 4.9,
    swapsCompleted: 15,
    location: "San Francisco, CA",
    match: "95%",
    offers: ["Spanish Language"],
    wants: ["React Development"],
    description:
      "Native Spanish speaker with 5 years of teaching experience. Loves technology and wants to learn modern web development.",
    tags: ["Beginner-friendly", "Patient", "Flexible schedule"],
    availability: "Weekends",
  },
];

const activeSwaps = [
  {
    name: "Emma Thompson",
    swapPair: "French Language ↔ Photography",
    nextSession: "Tomorrow, 3:00 PM",
    progress: "3/6 sessions",
  },
  {
    name: "Carlos Martinez",
    swapPair: "Guitar Lessons ↔ Web Development",
    nextSession: "Friday, 7:00 PM",
    progress: "2/8 sessions",
  },
];

const requests = [
  {
    name: "Sophie Wilson",
    status: "Received",
    received: "2 days ago",
    swapPair: "French Language ↔ Photography",
    message:
      "Hi! I'd love to help you learn French in exchange for photography lessons. I'm particularly interested in portrait photography.",
  },
];

const history = [];

const MyMatches = () => {
  const [activeTab, setActiveTab] = useState("Recommended");

  const tabClass = (tab) =>
    `px-6 py-3 text-sm font-medium whitespace-nowrap transition ${
      activeTab === tab
        ? "text-black border-b-2 border-black font-semibold"
        : "text-gray-500 hover:text-black"
    }`;

  const renderRecommended = () =>
    recommended.map((user, idx) => (
      <div
        key={idx}
        className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-6 shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
      >
        <img
          src="https://via.placeholder.com/100"
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
        />
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold">{user.name}</h2>
              <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mt-1">
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" /> {user.rating}
                </span>
                <span>{user.swapsCompleted} swaps completed</span>
                <span>📍 {user.location}</span>
              </div>
            </div>
            <div className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mt-2 sm:mt-0">
              {user.match} match
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-10 mt-3">
            <div>
              <span className="font-medium text-green-600">Offers: </span>
              <p className="text-gray-700">{user.offers.join(", ")}</p>
            </div>
            <div>
              <span className="font-medium text-blue-600">Wants: </span>
              <p className="text-gray-700">{user.wants.join(", ")}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{user.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {user.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
            📅 Available: <span className="font-medium">{user.availability}</span>
          </p>
        </div>
        <button className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-md flex items-center gap-2 justify-center">
          <FaCheckCircle /> Send Request
        </button>
      </div>
    ));

  const renderActiveSwaps = () =>
    activeSwaps.map((swap, idx) => (
      <div
        key={idx}
        className="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-md hover:shadow-xl transition border border-gray-100"
      >
        <h2 className="text-lg font-semibold">{swap.name}</h2>
        <p className="text-gray-700 font-medium">{swap.swapPair}</p>
        <p className="text-sm text-gray-500">Next: {swap.nextSession}</p>
        <p className="text-sm text-gray-500">Progress: {swap.progress}</p>
        <div className="flex gap-2 mt-2">
          <button className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
            <FaCommentDots /> Chat
          </button>
          <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
            View Details
          </button>
        </div>
      </div>
    ));

  const renderRequests = () =>
    requests.map((req, idx) => (
      <div
        key={idx}
        className="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-md hover:shadow-xl transition border border-gray-100"
      >
        <h2 className="text-lg font-semibold">{req.name}</h2>
        <p className="text-sm text-gray-500">
          {req.status} - {req.received}
        </p>
        <p className="text-gray-700 font-medium">{req.swapPair}</p>
        <p className="text-sm text-gray-500 mt-1">{req.message}</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
            Accept
          </button>
          <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
            Decline
          </button>
          <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
            Message
          </button>
        </div>
      </div>
    ));

  const renderHistory = () => {
    if (!history.length)
      return (
        <div className="bg-white rounded-2xl p-10 shadow-lg flex flex-col items-center justify-center gap-6 border border-gray-100">
  {/* Optional Icon / Illustration */}
  <div className="bg-blue-50 text-blue-600 p-2 rounded-full">
   <img src="./src/assids/skillsawp.png" alt="" className="h-[2rem] w-[2rem]" />
  </div>

  {/* Text */}
  <h2 className="text-xl font-bold text-gray-800">No Completed Swaps Yet</h2>
  <p className="text-gray-500 text-center max-w-xs">
    Once you complete skill exchanges, they will appear here. Start browsing new skills to connect with learners!
  </p>

  {/* Button */}
  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-md transition transform hover:-translate-y-1">
    Browse Skills
  </button>
</div>

      );
    return history.map((h, idx) => <div key={idx}>{/* history item */}</div>);
  };

  return (
    <div className="pt-[6rem] pl-[2rem] pr-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-1">My Matches</h1>
      <p className="text-gray-500 mb-6">
        Manage your skill exchange connections
      </p>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={tabClass(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex flex-col gap-6">
        {activeTab === "Recommended" && renderRecommended()}
        {activeTab === "Active Swaps" && renderActiveSwaps()}
        {activeTab === "Requests" && renderRequests()}
        {activeTab === "History" && renderHistory()}
      </div>
    </div>
  );
};

export default MyMatches;
