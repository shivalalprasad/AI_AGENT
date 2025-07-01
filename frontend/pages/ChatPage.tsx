import React, { useRef, useEffect, useState } from 'react';
import './ChatPage.css';
import Logo from '../components/Logo';

interface Message {
  role: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', text: input, timestamp: new Date().toLocaleTimeString() };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: 'demo', message: input })
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { role: 'bot', text: data.response, timestamp: new Date().toLocaleTimeString() }]);
    } catch (e) {
      setMessages((msgs) => [...msgs, { role: 'bot', text: 'Error contacting AI.', timestamp: new Date().toLocaleTimeString() }]);
    }
    setInput('');
    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-header"><Logo /></div>
      <div className="chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.role}`}>
            <div className="bubble-text">{msg.text}</div>
            <div className="bubble-meta">{msg.role} • {msg.timestamp}</div>
          </div>
        ))}
        {loading && <div className="typing-indicator">Agent is typing...</div>}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input-row">
        <input
          className="chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button className="send-btn" onClick={sendMessage} disabled={loading || !input.trim()}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
