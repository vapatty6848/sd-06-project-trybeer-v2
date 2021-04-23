import React, { useState } from 'react';
import socket from '../../utils/socketClient';

function FormMessage() {
  const [message, setMessage] = useState('');

  const handleSend = (event) => {
    event.preventDefault();
    console.log(message);
    // const from = localStorage.getItem('currentUser'); JÁ TEM O USER
    // socket.emit('chat.sendMessage', { message, from, dest });
  }

  return (
    <form onSubmit={ handleSend }>
      <div>
        <input
          type="text"
          placeholder="Digite uma mensagem..."
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          type="submit"
        >Enviar</button>
      </div>
    </form>
  );
}

export default FormMessage;
