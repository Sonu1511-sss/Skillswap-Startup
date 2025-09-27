import React from "react";
import { motion } from "framer-motion";
import HeroImage from "../assids/Hero-logo.png"; // Replace with your image path

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white min-h-[35rem] md:min-h-[39rem] flex items-start md:items-center pt-[9rem] md:pt-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-4 md:px-8 w-full">
        
        {/* Text Section */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 flex flex-col gap-4 text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
            Exchange Skills, Build Connections
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-50">
            Connect with like-minded individuals to swap skills, learn new
            talents, and grow together in a collaborative community.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-white text-blue-600 font-semibold shadow-lg transition hover:shadow-xl"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl border border-white text-white font-semibold shadow-lg transition hover:bg-white hover:text-blue-600"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 mt-6 md:mt-0 flex justify-center items-center"
        >
          <motion.img
            src={HeroImage}
            alt="Hero"
            className="h-48 sm:h-56 md:h-64 lg:h-[23rem] w-auto drop-shadow-lg"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
