import React from "react";

function Content() {
  return (
    <div className="bg-white flex items-center justify-center px-4 py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-start gap-12 md:gap-16">
        
        {/* Left Section - Title */}
        <div className="text-gray-900 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug md:leading-tight">
          <h1 className="mb-2">SkillSwap</h1>
          <h1 className="mb-2 text-blue-600">Learn & Teach</h1>
          <h1 className="mb-2">Made Easy</h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl font-normal text-gray-600 max-w-md">
            Exchange knowledge, grow together, and connect with real learners & mentors across the world.
          </p>
        </div>

        {/* Right Section - Features */}
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 text-gray-800 text-base sm:text-lg md:text-xl font-medium w-full md:w-1/2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-gray-100 rounded-xl p-3 sm:p-4 md:p-5 hover:bg-gray-200 transition"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm sm:text-base font-bold mt-1 shadow">
                ✓
              </div>
              <p className="flex-1">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  "Exchange your skills with passionate learners.",
  "Learn from real people with real experiences.",
  "Build connections & grow your professional network.",
  "Certificates to showcase your learning & teaching.",
];

export default Content;
