import React, { useEffect, useState } from 'react';
import { chatTime } from '../../services/formatPatterns';
import getUserInfo from '../../services/localStorage';
import socket from './socket';

const PublicChat = () => {
  const [userInfo, setUserInfo] = useState({});
  const [currMessage, setCurrMessage] = useState('');
  const [messagesList, setMessagesList] = useState([]);

  const handleSendBtn = () => {
    const message = {
      userId: userInfo.userId,
      text: { currMessage, time: chatTime() },
      email: userInfo.email,
    };

    const frontEndMessage = { currMessage, time: chatTime() };
    setMessagesList([...messagesList, frontEndMessage]);
    socket.emit('user-to-server', message);
  };

  const handleChange = (text) => {
    setCurrMessage(text);
  };

  useEffect(() => {
    const { id, email } = getUserInfo();
    setUserInfo({ userId: id, email });
  }, []);

  useEffect(() => {
    const { userId, email } = userInfo;
    socket.emit('user-to-server-connection', { userId, email });
    socket.on('server-to-user-connection', (data) => setMessagesList([...data]));

    // socket.on('teste2', (message) => setTest(message));
  }, [userInfo]);

  return (
    <div>
      Chat Publico
      <div>
        {
          messagesList.map((message, index) => (
            <div key={ `message-${index}` }>
              <p data-testid="message-time">{ message.time }</p>
              <span data-testid="nickname">{ userInfo.email }</span>
              <p data-testid="text-message">{ message.currMessage }</p>
            </div>
          ))
        }
      </div>
      <input
        onChange={ ({ target }) => handleChange(target.value) }
        placeholder="Digite..."
        data-testid="message-input"
      />
      <button
        data-testid="send-message"
        type="button"
        onClick={ () => handleSendBtn() }
      >
        Enviar
      </button>
      {userInfo.email}
    </div>
  );
};

export default PublicChat;
