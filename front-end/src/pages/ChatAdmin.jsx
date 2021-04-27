import React, { useEffect, useState } from 'react';
import { SideBarAdm } from '../components';
import socket from '../utils/socketClient';

function ChatAdmin() {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    socket.emit('getCustomersChat', {});
    socket.on('customersList', (data) => {
      setChatMessages(data);
      console.log('chat messages admin', data);
    });
  }, []);

  return (
    <div>
      <SideBarAdm />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ul style={ { marginLeft: 200 } }>
        {!chatMessages.length
          ? <span>Nenhuma conversa por aqui</span>
          : chatMessages.map((message, index) => (
            <li data-testid="containerChat" key={ index }>
              <span data-testid="profile-name">{message.email}</span>
              <br />
              <span data-testid="last-message">{message.lastTimestamp}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ChatAdmin;
