"use client";
import ChatBox from "@/components/ChatBox";
import ChatBoxForChating from "@/components/ChatBoxForChating";
import React, { useState } from "react";

const ChatApp = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupClick = (group) => {
    setSelectedGroup(group); // Pass full group info
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
  };

  return (
    <div className="h-screen">
      <div className="md:flex h-full">
        {/* Group List */}
        <div className={`${selectedGroup ? "hidden md:block" : "block"} md:w-1/3 bg-gray-900 p-4 h-full`}>
          <ChatBox onGroupClick={handleGroupClick} />
        </div>

        {/* Chat Panel */}
        <div className={`${selectedGroup ? "block" : "hidden"} md:block md:w-2/3 bg-gray-800 p-4 h-full`}>
          {selectedGroup && (
            <ChatBoxForChating groupInfo={selectedGroup} onBack={handleBackToGroups} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
