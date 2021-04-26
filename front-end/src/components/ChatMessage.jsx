import jwtDecode from 'jwt-decode';
import moment from 'moment';
import React from 'react';
import useInput from '../hooks/useInput';
import socket from '../utils/socketClient';

export default function ChatMessage() {
  const tokenFromLocalStorage = localStorage.getItem('token');
  const { email } = jwtDecode(tokenFromLocalStorage);
  const [message, setMessage] = useInput('');
  const dateNow = new Date().getTime();
  const sentAt = moment(dateNow).format('H:MM');

  // console.log('email l14', email, message, sentAt);
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chat:sendMessage', { email, sentAt, message });
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
            onChange={ setMessage }
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
