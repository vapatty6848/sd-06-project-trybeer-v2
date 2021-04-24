import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import socket from './socketClient';
import { verifyUser } from '../../store/LocalStorage/actions';
import { sendMessage } from './Requests';

export default function ChatAdmin() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [att, setAtt] = useState(0);
  const [emailUser] = useState('zebirita@gmail.com');
  // socket.emit('message', 'minha mensagem incrivel!');
  // recebe msg do back
  // socket.on('mensagem', (msg) => {
  //   console.log(msg, 'msg');
  // });

  const history = useHistory();
  const getAllMessages = async (email) => {
    const allMessages = await fetch(`http://localhost:4001/chat/userMessages/${email}`);
    const allMsg = await allMessages.json();
    setMessages(allMsg);
  };

  useEffect(() => {
    verifyUser(history);
    // setEmail('zebirita@gmail.com');
    getAllMessages(emailUser);
  }, [history, att, emailUser]);

  const newMessage = async () => {
    const hora = new Date().toLocaleTimeString().split(':');
    const time = `${hora[0]}:${hora[1]}`;
    const messageToSend = await sendMessage('Loja', time, inputValue, emailUser);
    return messageToSend;
  };

  socket.on('Mensagem do cliente pro admin', () => {
    setAtt(att + 1);
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    newMessage();
    setInputValue('');
    getAllMessages(emailUser);
    setAtt(att + 1);
    socket.emit('adminMsg');
  };

  const handleChangeMessage = (value) => {
    setInputValue(value);
  };

  return (
    <div>
      <h1>Chat Admin</h1>
      <div>
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
