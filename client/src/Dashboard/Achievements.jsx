import React, { useContext } from "react";
import { FiAward, FiStar, FiTrendingUp } from "react-icons/fi";
import { GiTrophyCup } from "react-icons/gi";
import { AuthContext } from "../context/AuthContext";

// The frontend's "Rulebook" of all possible achievements.
// This should match the IDs and details from your backend's config file.
const achievementsMasterList = {
  FIRST_EXCHANGE: { 
    title: "First Exchange", 
    desc: "Complete your first skill exchange session", 
    points: 50, 
    rarity: "common" 
  },
  COMMUNITY_HELPER: { 
    title: "Community Helper", 
    desc: "Complete 5 skill swaps", 
    points: 100, 
    rarity: "rare" 
  },
  // Add all other achievements here as you create them
};

export default function Achievements() {
  // Get the logged-in user's data from the global context
  const { user } = useContext(AuthContext);

  // If the user data is still loading from the context, show a loading message
  if (!user) {
    return <div className="p-8 pt-[7rem]">Loading your achievements...</div>;
  }
  
  // --- DYNAMIC DATA CALCULATION ---

  const stats = [
    { icon: <FiAward className="text-yellow-400" />, label: "Achievements Unlocked", value: user.unlockedAchievements?.length || 0 },
    { icon: <FiStar className="text-blue-500" />, label: "Total Points", value: user.points || 0 },
    { icon: <GiTrophyCup className="text-purple-500" />, label: "Current Level", value: `Level ${user.level || 1}` },
    { icon: <FiTrendingUp className="text-green-500" />, label: "Progress to Next", value: "74%" }, // This can be calculated more accurately
  ];
  
  // Logic to calculate the progress bar
  const pointsForCurrentLevel = ((user.level || 1) - 1) * 1000;
  const pointsForNextLevel = (user.level || 1) * 1000;
  const progressInLevel = (user.points || 0) - pointsForCurrentLevel;
  const totalPointsInLevel = pointsForNextLevel - pointsForCurrentLevel;
  const progressPercentage = totalPointsInLevel > 0 ? (progressInLevel / totalPointsInLevel) * 100 : 0;

  // --- THIS IS THE FIX ---
  // We add '|| []' to provide an empty array as a fallback if 'unlockedAchievements' is undefined.
  // This prevents the '.map()' function from crashing.
  const unlockedAchievements = (user.unlockedAchievements || [])
    .map(unlocked => {
      const achievementDetails = achievementsMasterList[unlocked.achievementId];
      if (!achievementDetails) return null;
      return {
        ...achievementDetails,
        date: new Date(unlocked.unlockedAt).toLocaleDateString(),
      };
    })
    .filter(Boolean) // This removes any nulls if an achievementId didn't match
    .sort((a, b) => new Date(b.date) - new Date(a.date));


  // --- HELPER FUNCTIONS FOR STYLING ---

  const getBorderColor = (rarity) => {
    switch (rarity) {
      case "legendary": return "border-yellow-400";
      case "epic": return "border-purple-500";
      case "rare": return "border-blue-500";
      default: return "border-gray-300";
    }
  };

  const getBadge = (rarity) => {
    switch (rarity) {
      case "legendary": return <span className="bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-bold">Legendary</span>;
      case "epic": return <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">Epic</span>;
      case "rare": return <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">Rare</span>;
      default: return <span className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full text-xs font-bold">Common</span>;
    }
  };

  return (
    <div className="p-6 pt-[7rem] min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Achievements</h1>
      <p className="text-gray-600 mb-8">Track your accomplishments and unlock new badges</p>

      {/* Stats - Now Dynamic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300 border">
            <div className="text-4xl mb-2">{stat.icon}</div>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-gray-600 mt-1 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Progress Bar - Now Dynamic */}
      <div className="mb-10 bg-white p-6 rounded-xl shadow-lg border">
        <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-lg">Level Progress</p>
            <p className="text-sm text-gray-600 font-bold">{user.points || 0} / {pointsForNextLevel} pts</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="bg-blue-500 h-4 rounded-full shadow-md transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{pointsForNextLevel - (user.points || 0)} points to Level {(user.level || 1) + 1}</p>
      </div>

      {/* Achievements List - Now Dynamic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {unlockedAchievements.map((ach, idx) => (
          <div
            key={idx}
            className={`bg-white p-6 shadow-md rounded-xl border-l-4 ${getBorderColor(ach.rarity)} hover:shadow-xl transition duration-300 relative`}
          >
            <div className="absolute top-4 right-4">{getBadge(ach.rarity)}</div>
            <h3 className="text-lg font-bold mb-2 pr-20">{ach.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{ach.desc}</p>
            <div className="flex justify-between text-sm text-gray-500 border-t pt-3 mt-3">
              <span className="font-semibold text-blue-600">+{ach.points} pts</span>
              <span>Unlocked: {ach.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};