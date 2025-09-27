import React, { useState } from "react";
import { Search } from "lucide-react";

const categories = [
  { icon: "💻", name: "Programming", count: 234 },
  { icon: "🗣️", name: "Languages", count: 189 },
  { icon: "🎵", name: "Music", count: 156 },
  { icon: "👨‍🍳", name: "Cooking", count: 142 },
  { icon: "🎨", name: "Art & Design", count: 98 },
  { icon: "📸", name: "Photography", count: 87 },
  { icon: "💪", name: "Fitness", count: 76 },
  { icon: "✍️", name: "Writing", count: 65 },
  { icon: "💼", name: "Business", count: 54 },
  { icon: "🧵", name: "Crafts", count: 43 },
  { icon: "🌱", name: "Gardening", count: 32 },
  { icon: "💃", name: "Dance", count: 29 },
];

const BrowseSkills = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filtering logic
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const popularCategories = [...categories]
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  let displayedCategories = filteredCategories;
  if (activeTab === "popular") {
    displayedCategories = popularCategories.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div className="pt-[6rem] px-6 max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">Browse Skills</h1>
      <p className="text-gray-500 mb-6">
        Discover amazing skills to learn from our community
      </p>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-3 text-gray-400" size={20} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for skills, topics, or teachers..."
          className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 text-sm font-medium">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-full transition shadow ${
            activeTab === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Skills
        </button>
        <button
          onClick={() => setActiveTab("popular")}
          className={`px-4 py-2 rounded-full transition shadow ${
            activeTab === "popular"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Popular
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-2 rounded-full transition shadow ${
            activeTab === "categories"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Categories
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {displayedCategories.map((cat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-6 bg-white border rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition cursor-pointer"
          >
            <div className="text-3xl mb-2">{cat.icon}</div>
            <h3 className="font-semibold text-gray-800">{cat.name}</h3>
            <p className="text-sm text-gray-500">{cat.count} skills</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseSkills;
