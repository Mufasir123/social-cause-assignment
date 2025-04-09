"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ContentBooks = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const allContent = useSelector((state) => state.content.content);
  console.log("articles data from Redux:", allContent);

  const categories = [
    "All",
    ...new Set(allContent.map((item) => item.yourPassion)),
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter content by selected category
  const filteredContent =
    selectedCategory === "All"
      ? allContent
      : allContent.filter((item) => item.yourPassion === selectedCategory);

  // Flatten all matching books
  const articles = filteredContent.flatMap((item) => item.articles || []);

  // Search filter
  const searchedarticles = articles.filter((book) => {
    return (
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase())
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
              className="bg-black border border-[#f4eeee48] p-0.5 shadow-[#5d4941da] rounded-lg shadow-lg"
            >
              <img
                src={article.url}
                alt=""
                className="w-full h-80 rounded-t-lg shadow-xl shadow-[#9464647e] hover:scale-90 transition-all duration-300 lazyload"
              />
              <h3 className="ml-3 text-md font-semibold text-white mb-3 mt-3">
                {article.title || "Untitled"}
              </h3>
              <p className=" ml-3 mr-3 mb-3">
                <strong>Credit: </strong>
                {article.credit}
              </p>

              <div
                className={`text-gray-300 text-sm overflow-y-auto pr-1 transition-all duration-300 ml-3 mr-3 mt-3 ${
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
                  className="text-blue-400 text-xs mt-1 hover:underline ml-3 mb-3"
                >
                  {expandedIndex === index ? "Show Less..." : "Show More..."}
                </button>
              )}
              <br />
              {article.articleUrl && (
                <a
                  href={article.articleUrl}
                  target="_blank"
                  className="text-blue-400  inline-block cursor-pointer ml-3 mb-3 hover:scale-110 transition-all duration-300"
                >
                  Know More
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContentBooks;
