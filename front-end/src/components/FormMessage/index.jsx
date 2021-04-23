import React, { useState } from 'react';
import socket from '../../utils/socketClient';

const FormMessage = () => {
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    const { name } = JSON.parse(localStorage.getItem('user'));
    socket.emit('chat.sendMessage', { message, userName: name });
    setMessage('');
  };

  return (
    <form className="form-container" onSubmit={ handleSend }>
      <section className="input-container">
        <input
          type="text"
          id="messageInput"
          value={ message }
          onChange={ ({ target }) => setMessage(target.value) }
        />
        <button type="submit" id="sendButton" className="send-btn">
          Send
        </button>
      </section>
    </form>
  );
};

export default FormMessage;
