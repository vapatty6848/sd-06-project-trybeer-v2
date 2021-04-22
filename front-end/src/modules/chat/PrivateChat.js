import React, { useEffect, useState } from 'react';
import { chatTime } from '../../services/formatPatterns';
import getUserInfo from '../../services/localStorage';
import socket from './socket';
import ChatBox from './ChatBox';
import ChatMenu from './ChatMenu';

const PublicChat = () => {
  const [userInfo, setUserInfo] = useState({});
  const [messagesList, setMessagesList] = useState([]);

  const handleSendBtn = (currMessage) => {
    const message = {
      userId: userInfo.userId,
      text: { currMessage, time: chatTime() },
      email: userInfo.email,
    };

    const frontEndMessage = { currMessage, time: chatTime() };
    setMessagesList([...messagesList, frontEndMessage]);
    socket.emit('user-to-server', message);
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
      Chat Privado
      <ChatMenu />
    </div>
  );
};

export default PublicChat;
