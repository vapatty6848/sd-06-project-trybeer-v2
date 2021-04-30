import React, { useState } from 'react';
import socket from '../utils/socketClient';
import fetches from '../services/fetches';
import PropTypes from 'prop-types';
import useChat from '../utils/userChat';

export default function AdminChat({ match }) {
  const { email } = match.params;
  const sentAt = new Date();
  const tokenFromLocalStorage = localStorage.getItem('token');
  const [message, setMessage] = useState('');
  const { messages, sendMessage} = useChat(email);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('meu horário', sentAt);
    // socket.emit('chat:sendMessage', { email, sentAt, message });
    // fetches.createMessage(tokenFromLocalStorage, email, sentAt, message)
    //   .then((response) => console.log(response));
    // setMessage('');
    sendMessage(message)

  };

  return (
    <div>
      <div>{`Conversas com o cliente ${email}`}</div>
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
          <button
            type="submit"
            data-testid="send-message"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
    );
}

AdminChat.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      email: PropTypes.string,
    }),
  }).isRequired,
};
