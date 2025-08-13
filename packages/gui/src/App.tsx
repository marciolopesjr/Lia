import React, { useState, useEffect } from 'react';
import { Chat } from './components/Chat';
import { Input } from './components/Input';
import { FileBrowser } from './components/FileBrowser';
interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const initialMessages: Message[] = [
  { text: 'Hello! Please enter your API key to begin.', sender: 'bot' },
];

export const App = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [genAI, setGenAI] = useState<GoogleGenerativeAI | null>(null);

  useEffect(() => {
    const initClient = async () => {
      const { GoogleGenerativeAI } = await import('@google/genai');
      if (apiKey) {
        setGenAI(new GoogleGenerativeAI(apiKey));
      }
    };
    initClient();
  }, [apiKey]);

  const handleSendMessage = async () => {
    if (!apiKey) {
      setApiKey(inputValue);
      setMessages([
        { text: 'API Key set! You can now ask me anything.', sender: 'bot' },
      ]);
      setInputValue('');
      return;
    }

    if (inputValue.trim()) {
      const userMessage: Message = { text: inputValue, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputValue('');

      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const chat = model.startChat();
      const result = await chat.sendMessageStream(inputValue);

      let text = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        text += chunkText;
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage.sender === 'bot') {
            return [
              ...prevMessages.slice(0, -1),
              { ...lastMessage, text },
            ];
          } else {
            return [...prevMessages, { text, sender: 'bot' }];
          }
        });
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <FileBrowser />
      <div className="flex flex-col flex-1">
        <Chat messages={messages} />
        <Input
          value={inputValue}
          onChange={setInputValue}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};
