import React, { useState } from 'react';
import socket from '../../utils/socketClient';

const FormMessage = () => {
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    socket.emit('chat.sendMessage', message);
    setMessage('');
  };

  return (
    <form className="input-container" onSubmit={ handleSend }>
      <input
        type="text"
        id="messageInput"
        value={ message }
        onChange={ ({ target }) => setMessage(target.value) }
      />
      <button type="submit" id="sendButton" className="send-btn">
        Send
      </button>
    </form>
  );
};

export default FormMessage;
