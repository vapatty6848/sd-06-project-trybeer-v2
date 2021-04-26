import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MenuTop from '../components/menuAdmin/MenuSideBarAdm';
import socket from '../services/socketClient';
// import BodyChat from '../components/chatClient/BodyChat';
// import FormChat from '../components/chatClient/FormChat';

function ChatAdmin() {
  const history = useHistory();
  const { email } = JSON.parse(localStorage.user);
  // const [message, setMessage] = useState('');
  // const [buttonDisable, setButtonDisable] = useState(true);
  // const [chatMessages, setChatMessages] = useState([]);
  const [user, setUser] = useState(email);

  useEffect(() => {
    const { email: userEmail, role } = JSON.parse(localStorage.user);
    console.log(userEmail);
    if (!email || role !== 'administrator')history.push('/login');
    socket.emit('login', user);
    socket.on('socketNick', (userNick) => {
      setUser(userNick);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (message.length > 0)setButtonDisable(false);
  //   else setButtonDisable(true);
  //   socket.on('sendMessage', (mess) => {
  //     setChatMessages([...chatMessages, mess]);
  //   });
  // }, [chatMessages, message]);

  // const handleChange = ({ target }) => {
  //   setMessage(target.value);
  // };

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   const inputMessage = document.querySelector('#message');
  //   inputMessage.value = '';
  //   setMessage('');
  //   socket.emit('message', message);
  // };

  return (
    <div>
      <div>
        <MenuTop name="Trybeer Chat" />
      </div>
      <div className="chat">
        <p>Lista de Conversas</p>
      </div>
    </div>
  );
}

export default ChatAdmin;
