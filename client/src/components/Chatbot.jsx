import React, { useState } from 'react';
import { Send, Bot } from 'lucide-react';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
        const res = await fetch('/api/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ message: input }),
        });
        const data = await res.json();
        
        if (data.success) {
            const botMessage = { from: 'bot', text: data.reply };
            setMessages(prev => [...prev, botMessage]);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        const errorMessage = { from: 'bot', text: 'Sorry, I am having trouble connecting. Please try again.' };
        setMessages(prev => [...prev, errorMessage]);
        console.error("Chatbot API error:", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col border z-50">
      <div className="p-4 bg-blue-600 text-white rounded-t-2xl flex items-center gap-2">
        <Bot />
        <h3 className="font-bold">SkillSwap Assistant</h3>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <p className={`px-4 py-2 rounded-2xl max-w-xs break-words ${msg.from === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
              {msg.text}
            </p>
          </div>
        ))}
        {loading && <p className="text-gray-500">Bot is typing...</p>}
      </div>
      <div className="p-3 border-t flex items-center gap-2">
        <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything..." 
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white p-3 rounded-full shadow hover:bg-blue-700 transition">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}