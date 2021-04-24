import React, { useEffect, useState } from 'react';
import api from '../api/axiosApi';

function ChatAdmin() {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    api.chatAdminList()
      .then((e) => setChatList(e.data));
  }, []);

  if (chatList.length === 0) {
    return (
      <h1 data-testid="text-for-no-conversation">Nenhuma conversa por aqui</h1>
    );
  }

  return (
    <div>
      {chatList.map((element, index) => (
        <div key={ index } data-testid="containerChat">
          <h2 data-testid="profile-name">{element.user}</h2>
          <h3 data-testid="last-message">
            Última mensagem às
            {element.lastMessage}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default ChatAdmin;
