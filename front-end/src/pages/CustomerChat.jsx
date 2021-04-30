import React, { useState, useEffect } from 'react';
import { getMessages, profile } from '../api/index';
import socket from '../services/socket';
import ControllerHeader from '../components/Header-SideBar/ControllerHeader';
import '../css/CustomerChat.css';

function CustomerChat() {
  const [messages, setMessages] = useState('');
  const [typedMessage, setTypedMessage] = useState('');
  const [user, setUser] = useState('');

  const addLeftZero = (number) => {
    const param = number.toString();
    if (param.length < 2) { return `0${number}`; }
    return number;
  };

  const fetchMessages = async () => {
    try {
      await getMessages(setMessages);
    } catch (err) {
      console.log(err);
    }
  };

  const decodeToken = async () => {
    const token = localStorage.getItem('token');
    const response = await profile(token);
    setUser({ name: response.name, email: response.email, id: response.id });
  };

  const calcTimestamp = () => {
    // const ten = 10;
    const date = new Date();
    const hours = addLeftZero(date.getHours());
    const minutes = addLeftZero(date.getMinutes());

    // if (minutes < ten) {
    //   return `${hours}:0${minutes}`;
    // }
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    fetchMessages();
    decodeToken();
  }, []);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const handleClick = () => {
    const objMessage = {
      message: typedMessage,
      timestamp: calcTimestamp(),
      user: user.email,
    };
    setMessages([...messages, objMessage]);
    socket.emit('message', { user: user.email, message: typedMessage });
    document.getElementById('message-input').value = '';
    window.location.reload();
  };

  return (
    <div>
      <ControllerHeader />
      <div class="customer-side-chat">
        {
          messages && messages.map((data, index) => (
            <div class="customer-message" key={ index }>
              <span data-testid="nickname">{`${data.user} - `}</span>
              <span data-testid="message-time">{`${data.timestamp}:`}</span>
              <div data-testid="text-message">{`${data.message}`}</div>
            </div>))
        }
      </div>
      <form class="send-customer-message">
        <input
          id="message-input"
          data-testid="message-input"
          autoComplete="off"
          placeholder="Digite a sua mensagem aqui"
          onChange={ ({ target }) => setTypedMessage(target.value) }
        />
        <button
          type="button"
          id="send-message"
          data-testid="send-message"
          onClick={ () => handleClick() }
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default CustomerChat;
