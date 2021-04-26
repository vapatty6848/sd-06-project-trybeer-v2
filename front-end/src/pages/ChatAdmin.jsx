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

  const noMessage = () => {
    if (messages.length === 0) {
      return <p data-testid="text-for-no-conversation">Nenhuma conversa por aqui</p>;
    }
  };

  return (
    <div>
      <div>
        {messages && messages.map((chat) => (
          <div data-testid="containerChat" key={ chat.email }>
            <Link to="/admin/chat">
              <h3 data-testid="profile-name">{chat.email}</h3>
              <p data-testid="last-message">
                Última mensagem às
                {chat.messageDetails[chat.messageDetails.length - 1].time}
              </p>
            </Link>
          </div>
        ))}
        { noMessage() }
      </div>
    </div>
  );
}
