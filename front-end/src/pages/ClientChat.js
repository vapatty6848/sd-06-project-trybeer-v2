import React, { useState, useEffect } from 'react';
import { getMessages } from '../services/chatService';
import { formatMessage, getEmailLocalStorage } from '../utils';
import socket from '../utils/socketClient';
import MenuTop from '../components/MenuTop';

function ClientChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const user = getEmailLocalStorage();
    const msg = await getMessages(user);
    setMessages(msg);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const key = getEmailLocalStorage();
    socket.emit('connectRoom', key);

    socket.on('receivedMessage', (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const client = getEmailLocalStorage();
    const formatedMessage = formatMessage(message, client);
    setMessage('');
    socket.emit('sendMessage', formatedMessage);
  };

  return (
    <div>
      <MenuTop title="Chat" />
      <div className="orders-container">
        <div>
          {messages && messages.map((msg, index) => (
            <div key={ index }>
              <p data-testid="text-message">{ msg.message }</p>
              <span data-testid="nickname">{ msg.user }</span>
              <span>{'  -  '}</span>
              <span data-testid="message-time">{ msg.hour }</span>
            </div>
          ))}
        </div>
        <form>
          <input
            data-testid="message-input"
            type="text"
            placeholder="Envie sua mensagem ..."
            value={ message }
            onChange={ (e) => handleMessage(e) }
          />
          <button
            data-testid="send-message"
            type="submit"
            onClick={ (e) => handleClick(e) }
          >
            Botão
          </button>
        </form>
      </div>
    </div>
  );
}

export default ClientChat;
