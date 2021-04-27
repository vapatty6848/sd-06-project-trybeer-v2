import React, { useEffect, useState } from 'react';
import ChatMessage from '../components/ChatMessage';
import TopBar from '../components/TopBar';
import socket from '../utils/socketClient';

function Chat() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const { email, role } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    socket.emit('getMessages', { email });
  }, []);

  useEffect(() => {
    socket.on('message', (data) => {
      setChatMessages([...data]);
    });
  }, [chatMessages]);

  const handleSubmit = () => {
    const nickname = role === 'administrator' ? 'Loja' : email;
    const messageToSend = {
      nickname,
      message,
      email,
    };

    socket.emit('message', messageToSend);
    setMessage('');
  };

  const handleChange = (e) => setMessage(e.target.value);

  return (
    <div>
      <TopBar name="TryBeer" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ul>
        {chatMessages.map((chatMessage, index) => (
          <ChatMessage
            key={ index }
            nickname={ chatMessage.nickname }
            message={ chatMessage.message }
            timestamp={ chatMessage.timestamp }
          />
        ))}
      </ul>
      <input data-testid="message-input" value={ message } onChange={ handleChange } />
      <button
        type="button"
        data-testid="send-message"
        onClick={ handleSubmit }
      >
        Send
      </button>
    </div>
  );
}

export default Chat;
