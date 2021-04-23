import React, { useContext, useState, useEffect } from 'react';
import { TopMenu } from '../components';
import TrybeerContext from '../context/TrybeerContext';
import { verifyToken } from '../utils/verifications';
import PropTypes from 'prop-types';
import { Children } from 'react';

function Chat({ history }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const { user } = useContext(TrybeerContext);
  // const messages = [{ message: 'Hello', timestamp: '14:36' },
  //   { message: 'Hello', timestamp: '14:36' }];
  const [messageHistory, setMessageHistory] = useState([]);

  const fetchMessages = async () => {
    const allMessages = await verifyToken('chat', user, history);
    setMessageHistory(allMessages);
    console.log('allMessages', allMessages);
  };

  const onChangeMessage = ({ target: { value } }) => {
    setCurrentMessage(value);
  };

  const handleSubmit = () => {
    const date = new Date();
    console.log(date.getHours())
    const timestamp = `${date.getHours()}:${date.getMinutes()}`
    messages.push({ currentMessage, timestamp });
    // console.log(messages);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <TopMenu />
      <br />
      <br />
      <ul>
        {messageHistory.map(({ message, timestamp }, index) => (
          <li key={ index }>
            <div data-testid="nickname">{user.email} - <spam data-testid="message-time"> {timestamp} </spam> </div> 
            <div data-testid="text-message">{message}</div>
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
