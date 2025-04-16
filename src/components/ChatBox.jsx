"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatBox = ({ onGroupClick }) => {
  const [groupInfo, setGroupInfo] = useState([]);
  const [latestMessages, setLatestMessages] = useState({});
  console.log("Latest mesages", latestMessages);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/group/groups`
        );
        console.log("Group info", res.data.groups);
        if (res.data.success) {
          setGroupInfo(res.data.groups);

          // Now fetch latest message for each group
          res.data.groups.forEach(async (group) => {
            try {
              const msgRes = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages/${group._id}`
              );
              console.log("msgRes", msgRes);

              const messages = msgRes.data;
              if (messages.length > 0) {
                const latest = messages[messages.length - 1];
                setLatestMessages((prev) => ({
                  ...prev,
                  [group._id]: latest,
                }));
              }
            } catch (msgErr) {
              console.error(
                `Error fetching messages for group ${group._id}:`,
                msgErr.message
              );
            }
          });
        }
      } catch (error) {
        console.error("Error fetching groups:", error.message);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-4">Group Discussion</h1>
      <div className="space-y-4">
        {groupInfo.map((group) => (
          <div
            key={group._id}
            onClick={() => onGroupClick(group)} // Pass full group object
            className="bg-gray-800 text-white p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition"
          >
            <h2 className="text-xl font-semibold">{group.name}</h2>
            <p className="text-gray-400 text-sm mb-2">{group.description}</p>

            {latestMessages[group._id] ? (
              <div className="text-sm text-gray-300 border-t border-gray-600 pt-2 flex justify-between items-center">
                <div className="truncate">
                  <strong>{latestMessages[group._id].sender.name}:</strong>{" "}
                  {latestMessages[group._id].content}
                </div>
                <p className="text-xs text-white pl-2 whitespace-nowrap">
                  {new Date(
                    latestMessages[group._id].timestamp
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-sm mt-2 italic">
                No messages yet
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;
