import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import socket from './socketClient';
import { verifyUser } from '../../store/LocalStorage/actions';
// import { sendMessage } from './Requests';
import './styleChat.css';

export default function ChatClient() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  // const [att, setAtt] = useState(0);
  const [emailUser, setEmail] = useState('');
  // socket.emit('message', 'minha mensagem incrivel!');
  // // recebe msg do back
  // socket.on('mensagem', (msg) => {
  //   console.log(msg, 'msg');
  // });

  // socket.on('Mensagem do admin pro cliente', () => {
  //   setAtt(att + 1);
  // });

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
    const hora = new Date().toLocaleTimeString().split(':');
    const time = `${hora[0]}:${hora[1]}`;
    console.log(time, emailUser, inputValue);
    socket.emit('message', ({
      user: emailUser,
      time,
      message: inputValue,
      Loja: 'Loja',
    }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    newMessage();
    setInputValue('');
    // getAllMessages(emailUser);
    // setAtt(att + 12);
    // socket.emit('clientMsg');
  };

  const handleChangeMessage = (value) => {
    setInputValue(value);
  };

  return (
    <div className="boxContainer">
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
