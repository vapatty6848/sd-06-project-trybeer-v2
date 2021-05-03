import jwtDecode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import useChat from '../utils/userChat';
// import socket from '../utils/socketClient';
import fetches from '../services/fetches';

const dateFormat = require('dateformat');

export default function ChatMessage() {
  const tokenFromLocalStorage = localStorage.getItem('token');
  const { email } = jwtDecode(tokenFromLocalStorage);
  const [message, setMessage] = useState('');
  const { messages, setMessages, sendMessage } = useChat(email);
  const sentAt = dateFormat(new Date(), 'HH:MM');

  useEffect(() => {
    fetches.getAllMessagesByEmail(tokenFromLocalStorage)
      .then((response) => {
        setMessages(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('meu horário', sentAt, email, message);
    // socket.emit('chat:sendMessage', { email, sentAt, message });
    // fetches.createMessage(tokenFromLocalStorage, email, sentAt, message)
    //   .then((response) => console.log(response));
    sendMessage(message);
    setMessage('');
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <div>
          <input
            type="text"
            placeholder="Mensagem"
            data-testid="message-input"
            value={ message }
            onChange={ (event) => setMessage(event.target.value) }
            id="message-input"
          />
          <button type="submit" data-testid="send-message">
            Enviar
          </button>
        </div>
      </form>
      { messages.length && messages.map((element, index) => {
        const origin = element.isAdmin ? 'Loja' : element.email;
        return (
          <div key={ index }>
            <div>
              <div data-testid="nickname">{`${origin}`}</div>
              <div data-testid="message-time">{dateFormat(element.sentAt, 'HH:MM')}</div>
            </div>
            <div data-testid="text-message">
              {element.message}
            </div>
          </div>);
      })}
      {/* {messages.map((element) => {
        const { sentAt: date, message: msg, isAdmin, email: userEmail } = element;
        const origin = isAdmin ? 'Loja' : userEmail;
        const msgOut = `${origin} : ${dateFormat(date, 'HH:MM')} - ${msg}`;
        return (
          <p key={ date + msg }>
            { msgOut }
          </p>
        );
      })} */}
    </div>
  );
}
