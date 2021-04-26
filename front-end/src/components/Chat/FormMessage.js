import React, { useState } from 'react';
import socket from '../../utils/socketClient';

function FormMessage() {
  const [message, setMessage] = useState('');

  const handleSend = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const from = user.email;
    console.log(from);
    socket.emit('chat.sendMessage', { message, from, dest });
  };

  return (
    <form onSubmit={ handleSend }>
      <div>
        <input
          data-testid="message-input"
          type="text"
          placeholder="Digite uma mensagem..."
          onChange={ (event) => setMessage(event.target.value) }
        />
        <button type="submit" data-testid="send-message">Enviar</button>
      </div>
    </form>
  );
}

export default FormMessage;
