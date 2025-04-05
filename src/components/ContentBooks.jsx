"use client";
import React from "react";

const booksData = [
  { id: 1, title: "The Sustainable Future", author: "Jane Doe", url: "#" },
  { id: 2, title: "Environmental Activism", author: "John Smith", url: "#" },
  { id: 3, title: "Social Impact Strategies", author: "Alex Johnson", url: "#" },
];

const ContentBooks = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booksData.map((book) => (
          <div key={book.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white">{book.title}</h3>
            <p className="text-gray-400">{book.author}</p>
            <a href={book.url} className="text-blue-400 mt-2 inline-block">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentBooks;
