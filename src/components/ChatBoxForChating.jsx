"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import LoadingIndicator from "./LoadingIndicator";

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
  withCredentials: true,
});

const ChatBoxForChating = ({ groupInfo, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setTyping] = useState(false);
  const [someOneIsTyping, setSomeOneIsTyping] = useState(false);
  const bottomscroll = useRef(null);
  let typingTimeout = useRef(null);

  const loggedInUserId = user?._id;
  const groupId = groupInfo.id || groupInfo._id;

  useEffect(() => {
    if (!groupId || !user) return;

    socket.emit("join-group", groupId);

    socket.on("receive-message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    if (bottomscroll.current) {
      bottomscroll.current.scrollIntoView({ behavior: "smooth" });
    }

    return () => {
      socket.off("receive-message");
    };
  }, [groupId, user, messages]);

  useEffect(() => {
    socket.on("typing", ({ senderId }) => {
      if (senderId !== user._id) {
        setSomeOneIsTyping(true);
      }
    });

    socket.on("stop-typing", ({ senderId }) => {
      if (senderId !== user._id) {
        setSomeOneIsTyping(false);
      }
    });

    return () => {
      socket.off("typing");
      socket.off("stop-typing");
    };
  }, [user._id]);

  useEffect(() => {
    setIsMember(groupInfo?.members?.some((m) => m._id === loggedInUserId));
  }, [groupInfo, loggedInUserId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages/${groupId}`
        );
        setMessages(res.data);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };

    if (groupInfo?._id) {
      fetchMessages();
    }
  }, [groupInfo]);

  const handleJoinGroup = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/group/join/${groupInfo._id}`;
      setLoading(true);

      const res = await axios.post(url, { userId: loggedInUserId });

      if (res.data.group?.members?.some((m) => m._id === loggedInUserId)) {
        setIsMember(true);
        toast.success("Successfully joined the group!");
      }
    } catch (error) {
      console.error("Join group failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message`,
        {
          senderId: loggedInUserId,
          groupId: groupId,
          content: inputValue,
        }
      );

      // const sentMessage = res.data.message;
      // setMessages((prev) => [...prev, sentMessage]);
      setInputValue("");
    } catch (error) {
      console.log("Error While sending message", error.message);
      toast.error(error.message);
    }
  };

  const handleTyping = (e) => {
    setInputValue(e.target.value);

    if (!isTyping) {
      setTyping(true);
      socket.emit("typing", { groupId, senderId: user._id });
    }

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit("stop-typing", { groupId, senderId: user._id });
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col custom-scrollbar">
      <div className="md:hidden px-4 mb-2 absolute top-24 left-[72%]">
        <button
          onClick={onBack}
          className="text-white bg-gray-600 px-3 py-1 rounded cursor-pointer"
        >
          ← Back
        </button>
      </div>
      <div className="bg-black text-white rounded-2xl w-full px-4 py-2 mb-3 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-bold">{groupInfo.name}</h2>
          <p className="text-gray-400 text-sm">{groupInfo.description}</p>
        </div>
        {!isMember && (
          <button
            onClick={handleJoinGroup}
            disabled={loading}
            className="mt-2 md:mt-0 bg-blue-600 px-4 py-1 rounded text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Joining..." : "Join Group"}
          </button>
        )}
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {messages.map((msg, index) => {
          const isMe = msg.sender._id === loggedInUserId;
          return (
            <div
              key={index}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                  isMe ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
                }`}
              >
                <p>
                  <strong>{msg.sender.name}:</strong> {msg.content}
                </p>
                <p className="text-xs text-gray-300 mt-1 text-right">
                  {new Date(msg.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomscroll}></div> {/* 👈 This triggers auto scroll */}
        {someOneIsTyping && (
          <div className="px-4 text-sm italic text-gray-400">
           <LoadingIndicator/>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center p-4 border-t border-gray-700"
      >
        <input
          type="text"
          placeholder={
            isMember ? "Type a message..." : "Join the group to chat"
          }
          className="flex-grow bg-gray-700 text-white p-2 rounded-lg focus:outline-none"
          name="message"
          value={inputValue}
          onChange={handleTyping}
          disabled={!isMember}
        />
        <button
          className="cursor-pointer ml-3 bg-black text-white px-4 py-2 rounded"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBoxForChating;
