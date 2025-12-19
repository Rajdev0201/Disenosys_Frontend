"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import axios from "axios";
import { API } from "@/components/utils/constant";
import Image from "next/image";
import logo from "@/components/assests/d-round.jpg"

const ChatBot = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);
    setIsStarted(true);

    try {
      const response = await axios.post(API + "ask", { question: userMessage.text });

      const botMessage = {
        text: response.data.answer,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        text: "Sorry, something went wrong. Please try again.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-[50vh] lg:h-[80vh] mt-12 flex flex-col bg-white shadow-xl rounded-3xl font-dm-sans overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 bg-[#182073] text-white">
        <div className="w-12 h-12 rounded-full bg-[#00B5E2] flex items-center justify-center font-bold text-lg">DB</div>
        <div>
          <h1 className="text-lg font-semibold">D–Bot</h1>
          <span className="text-sm text-green-400 flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400" /> Online
          </span>
        </div>
      </div>

      {/* Chat area */}
      {!isStarted ? (
        <div className="flex-1 flex flex-col justify-center items-center p-6 text-center text-gray-700">
            <Image
            src={logo}
            alt="d-logo"
            className="object-cover w-28 h-28"
            />
          <h2 className="text-md lg:text-xl font-semibold text-[#182073] mb-2">
            Hi! I'm <span className="text-[#00B5E2]">D–Bot</span>,your Diseñosys Support Assistant
          </h2>
          <p className="text-xs lg:text-sm text-gray-500">Ask me about privacy policy, terms, FAQs, or support queries.</p>
        </div>
      ) : (
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4 bg-[#f9f9fb]"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl shadow ${
                  msg.sender === "user"
                    ? "bg-white border border-gray-300 text-[#182073]"
                    : "bg-[#f0f4ff] text-[#182073]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start max-w-[70%] px-4 py-2 rounded-2xl shadow bg-[#f0f4ff] text-[#182073] animate-pulse">
              Typing...
            </div>
          )}
        </div>
      )}

      {/* Input area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B5E2]"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
          />
          <Send
            size={22}
            className={`text-[#182073] cursor-pointer ${loading ? "opacity-50" : ""}`}
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
