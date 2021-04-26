import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function ChatAdmin() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api.fetchAllChat().then((res) => {
      if (res !== null && res.length > 0) {
        setMessages(res);
      }

    });
  }, []);

  return (
    <div>
      <div>
        {messages && messages.map((chat) => (
          <div data-testid="containerChat">
            <Link to="/admin/chat">
              <h3 data-testid="profile-name">{chat.email}</h3>
              <p data-testid="last-message">Última mensagem às {chat.messageDetails[chat.messageDetails.length - 1].time}</p>
            </Link>
          </div>
        ))}
        {messages.length === 0 && <p data-testid="text-for-no-conversation">Nenhuma conversa por aqui</p>}
      </div>
    </div>
  );
}
