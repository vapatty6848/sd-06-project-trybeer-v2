import React, { useContext, useState, useEffect } from 'react';

import AppContext from '../context/app.context';
import { Topbar, Loading, AdminChatsContainer } from '../components';
import api from '../services';

import '../styles/AdminChat.css';

export default function AdminChat() {
  const { tokenContext: { token } } = useContext(AppContext);
  const [chats, setChats] = useState();

  useEffect(() => {
    api.chat.emit('admin:login', token.token);
  }, [token]);

  api.chat.on('admin:storedChats', (storedChats) => {
    setChats(storedChats);
  });

  if (!chats) return <Loading />;

  return (
    <section>
      <Topbar title="Pedidos" />
      <AdminChatsContainer chats={ chats } />
    </section>
  );
}
