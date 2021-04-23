import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router';
import MenuTop from '../components/menuClient/MenuTop';
import socket from '../services/socketClient';
import BodyChat from '../components/chaClient/BodyChat';
import FormChat from '../components/chaClient/FormChat';

function ChatClient() {
  const { email } = JSON.parse(localStorage.user);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [user, setUser] = useState(email);

  // const history = useHistory();

  useEffect(() => {
    socket.emit('login', user);
    socket.on('socketNick', (userNick) => {
      setUser(userNick);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (message.length > 0)setButtonDisable(false);
    else setButtonDisable(true);
    socket.on('sendMessage', (mess) => {
      setChatMessages([...chatMessages, mess]);
    });
  }, [chatMessages, message]);

  const handleChange = ({ target }) => {
    setMessage(target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const inputMessage = document.querySelector('#message');
    inputMessage.value = '';
    setMessage('');
    socket.emit('message', message);
  };

  return (
    <div>
      <div>
        <MenuTop name="Trybeer Chat" />
      </div>
      <div className="chat">
        <BodyChat data={ chatMessages } user={ user } />
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
