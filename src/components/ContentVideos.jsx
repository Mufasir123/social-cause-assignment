"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getContent } from "@/store/contentSlice/contentSlice";
import { MdFullscreen } from "react-icons/md";

const ContentVideos = () => {
  const [videos, setVideos] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const videoRefs = useRef([]); // 🛠️ Create array of refs

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/get-content-details");
        const allContent = res.data.data;
        const videosList = allContent.flatMap((item) => item.videos || []);
        setVideos(videosList);
        dispatch(getContent(allContent));
      } catch (err) {
        console.error("Error fetching TED videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleFullScreen = (ref) => {
    if (ref) {
      if (ref.requestFullscreen) {
        ref.requestFullscreen();
      } else if (ref.webkitRequestFullscreen) {
        ref.webkitRequestFullscreen();
      } else if (ref.msRequestFullscreen) {
        ref.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Videos</h2>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {loading
          ? [...Array(2)].map((_, i) => (
              <div
                key={i}
                className="relative bg-black rounded-xl shadow-md w-full max-w-[300px] h-[480px] sm:max-w-[340px] sm:h-[500px] lg:max-w-[360px] lg:h-[540px] overflow-hidden"
              >
                <div className="w-full h-full object-cover bg-gray-200"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                  <div className="h-4 bg-gray-200 w-3/4 mb-1"></div>
                  <div className="h-4 bg-gray-200 w-5/6 mb-1"></div>
                  <div className="h-4 bg-gray-200 w-1/4 mt-1"></div>
                  <div className="h-4 bg-gray-200 w-1/2 mt-1"></div>
                  <div className="h-4 bg-gray-200 w-full mt-1"></div>
                </div>
              </div>
            ))
          : videos.map((data, index) => {
              return (
                <div
                  key={index}
                  className="relative rounded-xl shadow-[#2b1f32a7] shadow-md w-full max-w-[300px] h-[480px] sm:max-w-[340px] sm:h-[500px] lg:max-w-[360px] lg:h-[540px] overflow-hidden cursor-pointer"
                >
                  {/* Video Player */}
                  {data.url ? (
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={data.url}
                      controls
                      controlsList="nodownload"
                      className="w-full h-full object-cover"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  ) : data.videoUrl ? (
                    <iframe
                      ref={(el) => (videoRefs.current[index] = el)}
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

                  {/* Fullscreen Icon Button */}
                  <button
                    onClick={() => handleFullScreen(videoRefs.current[index])}
                    className="absolute top-2 right-2 bg-white/70 hover:bg-white p-1 rounded-full shadow-md flex items-center justify-center"
                  >
                    {/* Expand SVG Icon */}
                    <MdFullscreen />
                  </button>

                  {/* Bottom Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                    <h3 className="text-white text-lg font-semibold mb-1 tracking-wide">
                      {data.title || "Untitled"}
                    </h3>

                    {/* Smooth Expandable Description */}
                    <div
                      className={`text-gray-300 text-sm overflow-y-auto pr-1 transition-all duration-500 ease-in-out ${
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
              );
            })}
      </div>
    </div>
  );
};

export default ContentVideos;
