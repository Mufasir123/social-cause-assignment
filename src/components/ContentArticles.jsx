"use client";
import React from "react";

const articlesData = [
  { id: 1, title: "How to Reduce Plastic Waste", author: "GreenPeace", url: "#" },
  { id: 2, title: "The Role of Youth in Social Change", author: "UNICEF", url: "#" },
  { id: 3, title: "Sustainable Development Goals 2030", author: "United Nations", url: "#" },
];

const ContentArticles = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articlesData.map((article) => (
          <div key={article.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white">{article.title}</h3>
            <p className="text-gray-400">{article.author}</p>
            <a href={article.url} className="text-blue-400 mt-2 inline-block">
              Read Article
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentArticles;
