"use client";
import React, { useState } from "react";
import { MdSlowMotionVideo } from "react-icons/md";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { motion } from "framer-motion";
import ContentVideos from "@/components/ContentVideos";
import ContentTEDTalks from "@/components/ContentTEDTalks";
import ContentBooks from "@/components/ContentBooks";
import ContentArticles from "@/components/ContentArticles";
import { MdArticle } from "react-icons/md";

const ContentLibrary = () => {
  const [activePage, setActivePage] = useState("videos");

  return (
    <div className="bg-black text-white min-h-screen flex">
      {/* Sidebar Navigation */}
      <motion.nav
        className="flex flex-col gap-4 p-4 rounded-br-2xl rounded-tr-2xl fixed left-0 top-[30%] transition-all duration-500 border-t-2 border-r-4 border-b-2 bg-gray-900 w-20 hover:w-52 group"
      >
        {[
          { name: "videos", icon: <MdSlowMotionVideo size={24} />, label: "Videos" },
          { name: "ted-talks", icon: <RiKakaoTalkFill size={24} />, label: "TED Talks" },
          { name: "books", icon: <FaBook size={24} />, label: "Books" },
          { name: "articles", icon: <MdArticle size={24} />, label: "Articles" },
        ].map((item) => (
          <button
            key={item.name}
            className={`flex items-center px-2 py-2 rounded-3xl gap-2 cursor-pointer transition-all duration-300 hover:bg-[#f3f4f65f] w-full ${
              activePage === item.name ? "bg-[#31666b5f]" : ""
            }`}
            onClick={() => setActivePage(item.name)}
          >
            {/* Icons should always be visible */}
            <span className="text-white flex-shrink-0">{item.icon}</span>

            {/* Text should appear only on hover */}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 ml-4 whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </motion.nav>

      {/* Content Display */}
      <div className="p-4 ml-[4rem] lg:ml-[10rem] w-full">
        {activePage === "videos" && <ContentVideos />}
        {activePage === "ted-talks" && <ContentTEDTalks />}
        {activePage === "books" && <ContentBooks />}
        {activePage === "articles" && <ContentArticles />}
      </div>
    </div>
  );
};

export default ContentLibrary;
