import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import NavbarAdmin from '../components/NavBarAdmin';
import api from '../api/axiosApi';
import './chatAdm.css';

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
      <Header isAdmin />
      <NavbarAdmin />
      <div className="msgerAdm">
        {chatList.map((element, index) => (
          <Link to="/admin/chat" key={ `link-${index} ` }>
            <div key={ index } data-testid="containerChat" className="msgerAdm-chat">
              <h2 data-testid="profile-name">{element.user}</h2>
              <h3 data-testid="last-message">
                Última mensagem às
                {element.lastMessage}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ChatAdmin;
