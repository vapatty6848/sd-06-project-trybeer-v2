import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MenuTop from '../components/menuClient/MenuTop';
import socket from '../services/socketClient';
import BodyChat from '../components/pageChat/BodyChat';
import FormChat from '../components/pageChat/FormChat';
import api from '../services/api';

function ChatClient() {
  const { email: userEmail, role } = JSON.parse(localStorage.user);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [user] = useState(userEmail);
  const [chatMessagesBD, setChatMessagesBD] = useState([]);

  const history = useHistory();
  const dest = 'Loja';
  const from = userEmail;
  const key = [from, dest].sort().join('-');
  const inputMessage = document.querySelector('#message');

  useEffect(() => {
    if (!userEmail || role !== 'client') history.push('/login');
    socket.emit('connectRoom', key);
    api.findMessagesById(key).then((response) => {
      setChatMessagesBD(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (message.length > 0) setButtonDisable(false);
    else setButtonDisable(true);
  }, [message]);

  useEffect(() => {
    socket.on('sendMessage', (mess) => {
      setChatMessages([...chatMessages, mess]);
    });
  }, [chatMessages]);

  const handleChange = ({ target }) => {
    setMessage(target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    inputMessage.value = '';
    setMessage('');
    const dataMessage = { message, from, dest, key };
    socket.emit('message', dataMessage);
    api.registerMessage(dataMessage);
  };

  const inputHandleKeyup = (e) => {
    e.preventDefault();
    inputMessage.value = '';
    setMessage('');
    const dataMessage = { message, from: user, dest, key };
    socket.emit('message', dataMessage);
    api.registerMessage(dataMessage);
  };

  return (
    <div>
      <div>
        <MenuTop name="Trybeer Chat" />
      </div>
      <div className="chat">
        <BodyChat
          data={chatMessages}
          dataBD={chatMessagesBD}
          user={user}
        />
      </div>
      <FormChat
        handleClick={handleClick}
        inputHandle={inputHandleKeyup}
        buttonDisable={buttonDisable}
      />
    </div>
  );
}

export default ChatClient;
