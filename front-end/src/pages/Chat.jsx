import React, { useEffect, useState } from 'react';
import MenuTop from '../components/MenuTop';
import socket from '../utils/socket';
import api from '../services/api';

export default function Chat() {
  const email = JSON.parse(localStorage.getItem('user')).email;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    api.fetchChat(email).then((response) => {
      setMessages(response[0]);
    });
    
    socket.on('chat.sentMessage', () => {
      api.fetchChat(email).then((response) => {
        setMessages(response);
      });
    });
  }, []);
  console.log(messages)


  const handleClick = () => {
    socket.emit('chat.sendMessage', {email, newMessage});
  }

  return (
    <div>
      <MenuTop title="Chat" />
      <h2>Chat aqui</h2>
      {messages.messageDetails && messages.messageDetails.map((message) => (
        <div>
          <span data-testid="nickname">{message.email} - </span>
          <span data-testid="message-time">{message.time}</span>
          <p data-testid="text-message">{message.message}</p>
        </div>
      ))}
      <input data-testid="message-input" type="text" onChange={(e) => setNewMessage(e.target.value)} />
      <button type="button" data-testid="send-message"onClick={handleClick}>Enviar</button>
    </div>
  );
}
