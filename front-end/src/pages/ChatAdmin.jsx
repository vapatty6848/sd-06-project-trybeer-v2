import React, { useEffect, useState } from 'react';
import { SideBarAdm, ChatCard } from '../components';
import socket from '../utils/socketClient';
import '../styles/chatadmin.css';

function ChatAdmin() {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    socket.emit('getCustomersChat', {});
    socket.on('customersList', (data) => setChatMessages(data));
  }, []);

  return (
    <div>
      <SideBarAdm />
      <h1 className="title-chat-adm"> Chats Abertos </h1>
      <div className="chatadmincontainer">
        <ul className="adminul">
          {!chatMessages.length
            ? <span className="titlenofound"> Nenhuma conversa por aqui</span>
            : chatMessages.map((message, index) => (
              <ChatCard
                key={ index }
                email={ message.email }
                lastTimestamp={ message.lastTimestamp }
              />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatAdmin;
