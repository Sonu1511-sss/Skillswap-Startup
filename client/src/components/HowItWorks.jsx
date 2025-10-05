import React from "react";
import { FaUserFriends, FaStar, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { HiTrendingUp } from "react-icons/hi";

const features = [
  {
    icon: <FaUserFriends className="text-blue-600 text-4xl mb-4 group-hover:text-blue-700 group-hover:scale-125 transition-transform duration-300" />,
    title: "AI Smart Matching",
    description: "Get connected with the right people instantly using our AI-powered skill-matching engine.",
  },
  {
    icon: <BsChatDots className="text-blue-600 text-4xl mb-4 group-hover:text-blue-700 group-hover:scale-125 transition-transform duration-300" />,
    title: "Seamless Chat",
    description: "Experience real-time, encrypted conversations with your skill partners without interruptions.",
  },
  {
    icon: <FaStar className="text-blue-600 text-4xl mb-4 group-hover:text-blue-700 group-hover:scale-125 transition-transform duration-300" />,
    title: "Trust Ratings",
    description: "Transparent ratings and verified reviews to help you choose trusted skill partners.",
  },
  {
    icon: <FaShieldAlt className="text-blue-600 text-4xl mb-4 group-hover:text-blue-700 group-hover:scale-125 transition-transform duration-300" />,
    title: "Next-Gen Security",
    description: "Advanced verification & moderation ensures a safe and reliable learning environment.",
  },
  {
    icon: <HiTrendingUp className="text-blue-600 text-4xl mb-4 group-hover:text-blue-700 group-hover:scale-125 transition-transform duration-300" />,
    title: "Skill Analytics",
    description: "Track your progress with interactive charts and personalized growth insights.",
  },
  {
    icon: <FaCheckCircle className="text-blue-600 text-4xl mb-4 group-hover:text-blue-700 group-hover:scale-125 transition-transform duration-300" />,
    title: "Verified Skills",
    description: "Our team validates every skill so you always get quality exchanges.",
  },
];

function HowItWorks() {
  return (
    <section className="py-20 pt-[7rem] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        
        {/* Heading */}
        <h2 className="text-4xl font-extrabold mb-4 text-white drop-shadow-lg">
          Why Choose <span className="text-yellow-300">SkillSwap?</span>
        </h2>
        <p className="text-blue-100 mb-16 text-lg max-w-2xl mx-auto">
          Unlock a smarter, faster, and safer way to learn and share skills 🚀
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/30 
                         hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-400/40 transition-all duration-500
                         transform hover:-translate-y-2"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-blue-900 group-hover:text-blue-800 transition-colors">
                {feature.title}
              </h3>
              <p className="text-blue-700 group-hover:text-blue-800 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Background Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl opacity-40 animate-pulse"></div>
    </section>
  );
}

export default HowItWorks;
