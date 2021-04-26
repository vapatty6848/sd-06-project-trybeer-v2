import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../services/socketClient';
import BodyChat from '../components/chatClient/BodyChat';
import FormChat from '../components/chatClient/FormChat';
import api from '../services/api';
import MenuSideBarAdm from '../components/menuAdmin/MenuSideBarAdm';

const ChatAdminDetails = () => {
  const { email } = JSON.parse(localStorage.user);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [user] = useState(email);
  const [chatMessagesBD, setChatMessagesBD] = useState([]);

  const [buttonDisable, setButtonDisable] = useState(true);
  // const [user, setUser] = useState(email);

  // const history = useHistory();

  const { id } = useParams();
  useEffect(() => {
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
    const from = 'admin';
    const dest = 'admin';
    const key = [from, dest].sort().join('-');
    socket.emit('connectRoom', key);
    socket.on('sendMessage', (mess) => {
      setChatMessages([...chatMessages, mess]);
    });
  }, [chatMessages]);

  const handleChange = ({ target }) => {
    setMessage(target.value);
  };

  const handleClick = (e) => {
    const { email: userEmail } = JSON.parse(localStorage.user);
    const from = userEmail;
    const dest = 'admin';
    const key = [from, dest].sort().join('-');
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
