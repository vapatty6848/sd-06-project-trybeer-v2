import React, { useState, useContext } from 'react';
import socket from '../utils/socketClient';
import TrybeerContext from '../context/TrybeerContext';
import { post } from '../api/fetchFunctions';

function MessageForm() {
  const { user, activeChat } = useContext(TrybeerContext);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const from = user.email;
    const dest = activeChat;
    const room = [from, dest].sort().join('-');
    socket.emit('chat.sendMessage', { message, from, dest });
    await post('chat', { message, from, dest, room });
    setMessage('');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <div className="msger-inputarea">
        <input
          type="text"
          className="msger-input"
          placeholder="Digite sua mensagem..."
          onChange={ (e) => setMessage(e.target.value) }
          data-testid="message-input"
          value={ message }
        />
        <button
          type="submit"
          className="msger-send-btn"
          data-testid="send-message"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
