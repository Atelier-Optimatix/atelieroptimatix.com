import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '../components/Navbar/NavBar';

const Hero = () => {
  return (
    <div className="hero min-h-screen bg-black relative overflow-hidden" id="hero">
      <NavBar />
      <div className="container mx-auto px-4 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 text-center lg:text-left space-y-8 z-10">
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight"
          >
            Transform Education with Smart School Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 font-medium"
          >
            Streamline operations, enhance learning, and empower educators with cutting-edge solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center lg:justify-start space-x-6"
            whileHover={{ scale: 1.05 }}
          >
            <Link
              to="/contact"
              className="bg-white text-black px-8 py-3 rounded-full font-semibold shadow-lg"
            >
              Get Started
              <svg className="w-5 h-5 ml-2 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="lg:w-1/2 mt-12 lg:mt-0 z-10"
        >
          <img
            src="https://images.unsplash.com/photo-1518780664217-67d6e299367a"
            alt="School Management Dashboard"
            className="w-full max-w-md mx-auto lg:max-w-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;