"use client";
import React from "react";

const tedTalksData = [
  { id: 1, title: "The Power of Vulnerability", speaker: "Brené Brown", url: "#" },
  { id: 2, title: "How Great Leaders Inspire Action", speaker: "Simon Sinek", url: "#" },
  { id: 3, title: "The Future of Social Impact", speaker: "Various Speakers", url: "#" },
];

const ContentTEDTalks = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">TED Talks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tedTalksData.map((talk) => (
          <div key={talk.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white">{talk.title}</h3>
            <p className="text-gray-400">{talk.speaker}</p>
            <a href={talk.url} className="text-blue-400 mt-2 inline-block">
              Watch Talk
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentTEDTalks;
