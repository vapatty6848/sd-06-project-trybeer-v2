import React, { useEffect, useState } from 'react';
import socket from './socket';

const PublicChat = () => {
  const [test, setTest] = useState('Inicio');
  useEffect(() => {
    socket.emit('teste', 'Testando');

    socket.on('teste2', (message) => setTest(message));
  }, []);

  return (
    <div>
      Chat Publico
      <p>{ test }</p>
    </div>
  );
};

export default PublicChat;
