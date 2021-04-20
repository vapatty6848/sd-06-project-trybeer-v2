import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../services/localStorage';
import socket from './socket';

const PublicChat = () => {
  const [userId, setUserInfo] = useState('');

  useEffect(()=> {
    const { id } = getUserInfo();
    setUserInfo(id);
  }, []);

  useEffect(() => {
    socket.emit('user-to-server-connection' , { userId });

    // socket.on('teste2', (message) => setTest(message));
  }, [userId]);

  return (
    <div>
      Chat Publico
      <input />
      {userId}
    </div>
  );
};

export default PublicChat;
