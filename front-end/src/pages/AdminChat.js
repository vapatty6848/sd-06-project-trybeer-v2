import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TopMenu, ChatList, Chat, TestChat } from '../components';
// import Chat from './Chat';
import TrybeerContext from '../context/TrybeerContext';
import { verifyToken } from '../utils/verifications';

const dateFormat = require('dateformat');

function AdminChat({ history }) {
  const { user } = useContext(TrybeerContext);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState('');

  const formatChats = (allChats) => {
    const chatsArray = [];
    allChats.forEach(({ nickname, messages }) => {
      const lastMessage = messages[messages.length - 1];
      chatsArray.push({ nickname, lastMessage });
    });
    return chatsArray;
  };

  const fetchChats = useCallback(async () => {
    const allChats = await verifyToken('admin/chats/', user, history);
    const chatsArray = formatChats(allChats);
    setChats(chatsArray);
  }, [user, history]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <div>
      <TopMenu />
      <h1>Chat</h1>
        { !activeChat ? 
          <ChatList
            chats={chats}
            setActiveChat={setActiveChat}
          /> :
          <TestChat
            nickname={activeChat}
          />
        }
    </div>
  );
}

AdminChat.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default AdminChat;
