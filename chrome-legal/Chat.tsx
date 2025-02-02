import React, { useState, useEffect } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import './index.css';
import { useGlobalContext } from './GlobalContext';

const URL = 'ws://localhost:8000/ws';

interface Message {
  name: string;
  message: string;
  document_clauses: string;
  document_link: string;
  user_id: number;
  chat_history: string;
}

const Chat: React.FC = () => {
  const [name] = useState('User');
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { globalState } = useGlobalContext();

  useEffect(() => {
    const websocket = new WebSocket(URL);
    setWs(websocket);

    websocket.onopen = () => {
      console.log('connected');
    };

    websocket.onmessage = evt => {
      const message = JSON.parse(evt.data);
      addMessage(message);
    };

    websocket.onclose = () => {
      console.log('disconnected');
      setWs(new WebSocket(URL));
    };

    return () => {
      websocket.close();
    };
  }, []);

  const addMessage = (message: Message) => {
    setMessages(prevMessages => [message, ...prevMessages]);
  };

  const submitMessage = async (messageString: string) => {
    const { text, url } = globalState;
    console.log("text", text)
    console.log("url", url)
    const message: Message = {
      name,
      message: messageString,
      document_clauses: text,
      document_link: url,
      user_id: 1,
      chat_history: messages.map(msg => msg.message).toString(),
    };

    if (ws) {
      ws.send(JSON.stringify(message));
      addMessage(message);
    }
  };

  return (
    <div>
      <div className="fixed-chat">
        <div className="panel-chat">
          <div className="body-chat">
            {messages.slice(0).reverse().map((message, index) => (
              <ChatMessage
                key={index}
                message={message.message}
                name={message.name}
              />
            ))}
          </div>
          <div className="message-chat">
            <ChatInput
              onSubmitMessage={messageString => submitMessage(messageString)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;