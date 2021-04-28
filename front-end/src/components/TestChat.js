import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MessageBoxAdm from './MessageBoxAdm';
import MessageFormAdmin from './MessageFormAdmin';
import TrybeerContext from '../context/TrybeerContext';
import { verifyToken } from '../utils/verifications';
import socket from '../utils/socketClient';

function Chat({ dest }) {
  const [allMessages, setAllMessages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { user, setActiveChat } = useContext(TrybeerContext);
  const history = useHistory();
  const origin = user.email;
  const room = [origin, dest].sort().join('-');

  const fetchStoredMessages = async () => {
    const response = await verifyToken(`chat/${room}`, user, history);
    setAllMessages(response.messages);
    setIsLoaded(true);
  };

  useEffect(() => {
    socket.emit('connectRoom', room);
  }, []);

  useEffect(() => {
    fetchStoredMessages();
  }, [isLoaded]);

  useEffect(() => {
    socket.on('chat.receiveMessage', (response) => {
      if (!allMessages[0]) {
        setAllMessages([response]);
        return setIsLoaded(!isLoaded);
      }
      setAllMessages([...allMessages, response]);
      setIsLoaded(!isLoaded);
    });
  }, [isLoaded]);

  return (
    <div>
      <h3>{`De: ${user.email} Para: ${dest}`}</h3>
      <ul>
        {(allMessages !== undefined) && allMessages
          .map(({ message, from, date }, index) => (
            <MessageBoxAdm
              message={ message }
              nickname={ from }
              date={ date }
              key={ index }
              isMine={ (user.email === from) }
            />
          ))}
      </ul>
      <MessageFormAdmin />
      <button
        onClick={ () => setActiveChat('') }
        type="button"
      >
        Voltar
      </button>
    </div>
  );
}

Chat.propTypes = {
  dest: PropTypes.string.isRequired,
};

export default Chat;
