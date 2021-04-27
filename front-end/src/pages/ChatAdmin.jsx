import React, { useEffect, useState } from 'react';
import { SideBarAdm, ChatCard } from '../components';
import socket from '../utils/socketClient';

function ChatAdmin() {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    socket.emit('getCustomersChat', {});
    socket.on('customersList', (data) => setChatMessages(data));
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
            <ChatCard
              key={ index }
              email={ message.email }
              lastTimestamp={ message.lastTimestamp }
            />
          ))}
      </ul>
    </div>
  );
}

export default ChatAdmin;
