import React, { useState } from 'react';

function ChatInput({ onSubmitMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitMessage(message);
    setMessage('');
  };

  return (
    <div>
      <form action="." onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default ChatInput;