import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MessageBoxAdm from '../components/MessageBoxAdm';
import MessageFormAdmin from '../components/MessageFormAdmin';
import TrybeerContext from '../context/TrybeerContext';
import { verifyToken } from '../utils/verifications';
import socket from '../utils/socketClient';
import { get } from '../api/fetchFunctions';

function Chat({ nickname, history }) {
  const [allMessages, setAllMessages] = useState([]);
  const { user } = useContext(TrybeerContext);

  const fetchStoredMessages = async () => {
    const response = await verifyToken(`admin/chats/${nickname}`, user, history);
    setAllMessages(response.messages);
  };

  useEffect(() => {
    fetchStoredMessages();
  }, []);

  console.log(allMessages);
  useEffect(() => {
    socket.on('chat.receiveMessage', (response) => {
      setAllMessages([...allMessages, response]);
    });
  }, [allMessages]);
  return (
    <div>
      <ul>
        {(!allMessages.length) ? <div /> : allMessages.length && allMessages
          .map(({ nickname, date, message, isMine }, index) => (
            <MessageBoxAdm
              key={ index }
              nickname={ nickname }
              date={ date }
              message={ message }
              isMine={ (user.email === nickname) || !isMine }
            />
          ))}
      </ul>
      <MessageFormAdmin sender={user.role} nickname={nickname} />
    </div>
  );
}

Chat.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Chat;