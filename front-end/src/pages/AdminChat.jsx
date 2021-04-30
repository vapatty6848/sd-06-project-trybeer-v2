import React, { useState, useEffect } from 'react';
// import { Link, useHistory } from 'react-router-dom';
import { getConversations } from '../api/index';
import ControllerHeader from '../components/Header-SideBar/ControllerHeader';
import '../css/AdminChat.css';

function AdminChat() {
//   const [activeBtn, setActiveBtn] = useState(false);
  // const [users, setUsers] = useState({ email: '', password: '' });
  const [conversations, setConversations] = useState('');

  // const fetchMessages = async () => {
  //   try {
  //     await getMessages(setUsers);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const fetchConversations = async () => {
    try {
      await getConversations(setConversations);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <div>
      <ControllerHeader />
      {
        conversations && conversations.length > 0
          ? conversations.map((message, i) => (
            <div class="admin-chats" key={ i } data-testid="containerChat">
              <p data-testid="profile-name">{message.user}</p>
              <p data-testid="last-message">
                {`Última mensagem às ${message.timestamp}`}
              </p>
            </div>))
          : <p data-testid="text-for-no-conversation">Nenhuma conversa por aqui</p>
      }
    </div>
  );
}

export default AdminChat;

// 0: {_id: "60870e391b13847028cfa3b8", user: "zebirita@gmail.com", message: "mensagem 1", timestamp: "16:2"}
// 1: {_id: "60870e3c1b13847028cfa3b9", user: "zebirita@gmail.com", message: "aloizio", timestamp: "16:2"}
// 2: {_id: "60870e411b13847028cfa3ba", user: "zebirita@gmail.com", message: "alexandre", timestamp: "16:2"}
