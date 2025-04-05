'use client'
import React from "react";
import { motion } from "framer-motion";

const Register = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className=" bg-black text-white flex justify-center items-center mt-20 absolute right-96 z-10 ">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} // Start animation
        animate={{ opacity: 1, scale: 1 }} // End animation
        exit={{ opacity: 0, scale: 0.8 }} // Close animation
        transition={{ duration: 0.3, ease: "easeOut" }} // Timing
        className=" p-6 rounded-lg w-96 relative bg-black"
      >
        <button onClick={onClose} className="absolute top-3 right-4 text-2xl">
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 flex justify-center items-center">Register/Login</h2>

        <div>
            <input
              type="text"
              placeholder="Username"
              className="border-2 border-gray-400 p-2 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              className="border-2 border-gray-400 p-2 w-full mt-4"
            />
            <input
              type="password"
              placeholder="Password"
              className="border-2 border-gray-400 p-2 w-full mt-4"
            />

        </div>
      </motion.div>
    </div>
  );
};

export default Register;
