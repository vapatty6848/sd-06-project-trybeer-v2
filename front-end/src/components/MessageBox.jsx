import React, { useEffect, useState } from 'react';
import fetches from '../services/fetches';
import socket from '../utils/socketClient';

export default function MessageBox() {
  const tokenFromLocalStorage = localStorage.getItem('token');
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    fetches.getAllMessagesByEmail(tokenFromLocalStorage)
      .then((response) => {
        setAllMessages(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('chat:sendMessage', (msg) => {
      setAllMessages([...allMessages, msg]);
    });
  }, [allMessages]);

  return (
    <div>
      { allMessages.length && allMessages.map((message, index) => (
        <div key={ index }>
          <div>
            <div data-testid="nickname">{message.email}</div>
            <div data-testid="message-time">{message.sentAt}</div>
          </div>
          <div data-testid="text-message">
            {message.message}
          </div>
        </div>
      ))}
    </div>
  );
}
