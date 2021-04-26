import React, { useState, useContext } from 'react';
import socket from '../utils/socketClient';
import TrybeerContext from '../context/TrybeerContext';
import { post } from '../api/fetchFunctions';

function MessageForm({ sender, nickname }) {
  const { user } = useContext(TrybeerContext);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    socket.emit('chat.sendMessage', { message, nickname: user.email });
    await post('chats/admin/', { nickname, sender, message });
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
}

export default MessageForm;
