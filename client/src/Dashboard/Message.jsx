import React, { useState, useEffect, useRef } from "react";
import { Send, Image, Video, Paperclip, Search, Menu } from "lucide-react";

const conversationsData = [
  { id: 1, name: "Emma Wilson", lastMsg: "Perfect! Looking forward to our photography session tomorrow.", time: "2 min", skills: "French ↔ Photography" },
  { id: 2, name: "Alex Chen", lastMsg: "¡Hola! Ready for our Spanish lesson?", time: "15 min", skills: "Spanish ↔ React Development" },
  { id: 3, name: "Maria Rodriguez", lastMsg: "The piano piece you shared was beautiful!", time: "1 hour", skills: "Piano ↔ Photography" },
];

export default function Messages() {
  const [conversations, setConversations] = useState(conversationsData);
  const [search, setSearch] = useState("");
  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [messages, setMessages] = useState([
    { from: "Emma", text: "Hi Sarah! Excited about our skill swap?", time: "10:30 AM" },
    { from: "You", text: "Me too! How about tomorrow at 3 PM?", time: "10:45 AM" },
    { from: "Emma", text: "Perfect! I'll bring my camera. Should we do it virtually?", time: "10:47 AM" },
    { from: "You", text: "Yes, send me a Zoom link 👍", time: "10:50 AM" },
  ]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChat]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { from: "You", text: input, time: "Now" };
    setMessages([...messages, newMsg]);
    setConversations(prev =>
      prev.map(c => (c.id === activeChat.id ? { ...c, lastMsg: input, time: "Now" } : c))
    );
    setInput("");
  };

  const filteredConversations = conversations.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-[90vh] bg-gray-100 shadow-inner rounded-lg overflow-hidden">
      {/* Sidebar for large screens */}
      <div className={`bg-white border-r flex flex-col z-20 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0 absolute w-2/3 sm:relative sm:translate-x-0" : "-translate-x-full sm:translate-x-0 sm:w-1/3"}`}>
        <div className="p-4 border-b flex items-center bg-gray-50">
          <Search className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 text-sm rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 placeholder-gray-400"
          />
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {filteredConversations.map(c => (
            <div
              key={c.id}
              onClick={() => { setActiveChat(c); setSidebarOpen(false); }}
              className={`p-4 cursor-pointer border rounded-xl transition flex flex-col gap-1 hover:bg-blue-50
                ${activeChat.id === c.id ? "bg-blue-100 shadow" : ""}`}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-base">{c.name}</h4>
                <span className="text-xs text-gray-500">{c.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{c.lastMsg}</p>
              <p className="text-xs text-blue-600">{c.skills}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-blue-50 to-white relative">
        {/* Mobile menu button */}
        <div className="sm:hidden p-3 absolute top-0 left-0 z-30">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 bg-blue-600 text-white rounded-full shadow">
            <Menu size={20} />
          </button>
        </div>

        {/* Header */}
        <div className="p-4 border-b bg-blue-600 text-white flex items-center justify-between shadow-md sm:pl-6">
          <h3 className="font-bold text-lg">{activeChat.name}</h3>
          <span className="text-sm opacity-80">{activeChat.skills}</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "You" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl shadow-lg break-words
                  ${m.from === "You" ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"}`}
              >
                <p>{m.text}</p>
                <span className="text-xs opacity-70">{m.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="p-4 border-t bg-white flex items-center gap-3 shadow-inner">
          <button className="p-2 hover:bg-blue-50 rounded-full transition">
            <Image className="text-blue-600" />
          </button>
          <button className="p-2 hover:bg-blue-50 rounded-full transition">
            <Video className="text-blue-600" />
          </button>
          <button className="p-2 hover:bg-blue-50 rounded-full transition">
            <Paperclip className="text-blue-600" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white p-3 rounded-full shadow hover:bg-blue-700 transition"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
