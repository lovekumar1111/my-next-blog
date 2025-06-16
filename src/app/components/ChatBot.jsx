'use client';

import { useState } from 'react';

export default function ChatBot({ blogPosts }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Namaste! Aap kisi bhi blog ke baare mein pooch sakte ho.' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    const newMessages = [...messages, userMessage];

    const reply = getBotResponse(input, blogPosts);
    setMessages([...newMessages, { type: 'bot', text: reply }]);
    setInput('');

    // Optional: voice output
    const speak = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      window.speechSynthesis.speak(utterance);
    };
    speak(reply);
  };

  const getBotResponse = (query, posts) => {
    query = query.toLowerCase();

    const formatDate = (dateString) => {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    };

    if (query.includes('latest') || query.includes('newest')) {
      const latest = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
      if (!latest) return '❌ Koi blog available nahi hai.';
      return `🆕 Latest blog hai: "${latest.title}" (${formatDate(latest.date)})\n\n${latest.excerpt || latest.content?.slice(0, 100) || ''}`;
    }

    const matches = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.content?.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.slug?.toLowerCase().includes(query) ||
        (post.date && post.date.includes(query))
    );

    if (matches.length === 0) {
      return '❌ Sorry, mujhe aapke query se related blog nahi mila.';
    }

    return matches
      .map(
        (post) =>
          `• "${post.title}" (${formatDate(post.date)})\n${post.excerpt || post.content?.slice(0, 100)}\n`
      )
      .join('\n');
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 bg-blue-600 text-white rounded-full p-4 shadow-lg z-50 hover:bg-blue-700"
        >
          💬
        </button>
      )}

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-5 right-5 w-80 bg-white shadow-xl rounded-lg border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-2 font-bold flex justify-between items-center">
            <span>🧠 Blog Chatbot</span>
            <button onClick={() => setOpen(false)} className="text-white font-bold text-lg">×</button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-3 space-y-2 bg-gray-50 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded whitespace-pre-line ${
                  msg.type === 'bot' ? 'bg-gray-200 text-left' : 'bg-blue-100 text-right'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 p-2 text-sm"
              placeholder="Blog ke baare me poochho..."
            />
            <button onClick={handleSend} className="bg-blue-600 text-white px-3 text-sm">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
