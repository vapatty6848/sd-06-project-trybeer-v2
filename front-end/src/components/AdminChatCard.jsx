import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetches from '../services/fetches';
import formatDate from '../utils/format';

export default function AdminChatCard() {
  const tokenFromLocalStorage = localStorage.getItem('token');
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    fetches.getAllMessages(tokenFromLocalStorage)
      .then((response) => {
        console.log('l11', response.data);
        setAllMessages(response.data);
        // console.log('allMessages - l15', allMessages);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const noMessage = () => {
    const noMessageSpan = (
      <span data-testid="text-for-no-conversation">
        Nenhuma conversa por aqui
      </span>
    );
    return noMessageSpan;
  };
  console.log('l28', allMessages);

  return (
    <div>
      {allMessages.length === 0
        ? noMessage()
        : allMessages.map((message, index) => (
          <Link key={ index } to={ `/admin/chats/${message.email}` }>
            <div data-testid="containerChat">
              <div>
                <div data-testid="profile-name">{message.email}</div>
              </div>
              <div>
                <div data-testid="last-message">
                  {`Última mensagem às ${formatDate(message.sentAt)}`}
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
