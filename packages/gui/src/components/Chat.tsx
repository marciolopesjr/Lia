import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatProps {
  messages: Message[];
}

export const Chat: React.FC<ChatProps> = ({ messages }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto" ref={chatContainerRef}>
      <div className="flex flex-col space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white self-end'
                : 'bg-white text-black self-start'
            }`}
          >
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
};
