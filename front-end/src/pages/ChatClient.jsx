import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
// import { useHistory } from 'react-router';
// import MenuTop from '../components/menuClient/MenuTop';

// import CheckoutContext from '../context/CheckoutContext';
// import { checkoutUtils } from '../utils';

function ChatClient() {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');
  const baseUrl = 'http://localhost:3001';

  useEffect(() => {
    const socket = io(baseUrl, {
      withCredentials: true,
    });
    socket.on('chatMessage', (userNick) => {
      setUser(userNick);
    });
  }, []);

  return (
    <div>
      <p data-testid="nickname">{user}</p>
      <p data-testid="message-time">data</p>
      <p data-testid="text-message">{message}</p>
      <label htmlFor="message">
        <input type="text" id="message" data-testid="message-input" />
      </label>
      <button type="button" data-testid="send-message">Enviar</button>
    </div>
  );
}

export default ChatClient;
