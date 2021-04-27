import React, { useState, useEffect } from 'react';
import Loader from '../../design-components/Loader';
import TopBar from '../../design-components/TopBar';
import api from '../../axios/api';
import socket from '../../utils/socketClient';
import Message from '../../design-components/Message';

function Chat() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')).email;

  useEffect(() => {
    const key = [user, 'Loja'].sort().join('-');
    socket.emit('privateRoom', key);

    api.get('/chat', {
      headers: {
        email: user,
      },
    }).then((response) => {
      setMessages(response.data);
      setLoading(false);
    });
  }, [user]);

  useEffect(() => {
    socket.on('serverMessage', (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const handleClick = () => {
    const messageObj = {
      from: user,
      to: 'Loja',
      message,
      date: new Date(),
    };
    setMessage('');
    socket.emit('chatMessage', messageObj);
  };

  return (
    loading ? <Loader /> : (
      <div className="rounded-md shadow-sm space-y-4">
        <TopBar
          title="Chat"
          data-testid="top-title"
        />
        <div className="flex flex-col">
          {
            messages.length !== 0 && messages.map((msg, i) => (
              <Message msg={ msg } key={ `message-${i}` } user={ user } />
            ))
          }
        </div>
        <div className="text-center justify-content-center">
          <input
            className="bg-gray-200 m-2"
            type="text"
            data-testid="message-input"
            value={ message }
            onChange={ (e) => setMessage(e.target.value) }
          />
          <button
            type="button"
            data-testid="send-message"
            onClick={ () => handleClick() }
          >
            Enviar
          </button>
        </div>
      </div>
    )
  );
}

export default Chat;
