import React, { useState } from 'react';
import socket from '../../utils/socketClient';

const FormMessage = () => {
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    const { email } = JSON.parse(localStorage.getItem('user'));
    socket.emit('chat.sendMessage', { message, email });
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
          data-testid="message-input"
        />
        <button
          type="submit"
          id="sendButton"
          className="send-btn"
          data-testid="send-message"
        >
          Send
        </button>
      </section>
    </form>
  );
};

export default FormMessage;
