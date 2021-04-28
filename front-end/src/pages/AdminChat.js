import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TopMenu, ChatList, TestChat } from '../components';
import TrybeerContext from '../context/TrybeerContext';
import { verifyToken } from '../utils/verifications';

function AdminChat() {
  const { user, activeChat } = useContext(TrybeerContext);
  const [chats, setChats] = useState([]);
  const history = useHistory();

  const returnDests = (arrChat) => arrChat.map((chat) => chat.messages[chat.messages.length - 1]);

  const fetchChats = () => {
    verifyToken('chat', user, history)
      .then((data) => setChats(returnDests(data)));
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      <TopMenu />
      <h1>Chat</h1>
        { !activeChat ? 
          <ChatList
            chats={chats}
          /> :
          <TestChat
            dest={activeChat}
          />
        }
    </div>
  );
};

export default AdminChat;
