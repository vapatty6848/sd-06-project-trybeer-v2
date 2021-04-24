import React, { useEffect, useState } from 'react';
import FormMessage from '../components/FormMessage';
import MessageBox from '../components/MessageBox';
import { loadState } from '../utilities/localStorage';
import socket from '../utilities/socketClient';
import api from '../api/axiosApi';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import './chat.css';

function ChatMessager() {
  const [emailUser, setEmailUser] = useState('');
  const [roleUser, setRoleUser] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      console.log(data);
      setMessages([...messages, data]);
    });
  }, [messages]);

  useEffect(() => {
    const reciveEmail = loadState('user');
    setEmailUser(reciveEmail.email);
    setRoleUser(reciveEmail.role);

    api.reloadChat(reciveEmail.email)
      .then((response) => {
        const newArray = response.data.map((element) => ({ data: element.message, sendAt: element.timestamp }));
        setMessages(newArray);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <Header />
    <Navbar />
    <section className="msger">
      <header className="msger-header">
        <div className="msger-header-title">
          <i className="fas fa-comment-alt" />
          {' '}
          SimpleChat
        </div>
        <div className="msger-header-options">
          <span><i className="fas fa-cog" /></span>
        </div>
      </header>

      <main className="msger-chat">
        {messages.map(({ sendAt, data }, index) => (
          <MessageBox
            key={ index }
            isMine={ roleUser === 'client' }
            emailUser={ emailUser }
            sendAt={ sendAt }
            message={ data }
          />
        ))}
      </main>
      <FormMessage emailUser={ emailUser } />

    </section>
    </>
  );
}

export default ChatMessager;
