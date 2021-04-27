import React, { useEffect, useState } from 'react';
import fetches from '../services/fetches';

export default function MessageBox() {
  const tokenFromLocalStorage = localStorage.getItem('token');
    const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    fetches.getAllMessagesByEmail(tokenFromLocalStorage)
      .then((response) => {
        // console.log('Aqui está a response', response.data);
        setAllMessages(response.data);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      { allMessages.length && allMessages.map((message, index) => (
        <div  key={ message._id }>
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
