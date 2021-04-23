import React, { useEffect, useState } from 'react';
import MessageBox from '../../components/MessageBox';
import FormMessage from '../../components/FormMessage';
import MenuTop from '../../components/MenuTop';
import socket from '../../utils/socketClient';
import './styles.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat.receiveMessage', (message) => {
      setMessages([{ message }]);
    });
  }, []);

  return (
    <section className="chat-container">
      <MenuTop title="Trybeer" />
      {
        messages.map(({ isMine, user, sentTime, message }, id) => (
          <MessageBox
            key={ id }
            isMine={ isMine || true }
            user={ user || 'Thiago' }
            sentTime={ sentTime || '00:00' }
            message={ message }
          />
        ))
      }
      <FormMessage />
    </section>
  );
};

export default Chat;
