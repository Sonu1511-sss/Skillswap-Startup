import React from "react";
import { FiAward, FiStar, FiTrendingUp } from "react-icons/fi";
import { GiTrophyCup } from "react-icons/gi";

const Achievements = () => {
  const stats = [
    { icon: <FiAward className="text-yellow-400" />, label: "Achievements Unlocked", value: 6 },
    { icon: <FiStar className="text-blue-500" />, label: "Total Points", value: 1400 },
    { icon: <GiTrophyCup className="text-purple-500" />, label: "Current Level", value: "Level 12" },
    { icon: <FiTrendingUp className="text-green-500" />, label: "Progress to Next", value: "74%" },
  ];

  const achievements = [
    { title: "First Exchange", desc: "Complete your first skill exchange session", points: 50, date: "2 months ago", rarity: "common" },
    { title: "Photography Master", desc: "Teach photography to 5 different students", points: 200, date: "1 month ago", rarity: "rare" },
    { title: "Polyglot", desc: "Learn 3 different languages", points: 300, date: "3 weeks ago", rarity: "epic" },
    { title: "5-Star Teacher", desc: "Maintain a 5-star rating for 10 sessions", points: 500, date: "2 weeks ago", rarity: "legendary" },
    { title: "Community Helper", desc: "Help 20 community members with their skills", points: 250, date: "1 week ago", rarity: "rare" },
    { title: "Early Bird", desc: "Complete 10 morning sessions", points: 100, date: "5 days ago", rarity: "common" },
  ];

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
    <div className="p-6 pt-[7rem] min-h-screen bg-white text-gray-900">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Achievements</h1>
      <p className="text-gray-600 mb-8">Track your accomplishments and unlock new badges</p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition duration-300">
            <div className="text-4xl mb-2">{stat.icon}</div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="mb-8">
        <p className="font-medium mb-2">Level Progress</p>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="bg-blue-500 h-4 rounded-full shadow-md transition-all" style={{ width: "74%" }}></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">1850 / 2500 points to Level 13</p>
      </div>

      {/* Achievements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach, idx) => (
          <div
            key={idx}
            className={`bg-white p-6 shadow-md rounded-xl border-l-4 ${getBorderColor(ach.rarity)} hover:shadow-xl transition duration-300 relative`}
          >
            <div className="absolute top-4 right-4">{getBadge(ach.rarity)}</div>
            <h3 className="text-lg md:text-xl font-bold mb-2">{ach.title}</h3>
            <p className="text-gray-600 mb-4">{ach.desc}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{ach.points} pts</span>
              <span>{ach.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
