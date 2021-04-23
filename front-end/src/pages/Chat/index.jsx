import React, { useEffect, useState } from 'react';
import MessageBox from '../../components/MessageBox';
import FormMessage from '../../components/FormMessage';
import MenuTop from '../../components/MenuTop';
import socket from '../../utils/socketClient';
import './styles.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    socket.on('chat.receiveMessage', (data) => {
      setMessages([...messages, data]);
    });

    const { name } = JSON.parse(localStorage.getItem('user'));
    setUser(name);
  }, [messages]);

  return (
    <section className="chat-container">
      <MenuTop title="Trybeer" />
      {
        messages.map(({ userName, sentTime, message }, id) => (
          <MessageBox
            key={ id }
            isMine={ userName === user }
            user={ userName }
            sentTime={ sentTime }
            message={ message }
          />
        ))
      }
      <FormMessage />
    </section>
  );
};

export default Chat;
