"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa6";

const ContentArticle = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const allContent = useSelector((state) => state.content.content);

  console.log("articles data from Redux:", allContent);

  const categories = [
    "All",
    ...new Set(allContent.map((item) => item.yourPassion)),
  ];
  console.log("categories:", categories);
  console.log("selectedCategory:", selectedCategory);

  // Filter content by selected category
  const filteredContent =
    selectedCategory === "All"
      ? allContent
      : allContent.filter((item) => item.yourPassion === selectedCategory);

  // Flatten all matching books
  const articles = filteredContent.flatMap((item) => item.articles || []);

  // Search filter
  const searchedarticles = articles.filter((article) => {
    return (
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Articles</h2>
      <div className="mb-6 flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <input
          type="text"
          placeholder="Search by title..."
          className="px-4 py-2 rounded-2xl bg-gray-800 text-white w-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="px-4 py-2 rounded-xl bg-gray-700 text-white w-full md:w-1/4"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchedarticles.length === 0 ? (
          <p className="text-gray-300">No articles available.</p>
        ) : (
          searchedarticles.map((article, index) => (
            <div
              key={index}
              className="bg-gray-100 border border-[#f4eeee48] p-0.5 shadow-[#4d34554d] rounded-lg shadow-lg"
            >
              {article.url && (
                <img
                  src={article.url}
                  alt=""
                  className="w-full h-80 rounded-t-lg hover:scale-90 transition-all duration-300 lazyload"
                />
              )}
              <h3 className="ml-3 text-lg font-semibold text-black mb-3 mt-3 tracking-wide font-sans">
                {article.title || "Untitled"}
              </h3>
              <p className=" ml-3 mr-3 mb-3">
                <strong>Credit: </strong>
                {article.credit}
              </p>

              <div
                className={`text-[#494D48] text-sm  overflow-y-auto pr-1 transition-all duration-300 ml-3 mr-3 mt-3 ${
                  expandedIndex === index ? "max-h-[150px]" : "max-h-[60px]"
                } custom-scrollbar`}
              >
                {article.description}
              </div>

              {/* Show More Button */}
              {article.description?.length > 150 && (
                <button
                  onClick={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                  className="text-blue-400 text-xs mt-1 hover:underline ml-3 mb-3 cursor-pointer"
                >
                  {expandedIndex === index ? "Show Less..." : "Show More..."}
                </button>
              )}
              <br />
              {/* {article.articleUrl && ( */}
              <Link
                href={`content-library/article/${index}`}
                rel="noopener noreferrer">
                <button className=" bg-[#c6da2e] p-2 rounded-lg mb-3 ml-3 text-xs font-semibold tracking-widest cursor-pointer flex items-center gap-1 font-sans">
                Learn More <FaArrowRight/>
                </button>
              </Link>
              {/* )} */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContentArticle;
