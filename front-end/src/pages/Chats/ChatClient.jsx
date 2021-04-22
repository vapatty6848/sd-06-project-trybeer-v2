import React, { useState } from 'react';
import socket from './socketClient';

export default function ChatClient() {
  const [inputValue, setInputValue] = useState('');
  socket.emit('message', 'minha mensagem incrivel!');
  // recebe msg do back
  socket.on('mensagem', (msg) => {
    console.log(msg, 'msg');
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    setInputValue('');
    console.log(e, 'eeeeee');
  };

  const handleChangeMessage = (value) => {
    setInputValue(value);
  };

  return (
    <div>
      <h1>Chat Client</h1>
      <div>
        <ul>
        </ul>
      </div>
      <form>
        <input
          type="text"
          data-testid="message-input"
          value={ inputValue }
          onChange={ ({ target }) => handleChangeMessage(target.value) }
        />
        <button
          type="submit"
          data-testid="send-message"
          onClick={ (e) => handleSendMessage(e) }
        >
          Send
        </button>
      </form>
    </div>
  );
}
