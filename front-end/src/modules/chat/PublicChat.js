import React, { useEffect, useState } from 'react';
import { chatTime } from '../../services/formatPatterns';
import getUserInfo from '../../services/localStorage';
import socket from './socket';
import ChatBox from './ChatBox';

const PublicChat = () => {
  const [userInfo, setUserInfo] = useState(false);
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
    console.log(`socket id do cliente ${socket.id}`);
  };

  useEffect(() => {
    const { id, email } = getUserInfo();
    setUserInfo({ userId: id, email });
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.userId) {
      const { userId, email } = userInfo;
      socket.emit('user-to-server-connection', { userId, email });
      socket.on('server-to-user-connection', (data) => setMessagesList([...data]));
    }
  }, [userInfo]);

  return (
    <div>
      Chat Publico
      {
        userInfo.userId
        && <ChatBox
          messages={ messagesList }
          handleSend={ handleSendBtn }
          userInfo={ userInfo }
        />
      }
    </div>
  );
};

export default PublicChat;
