import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MenuTop from '../components/menuClient/MenuTop';
import socket from '../services/socketClient';
import BodyChat from '../components/chatClient/BodyChat';
import FormChat from '../components/chatClient/FormChat';
import api from '../services/api';

function ChatClient() {
  const { email: userEmail, role } = JSON.parse(localStorage.user);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [user, setUser] = useState(userEmail);
  const [chatMessagesBD, setChatMessagesBD] = useState([]);

  const history = useHistory();
  const dest = 'Loja';
  const from = userEmail;
  const key = [from, dest].sort().join('-');

  useEffect(() => {
    if (!userEmail || role !== 'client')history.push('/login');
    socket.emit('connectRoom', key);
    socket.emit('login', user);
    socket.on('socketNick', (userNick) => {
      setUser(userNick);
    });
    api.findMessagesById(key).then((response) => {
      setChatMessagesBD(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (message.length > 0)setButtonDisable(false);
    else setButtonDisable(true);
  }, [message]);

  useEffect(() => {
    socket.on('sendMessage', (mess) => {
      setChatMessages([...chatMessages, mess]);
    });
  }, [chatMessages, from, key, userEmail]);

  const handleChange = ({ target }) => {
    setMessage(target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const inputMessage = document.querySelector('#message');
    inputMessage.value = '';
    setMessage('');
    const dataMessage = { message, from, dest, key };
    socket.emit('message', dataMessage);
    api.registerMessage(dataMessage);
  };

  return (
    <div>
      <div>
        <MenuTop name="Trybeer Chat" />
      </div>
      <div className="chat">
        <BodyChat data={ chatMessages } dataBD={ chatMessagesBD } user={ user } />
      </div>
      <FormChat
        handleChange={ handleChange }
        handleClick={ handleClick }
        buttonDisable={ buttonDisable }
      />
    </div>
  );
}

export default ChatClient;
