"use client";
import React, { useState } from "react";
import { MdSlowMotionVideo, MdArticle } from "react-icons/md";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { motion } from "framer-motion";
import ContentVideos from "@/components/ContentVideos";
import ContentTEDTalks from "@/components/ContentTEDTalks";
import ContentBooks from "@/components/ContentBooks";
import ContentArticles from "@/components/ContentArticles";

const ContentLibrary = () => {
  const [activePage, setActivePage] = useState("videos");

  const menuItems = [
    { name: "articles", icon: <MdArticle size={24} />, label: "Articles" },
    { name: "videos", icon: <MdSlowMotionVideo size={24} />, label: "Videos" },
    { name: "ted-talks", icon: <RiKakaoTalkFill size={24} />, label: "TED Talks" },
    { name: "books", icon: <FaBook size={24} />, label: "Books" },
  ];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col md:flex-row overflow-x-hidden">
      {/* Sidebar for Desktop */}
      <motion.nav
        className="hidden md:flex flex-col gap-4 p-4 fixed left-0 top-1/4 bg-gray-900 rounded-r-2xl border-t-2 border-r-4 border-b-2 w-20 hover:w-48 group z-10 transition-all duration-300"
      >
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`flex items-center px-2 py-2 rounded-3xl gap-2 transition-all duration-300 hover:bg-[#f3f4f65f] w-full ${
              activePage === item.name ? "bg-[#31666b5f]" : ""
            }`}
            onClick={() => setActivePage(item.name)}
          >
            <span className="text-white flex-shrink-0">{item.icon}</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 ml-4 whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </motion.nav>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 flex justify-around py-2 z-10 max-w-full ">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActivePage(item.name)}
            className={`flex flex-col items-center text-xs cursor-pointer ${
              activePage === item.name ? "text-[#00ffd5]" : "text-white"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="flex-1 p-4 md:ml-24 mb-16 md:mb-0 max-w-full overflow-x-hidden">
        {activePage === "articles" && <ContentArticles />}
        {activePage === "videos" && <ContentVideos />}
        {activePage === "ted-talks" && <ContentTEDTalks />}
        {activePage === "books" && <ContentBooks />}
      </div>
    </div>
  );
};

export default ContentLibrary;
