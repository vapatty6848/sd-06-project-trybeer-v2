import React, { useState, useContext, useEffect } from 'react';
import socket from '../Socket.io/socket';
import BeersAppContext from '../context/BeersAppContext';
import HeaderComponent from '../components/HeaderComponent';

import '../style/WebChat.css';

function CostumerWebChat() {
  const { user: { token, email } } = useContext(BeersAppContext);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.emit('openRoom', email);

    fetch('http://localhost:3001/chat/', {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    }).then((response) => response.json())
      .then((historyMessages) => {
        if (historyMessages.err) return;
        setMessages(historyMessages);
      })
      .catch(() => console.log('entrou no catch'));
    return () => socket.emit('closeRoom', email);
  }, []);

  useEffect(() => {
    socket.on('message', (messageParam) => {
      const messageShape = [
        ...messages,
        {
          ...messageParam,
          cli: false,
        },
      ];
      setMessages(messageShape);
    });
  }, [messages]);

  const handleChange = ({ target: { value } }) => {
    setInput(value);
  };

  const submeterMessage = () => {
    const cli = true;
    const date = new Date();
    socket.emit('message', { email, message: input, cli, date });
    const messageShape = [
      ...messages,
      {
        message: input,
        date,
        cli: true,
      },
    ];
    setMessages(messageShape);
    setInput('');
  };

  const dateFormat = (date) => {
    const ten = 10;
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    if (minutes < ten) {
      return `${hours}:0${minutes}`;
    }
    return `${hours}:${minutes}`;
  };

  return (
    <div>
      <HeaderComponent text="Trybeer" />
      {
        messages
          .map(({ message, date, cli }, index) => (
            <div
              key={ index }
              className={ cli ? 'messageCli' : 'message' }
            >
              <p>
                <span data-testid="nickname">
                  {cli ? email : 'Loja'}
                </span>
                {' '}
                -
                {' '}
                <span data-testid="message-time">
                  {dateFormat(date)}
                </span>
              </p>
              <p data-testid="text-message">{message}</p>
            </div>
          ))
      }
      <div className="message-send">
        <input
          data-testid="message-input"
          type="text"
          placeholder="Digite..."
          onChange={ handleChange }
          value={ input }
        />
        <button
          type="button"
          data-testid="send-message"
          onClick={ submeterMessage }
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default CostumerWebChat;
