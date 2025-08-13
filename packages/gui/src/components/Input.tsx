import React from 'react';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  onSendMessage: () => void;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  onSendMessage,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className="p-4 bg-white border-t">
      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          onClick={onSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};
