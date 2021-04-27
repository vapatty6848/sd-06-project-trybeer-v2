import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../services/socketClient';
import BodyChat from '../components/chatClient/BodyChat';
import FormChat from '../components/chatClient/FormChat';
import api from '../services/api';
import MenuSideBarAdm from '../components/menuAdmin/MenuSideBarAdm';

const ChatAdminDetails = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatMessagesBD, setChatMessagesBD] = useState([]);
  const [user] = useState('Loja');
  const [buttonDisable, setButtonDisable] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    socket.emit('connectRoom', id);
    api.findMessagesById(id).then((response) => {
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
  }, [chatMessages]);

  const handleChange = ({ target }) => {
    setMessage(target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const dest = id.split('-').filter((nick) => nick !== user)[0];
    const key = [user, dest].sort().join('-');
    const inputMessage = document.querySelector('#message');
    inputMessage.value = '';
    setMessage('');
    const dataMessage = { message, from: user, dest, key };
    socket.emit('message', dataMessage);
    api.registerMessage(dataMessage);
  };

  return (
    <div>
      <div>
        <MenuSideBarAdm />
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
};

export default ChatAdminDetails;
