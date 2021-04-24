import React, { useState } from 'react';

import socket from '../utilities/socketClient';

function FormMessage({ emailUser }) {
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    socket.emit('sendMessage', { message, emailUser });
  };

  return (
    <form className="msger-inputarea">
      <input
        type="text"
        className="msger-input"
        placeholder="Digite uma mensagem..."
        onChange={ (e) => setMessage(e.target.value) }
      />

      <button
        type="submit"
        className="msger-send-btn"
        onClick={ handleSend }
      >
        Enviar
      </button>
    </form>
  );
}

export default FormMessage;
