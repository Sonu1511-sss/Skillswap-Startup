import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react"; // modern icon

function Content() {
  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100 flex items-center justify-center px-6 py-14 sm:py-20">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-start gap-12 md:gap-20">
        
        {/* Left Section - Title */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-gray-900 md:w-1/2"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-sm">
            Skill<span className="text-blue-500">Swap</span>
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500 mt-2">
            Learn & Teach
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-2">
            Made Easy
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-md leading-relaxed">
            Exchange knowledge, grow together, and connect with real learners & mentors across the world. 
            Unlock opportunities to <span className="font-semibold text-blue-500">learn, teach, and inspire </span>.
          </p>
        </motion.div>

        {/* Right Section - Features */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex flex-col gap-5 sm:gap-6 w-full md:w-1/2"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center text-white">
                <CheckCircle className="w-5 h-5" />
              </div>
              <p className="flex-1 text-gray-800 text-lg font-medium">{feature}</p>
            </motion.div>
          ))}
        </motion.div>
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
