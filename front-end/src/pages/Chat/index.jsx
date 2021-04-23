import React, { useEffect, useState } from 'react';
import MessageBox from '../../components/MessageBox';
import FormMessage from '../../components/FormMessage';
import MenuTop from '../../components/MenuTop';
import socket from '../../utils/socketClient';
import fechtMessages from '../../methods/getMessages'
import './styles.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    const fechtMsg = async () => {
      const dbMessages = await fechtMessages()
      setMessages(dbMessages);
    };
    fechtMsg();
  }, []);

  useEffect(() => {
    socket.on('chat.receiveMessage', (data) => {
      setMessages([...messages, data]);
    });

    const { email } = JSON.parse(localStorage.getItem('user'));
    setUser(email);
  }, [messages]);

  return (
    <section className="chat-container">
      <MenuTop title="Trybeer" />
      {
        messages.map(({ email, sentTime, message }, id) => (
          <MessageBox
            key={ id }
            isMine={ email === user }
            email={ email }
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
