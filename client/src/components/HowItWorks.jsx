import React from "react";
import { FaUserFriends, FaStar, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { HiTrendingUp } from "react-icons/hi";

const features = [
  {
    icon: <FaUserFriends className="text-blue-600 text-4xl mb-4 group-hover:text-blue-700 group-hover:scale-110 transition-transform duration-300" />,
    title: "AI Smart Matching",
    description: "Get connected with the right people instantly using our AI-powered skill-matching engine.",
  },
  {
    icon: <BsChatDots className="text-blue-600 text-4xl mb-4 group-hover:text-blue-700 group-hover:scale-110 transition-transform duration-300" />,
    title: "Seamless Chat",
    description: "Experience real-time, encrypted conversations with your skill partners without interruptions.",
  },
  {
    icon: <FaStar className="text-blue-600 text-4xl mb-4 group-hover:text-blue-700 group-hover:scale-110 transition-transform duration-300" />,
    title: "Trust Ratings",
    description: "Transparent ratings and verified reviews to help you choose trusted skill partners.",
  },
  {
    icon: <FaShieldAlt className="text-blue-600 text-4xl mb-4 group-hover:text-blue-700 group-hover:scale-110 transition-transform duration-300" />,
    title: "Next-Gen Security",
    description: "Advanced verification & moderation ensures a safe and reliable learning environment.",
  },
  {
    icon: <HiTrendingUp className="text-blue-600 text-4xl mb-4 group-hover:text-blue-700 group-hover:scale-110 transition-transform duration-300" />,
    title: "Skill Analytics",
    description: "Track your progress with interactive charts and personalized growth insights.",
  },
  {
    icon: <FaCheckCircle className="text-blue-600 text-4xl mb-4 group-hover:text-blue-700 group-hover:scale-110 transition-transform duration-300" />,
    title: "Verified Skills",
    description: "Our team validates every skill so you always get quality exchanges.",
  },
];

function HowItWorks() {
  return (
    <section className="py-20 pt-[7rem] bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        
        {/* Heading */}
        <h2 className="text-4xl font-extrabold mb-4 text-gray-100">
          Why Choose SkillSwap?
        </h2>
        <p className="text-gray-200 mb-16 text-lg">
          Unlock a smarter, faster, and safer way to learn and share skills 🚀
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/30 hover:border-blue-500 hover:shadow-blue-300 transition-all duration-500"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">
                {feature.title}
              </h3>
              <p className="text-blue-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
