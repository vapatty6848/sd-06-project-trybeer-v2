import React, { useContext, useState, useEffect } from 'react';
import { TopMenu } from '../components';
import TrybeerContext from '../context/TrybeerContext';
import { verifyToken } from '../utils/verifications';

function Chat({ history }) {
  const [message, setMessage] = useState('');
  const { user } = useContext(TrybeerContext);
  const messages = [{ message: 'Hello', timestamp: '14:36'}, { message: 'Hello', timestamp: '14:36'}]

  const fetchMessages = async () => {
    const allMessages = await verifyToken('chat', user, history);
    console.log('allMessages', allMessages);
  };

  const onChangeMessage = ({ target: { value } }) => {
    setMessage(value);
  }

  const handleSubmit = () => {
    messages.push({ message, timestamp: '14:00'});
    console.log(messages);
  }

  return (
    <div>
      <TopMenu />
      <br/>
      <br/>
      <ul>
        {messages.map(({ message, timestamp}) => (
          <li>{user.email} {timestamp} {message}</li>
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

export default Chat;
