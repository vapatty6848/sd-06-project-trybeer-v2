import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TopMenu } from '../components';
import TrybeerContext from '../context/TrybeerContext';
import { verifyToken } from '../utils/verifications';
import fetchFunctions from '../api/fetchFunctions';

import socket from '../utils/socketClient';

const dateFormat = require('dateformat');

function Chat({ history }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messagesHistory, setMessagesHistory] = useState([]);
  const { user } = useContext(TrybeerContext);

  const fetchMessages = async () => {
    const allMessages = await verifyToken('chat', user, history);
    const { messages } = allMessages;
    console.log(messages);
    setMessagesHistory(messages);
  };

  const onChangeMessage = ({ target: { value } }) => {
    setCurrentMessage(value);
  };

  const handleSubmit = async () => {
    await fetchFunctions.post('chat', { email: user.email, message: currentMessage });
    fetchMessages();
  };

  useEffect(() => {
    socket.emit('emit', user.email);
  });

  return (
    <div>
      <TopMenu />
      <br />
      <br />
      <h1>CHAT</h1>
      <ul>
        {messagesHistory && messagesHistory.map(({ message, date }, index) => (
          <li key={ index }>
            <p data-testid="nickname">{user.email}</p>
            <p data-testid="message-time">{dateFormat(date, 'HH:MM')}</p>
            <p data-testid="text-message">{message}</p>
          </li>
        ))}
      </ul>
      <input
        data-testid="message-input"
        type="text"
        name="message"
        placeholder="Digite aqui"
        id="message"
        onChange={ onChangeMessage }
      />
      <button
        data-testid="send-message"
        type="submit"
        onClick={ handleSubmit }
      >
        Enviar
      </button>
    </div>
  );
}

Chat.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Chat;
