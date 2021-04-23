import React, { useContext, useState, useEffect, useMemo } from 'react';

import AppContext from '../context/app.context';
import { Topbar, Loading, AdminChatsContainer } from '../components';
import api from '../services';

import '../styles/AdminChat.css';

export default function AdminAllChats() {
  const { tokenContext: { token } } = useContext(AppContext);
  const [chats, setChats] = useState();

  const ENDPOINT = 'http://localhost:4001';
  const options = useMemo(() => ({ auth: { token } }), [token]);
  const socket = useMemo(() => api.chat(ENDPOINT, options), [options]);

  useEffect(() => {
    socket.emit('admin:login');
  }, [socket, token]);

  socket.on('admin:storedChats', (storedChats) => {
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
