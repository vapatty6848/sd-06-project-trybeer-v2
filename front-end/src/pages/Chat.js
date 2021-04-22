import React, { useContext, useState } from 'react';
import { TopMenu } from '../components';
import TrybeerContext from '../context/TrybeerContext';
import { verifyToken } from '../utils/verifications';
import PropTypes from 'prop-types';

function Chat({ history }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const { user } = useContext(TrybeerContext);
  const messages = [{ message: 'Hello', timestamp: '14:36' },
    { message: 'Hello', timestamp: '14:36' }];

  const fetchMessages = async () => {
    const allMessages = await verifyToken('chat', user, history);
    console.log('allMessages', allMessages);
  };

  fetchMessages();

  const onChangeMessage = ({ target: { value } }) => {
    setCurrentMessage(value);
  };

  const handleSubmit = () => {
    messages.push({ currentMessage, timestamp: '14:00' });
    console.log(messages);
  };

  return (
    <div>
      <TopMenu />
      <br />
      <br />
      <ul>
        {messages.map(({ message, timestamp }, index) => (
          <li key={ index }>
            {user.email}
            {timestamp}
            {message}
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
