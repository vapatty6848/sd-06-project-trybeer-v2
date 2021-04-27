import React, { useEffect, useState } from 'react';
import { SideBarAdm } from '../components';
import socket from '../utils/socketClient';

function ChatAdmin() {
  const [chatMessages, setChatMessages] = useState([]);
  const { email, role } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    socket.emit('getMessages', { email });
  }, []);

  useEffect(() => {
    socket.on('message', (data) => {
      setChatMessages([...data]);
      console.log('chat message admin', chatMessages);
    });
  }, [chatMessages]);
  return (
    <div>
      <SideBarAdm />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1> oi</h1>
    </div>
  );

};

export default ChatAdmin;
