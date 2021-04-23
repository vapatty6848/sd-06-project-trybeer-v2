import React from 'react';
import io from 'socket.io-client';
import MenuTop from '../../components/MenuTop';
import MessageBox from '../../components/MessageBox';
import FormMessage from '../../components/FormMessage';
import './styles.css';

// eslint-disable-next-line no-unused-vars
const socket = io('http://localhost:3001');

const Chat = () => {
  const messages = [
    { isMine: false, user: 'Bot', sentTime: '21:23', message: 'Olá, meu nome é Bot' },
    { isMine: true, user: 'Thiago', sentTime: '21:24', message: 'fala rôbo' },
    { isMine: true, user: 'Thiago', sentTime: '21:24', message: 'suave?' },
  ];
  return (
    <section className="chat-container">
      <MenuTop title="Chat" />
      {
        messages.map(({ isMine, user, sentTime, message }) => (
          <MessageBox
            key={ sentTime }
            isMine={ isMine }
            user={ user }
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
