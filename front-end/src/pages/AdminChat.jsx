import React, { useState } from 'react';
// import socket from '../utils/socketClient';
// import fetches from '../services/fetches';
import PropTypes from 'prop-types';
import useChat from '../utils/userChat';

export default function AdminChat({ match }) {
  const { email } = match.params;
  const sentAt = new Date();
  // const tokenFromLocalStorage = localStorage.getItem('token');
  const [message, setMessage] = useState('');
  const { messages, sendMessage } = useChat(email);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!message) return null;
    console.log('meu horário', sentAt);
    // socket.emit('chat:sendMessage', { email, sentAt, message });
    // fetches.createMessage(tokenFromLocalStorage, email, sentAt, message)
    //   .then((response) => console.log(response));
    // setMessage('');
    sendMessage(message)
    console.log('linha 23', messages);
    setMessage('');

  };

  return (
    <div>
      <div>{`Conversas com o cliente ${email}`}</div>
      <form >
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
            onClick={ handleSubmit }
            data-testid="send-message"
          >
            Enviar
          </button>
        </div>
      </form>
      {messages.map((element) => <p>{element.message}</p>)}
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
