"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getContent } from "@/store/contentSlice/contentSlice";

const ContentVideos = () => {
  const [videos, setVideos] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/get-content-details");
        console.log("Fetched content:", res.data);
        const allContent = res.data.data;
        const videosList = allContent.flatMap((item) => item.videos || []);
        setVideos(videosList);
        console.log("All content:", allContent);
        dispatch(getContent(allContent)); // Dispatching the content to Redux store
      } catch (err) {
        console.error("Error fetching TED videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Videos</h2>

      {/* Flexbox to center cards like reels */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 max-h-[100%] custom-scrollbar">
        {loading
          ? [...Array(2)].map((_, i) => (
              <div
                key={i}
                className="relative bg-black rounded-xl  shadow-slate-600 shadow-md w-[300px] h-[540px] lg:w-[360px] lg:h-[540px] overflow-hidden "
              >
                <div className="w-full h-full object-cover bg-gray-200"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                  <div className="h-4 bg-gray-200 w-3/4 mb-1"></div>
                  <div className="h-4 bg-gray-200 w-5/6 mb-1 overflow-y-auto"></div>
                  <div className="h-4 bg-gray-200 w-1/4 mt-1"></div>
                  <div className="h-4 bg-gray-200 w-1/2 mt-1"></div>
                  <div className="h-4 bg-gray-200 w-full mt-1"></div>
                </div>
              </div>
            ))
          : videos.map((data, index) => (
            <div
            key={index}
            className="relative rounded-xl shadow-[#2b1f32a7] shadow-md w-full max-w-[300px] h-[480px] sm:max-w-[340px] sm:h-[500px] lg:max-w-[360px] lg:h-[540px] overflow-hidden cursor-pointer"
          >
            {/* Video Player */}
            {data.url ? (
              <video
                src={data.url}
                controls
                controlsList="nodownload"
                className="w-full h-full object-cover"
                onContextMenu={(e) => e.preventDefault()}
              />
            ) : data.videoUrl ? (
              <iframe
                src={data.videoUrl}
                frameBorder="0"
                className="w-full h-full object-cover"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                onContextMenu={(e) => e.preventDefault()}
              />
            ) : (
              <p>No video available</p>
            )}
          
            {/* Bottom Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
              <h3 className="text-white text-lg font-semibold mb-1 tracking-wide">
                {data.title || "Untitled"}
              </h3>
          
              {/* Scrollable Description */}
              <div
                className={`text-gray-300 text-sm overflow-y-auto pr-1 transition-all duration-300 ${
                  expandedIndex === index ? "max-h-[150px]" : "max-h-[60px]"
                } custom-scrollbar`}
              >
                {data.description}
              </div>
          
              {/* Show More Button */}
              {data.description?.length > 150 && (
                <button
                  onClick={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                  className="text-blue-400 text-xs mt-1 hover:underline"
                >
                  {expandedIndex === index ? "Show Less" : "Show More"}
                </button>
              )}
          
              <p className="text-gray-400 text-xs mt-1">
                Credits: {data.credit}
              </p>
            </div>
          </div>
          
            ))}
      </div>
    </div>
  );
};

export default ContentVideos;
