import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import socket from './socketClient';
import { verifyUser } from '../../store/LocalStorage/actions';
import Header from '../../components/Header/Header';
import './styleChat.css';

export default function DetailChat() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [emailUser, setEmail] = useState('');
  
  let { client } = useParams();

  socket.on('messages', async ({ from, to, message, time }) => {
    setMessages([...messages, { from, to, message, time }]);
  });

  const history = useHistory();
  const getAllMessages = async () => {
    const allMessages = await fetch(`http://localhost:4001/chat/messages/${client}`);
    const allMsg = await allMessages.json();
    // console.log(allMsg);
    // const teste = allMsg.filter((el) => el.user !== 'Loja');
    setMessages(allMsg);
  };

  useEffect(() => {
    const { email } = verifyUser(history);
    setEmail(email);
    getAllMessages(email);
  }, [history]);

  const newMessage = async () => {
    socket.emit('message', ({
      from: 'tryber@trybe.com.br',
      to: client,
      message: inputValue,
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
      <Header title="Chat Loja" user="admin" />
      <h1>Chat Loja</h1>
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
                {msg.from}
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
