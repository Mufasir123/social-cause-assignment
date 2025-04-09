"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const ContentBooks = () => {
  const [books, setBooks] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching TED books data...");
        const res = await axios.get("/api/get-content-details");
        const allContent = res.data.data;

        // Flatten and collect all TED books
        const booksList = allContent.flatMap((item) => item.books || []);

        console.log("All TED books:", booksList);
        setBooks(booksList);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 ">Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-20 md:-ml-10 lg:ml-0">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-black border border-[#f4eeee48] p-0.5 shadow-[#5d4941da] rounded-lg shadow-lg"
          >
            <img
              src={book.url}
              alt=""
              className="w-full lg:h-[20vw] rounded-t-lg shadow-xl shadow-[#9464647e] hover:scale-90 transition-all duration-300 lazyload"
            />
            <h3 className="text-xl font-semibold text-white ml-3 mt-3">
              {book.title || "Untitled"}
            </h3>

            <div
              className={`text-gray-300 text-sm overflow-y-auto pr-1 transition-all duration-300 ml-3 mr-3 mt-3 ${
                expandedIndex === index ? "max-h-[150px]" : "max-h-[60px]"
              } custom-scrollbar`}
            >
              {book.description}
            </div>

            {/* Show More Button */}
            {book.description?.length > 150 && (
              <button
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
                className="text-blue-400 text-xs mt-1 hover:underline ml-3"
              >
                {expandedIndex === index ? "Show Less..." : "Show More..."}
              </button>
            )}

            <p className="text-white ml-3 mr-3 mt-3">Credits:{book.credit}</p>
            <a
              href={book.bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 mt-2 inline-block cursor-pointer ml-3 mb-3 hover:scale-110 transition-all duration-300"
            >
              Read Full Book
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentBooks;
