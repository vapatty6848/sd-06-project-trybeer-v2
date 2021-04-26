import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TopMenu } from '../components';
import MessageBox from '../components/MessageBox';
import MessageForm from '../components/MessageForm';
import TrybeerContext from '../context/TrybeerContext';
import socket from '../utils/socketClient';
import { get } from '../api/fetchFunctions';

function Chat() {
  const [allMessages, setAllMessages] = useState([]);
  const { user: contextUser } = useContext(TrybeerContext);

  const fetchStoredMessages = async () => {
    const resp = await get('chat', contextUser.token);
    setAllMessages(resp);
  };

  useEffect(() => {
    fetchStoredMessages();
  }, []);

  useEffect(() => {
    socket.on('chat.receiveMessage', (response) => {
      setAllMessages([...allMessages, response]);
    });
  }, [allMessages]);

  return (
    <div>
      <TopMenu />
      <br />
      <br />
      <h1>CHAT</h1>
      <ul>
        {(!allMessages.length) ? <div /> : allMessages.length && allMessages
          .map(({ nickname, date, message, isMine }, index) => (
            <MessageBox
              key={ index }
              nickname={ nickname }
              date={ date }
              message={ message }
              isMine={ (contextUser.email === nickname) || !isMine }
            />
          ))}
      </ul>
      <MessageForm />
    </div>
  );
}

Chat.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Chat;
