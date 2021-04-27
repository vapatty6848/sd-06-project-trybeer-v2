import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import socket from './socketClient';
import { verifyUser } from '../../store/LocalStorage/actions';
import Header from '../../components/Header/Header';
// import { sendMessage } from './Requests';
import './styleChat.css';

export default function ChatClient() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  // const [att, setAtt] = useState(0);
  const [emailUser, setEmail] = useState('');

  socket.on('messages', async ({ user, time, message, Loja }) => {
    // console.log(userBack, time, msg, Loja);
    setMessages([...messages, { user, time, message, Loja }]);
  });

  const history = useHistory();
  const getAllMessages = async (email) => {
    const allMessages = await fetch(`http://localhost:4001/chat/userMessages/${email}`);
    const allMsg = await allMessages.json();
    setMessages(allMsg);
  };

  useEffect(() => {
    const { email } = verifyUser(history);
    setEmail(email);
    getAllMessages(email);
  }, [history]);

  const newMessage = async () => {
    console.log(emailUser, inputValue);
    socket.emit('message', ({
      user: emailUser,
      message: inputValue,
      Loja: 'Loja',
    }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    newMessage();
    setInputValue('');
  };

  const handleChangeMessage = (value) => {
    setInputValue(value);
  };

  return (
    <div className="boxContainer">
      <Header title="Chat Client" user="client" />
      <h1>Chat Client</h1>
      <form>
        <input
          type="text"
          data-testid="message-input"
          value={ inputValue }
          onChange={ ({ target }) => handleChangeMessage(target.value) }
        />
        <button
          type="submit"
          data-testid="send-message"
          onClick={ (e) => handleSendMessage(e) }
        >
          Send
        </button>
      </form>
      <div className="messageBox">
        <ul>
          {messages && messages.map((msg, index) => (
            <li key={ index }>
              <p data-testid="nickname">
                {msg.user}
              </p>
              <p data-testid="message-time">
                {msg.time}
              </p>
              <p data-testid="text-message">
                {msg.message}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
