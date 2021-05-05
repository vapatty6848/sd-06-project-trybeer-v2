import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';

import AppContext from '../context/app.context';
import api from '../services';

import { Topbar, MessageInput, ChatMessage } from '../components';

import '../styles/Chat.css';

export default function Chat() {
  const { tokenContext: { token } } = useContext(AppContext);

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const ENDPOINT = process.env.REACT_APP_ENDPOINT || 'http://localhost:4001';
  const options = useMemo(() => ({ auth: { token } }), [token]);
  const socket = useMemo(() => api.chat(ENDPOINT, options), [options, ENDPOINT]);

  const sendMessage = useCallback((e) => {
    e.preventDefault();
    const newMessage = { nickname: token.email, message, timestamp: new Date() };
    socket.emit('chat:clientMessage', { msg: newMessage, token });
    setMessage('');
  }, [message, socket, token]);

  useEffect(() => {
    socket.emit('user:login', token);

    return () => socket.disconnect();
  }, [socket, token]);

  const getMessage = useCallback(({ target }) => setMessage(target.value), []);

  socket.on('chat:serverMessage', (msg) => {
    setMessageList([...messageList, msg]);
  });

  socket.on('server:storedMessages', (msgs) => {
    setMessageList(msgs);
  });

  const title = 'Atendimento';

  return (
    <div>
      <Topbar title={ title } />
      <MessageInput
        callback={ getMessage }
        sendMessage={ sendMessage }
        value={ message }
        className="client-msg-input"
      />
      <section className="chat-wrapper">
        { messageList.map((msg, i) => (
          <ChatMessage msg={ msg } key={ i } client={ token.email } />
        )) }
      </section>
    </div>
  );
}
