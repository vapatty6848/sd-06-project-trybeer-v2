import React, { useState, useContext, useEffect } from 'react';
import socket from '../Socket.io/socket';
import BeersAppContext from '../context/BeersAppContext';
import HeaderComponent from '../components/HeaderComponent';

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
      console.log('messageParam', messageParam);
      const ola = [
        ...messages,
        {
          ...messageParam,
          cli: false,
        },
      ];
      setMessages(ola);
    });
  }, [messages]);

  const handleChange = ({ target: { value } }) => {
    setInput(value);
  };

  const submeterMessage = () => {
    socket.emit('message', { email, message: input, cli: true });
    const ola = [
      ...messages,
      {
        message: input,
        date: new Date(),
        cli: true,
      },
    ];
    setMessages(ola);
    setInput('');
  };

  const five = 5;

  return (
    <div>
      <HeaderComponent text="Trybeer" />
      {
        messages.sort((a, b) => a.date - b.date)
          .map(({ message, date, cli }, index) => {
            const dateFormat = new Date(date);
            return (
              <div key={ index }>
                <p>
                  <span data-testid="nickname">
                    {cli ? email : 'Loja'}
                  </span>
                  {' '}
                  -
                  {' '}
                  <span data-testid="message-time">
                    {dateFormat.toLocaleTimeString().substring(0, five)}
                  </span>
                </p>
                <p data-testid="text-message">{message}</p>
              </div>
            );
          })
      }

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
  );
}

export default CostumerWebChat;
