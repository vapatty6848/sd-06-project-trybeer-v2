import React, { useEffect, useState } from 'react';
import MenuTop from '../components/MenuTop';
import socket from '../utils/socket';
import api from '../services/api';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    api.fetchChat(email).then((res) => {
      if (res !== null && res.length > 0) setMessages(res[0].messageDetails);
    });
  }, []);

  useEffect(() => {
    socket.on('chat.sentMessage', ({ email, message, time }) => {
      setMessages([...messages, { email, message, time }]);
    });
  }, [messages]);

  const handleClick = () => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    socket.emit('chat.sendMessage', { email, newMessage });
  };

  return (
    <div>
      <MenuTop title="Chat" />
      <h2>Chat aqui</h2>
      { messages && messages.map((message, index) => (
        <div key={ index }>
          <span data-testid="nickname">{ `${message.email} - ` }</span>
          <span data-testid="message-time">{ message.time }</span>
          <p data-testid="text-message">{ message.message }</p>
        </div>
      ))}
      <input
        data-testid="message-input"
        type="text"
        onChange={ (e) => setNewMessage(e.target.value) }
      />
      <button
        type="button"
        data-testid="send-message"
        onClick={ handleClick }
      >
        Enviar
      </button>
    </div>
  );
}
