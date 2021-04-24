import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import socket from './socketClient';
import { verifyUser } from '../../store/LocalStorage/actions';
import { sendMessage } from './Requests';
import Header from '../../components/Header/Header';
import './chats.css';

export default function ChatClient() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [att, setAtt] = useState(0);
  const [emailUser, setEmail] = useState('');
  // socket.emit('message', 'minha mensagem incrivel!');
  // recebe msg do back
  // socket.on('mensagem', (msg) => {
  //   console.log(msg, 'msg');
  // });

  socket.on('Mensagem do admin pro cliente', () => {
    setAtt(att + 1);
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
  }, [history, att]);

  const newMessage = async () => {
    const hora = new Date().toLocaleTimeString().split(':');
    const time = `${hora[0]}:${hora[1]}`;
    const messageToSend = await sendMessage(emailUser, time, inputValue, 'Loja');
    return messageToSend;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    newMessage();
    setInputValue('');
    getAllMessages(emailUser);
    setAtt(att + 1);
    socket.emit('clientMsg');
  };

  const handleChangeMessage = (value) => {
    setInputValue(value);
  };

  return (
    <div>
      <Header title="Chat Client" user="client" />
      <h1>Chat Client</h1>
      <div className="messageBox">
        <ul>
          {messages && messages.map((msg, index) => (
            <li key={ index }>
              <span data-testid="nickname">
                {msg.user}
              </span>
              <span data-testid="message-time">
                {msg.time}
              </span>
              <span data-testid="text-message">
                {msg.message}
              </span>
            </li>
          ))}
        </ul>
      </div>
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
    </div>
  );
}
