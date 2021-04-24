import React, { useState, useEffect } from 'react';
import { getMessages } from '../api/index';
import socket from '../services/socket';

function CustomerChat() {
  const [messages, setMessages] = useState('');
  const [typedMessage, setTypedMessage] = useState('');
  const [test, setTest] = useState('');

  useEffect(() => {
    getMessages(setMessages);
  }, []);

  useEffect(() => {
    socket.on('message', (message) => {
      console.log('entrou')
      setMessages([...messages, message]);
    });
  }, [messages]);
  console.log(test)
  const handleClick = (e) => {
    e.preventDefault();
    setMessages(typedMessage)
    const user = JSON.parse(localStorage.getItem('user'));
    socket.emit('message', { user: user.email, message: typedMessage });
  };

  return (
    <div>
      <h1>TELA DE CHAT</h1>
        <div>
          {messages && messages.map((data) => <p>{`${data.user} - ${data.timestamp}: ${data.message}`}</p>)}
        </div>
        <form>
          <input
            id="message-input"
            data-testid="message-input"
            autocomplete="off"
            onChange={({target}) => setTypedMessage(target.value)}
          />
          <button
            id="send-message"
            data-testid="send-message"
            onClick={(e) => handleClick(e)}
          >
            Enviar
          </button>
        </form>
    </div>
  );
}

export default CustomerChat;