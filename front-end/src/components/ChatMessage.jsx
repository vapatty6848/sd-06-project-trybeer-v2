import jwtDecode from 'jwt-decode';
// import moment from 'moment';
import React, { useState } from 'react';
// import socket from '../utils/socketClient';
// import fetches from '../services/fetches';
import useChat from '../utils/userChat';
// const dateFormat = require('dateformat');

export default function ChatMessage() {
  const tokenFromLocalStorage = localStorage.getItem('token');
  const { email } = jwtDecode(tokenFromLocalStorage);
  const [message, setMessage] = useState('');
  const { messages, sendMessage } = useChat(email);
  // const dateNow = new Date().getTime();
  // const sentAt = moment(dateNow).format('H:MM');
  // const sentAt = new Date();
  const sentAt = dateFormat(new Date(), 'H:MM');

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
      {messages.map((element) => (
        <p>
          {element.email} : {element.message} - {element.sentAt}
        </p>
      ))}
    </div>
  );
}
