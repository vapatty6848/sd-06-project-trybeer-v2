import React, { useState, useEffect, useContext, useCallback } from 'react';

import AppContext from '../context/app.context';
import api from '../services';

import { Topbar, MessageInput, ChatMessage } from '../components';

export default function Chat() {
  const { tokenContext: { token } } = useContext(AppContext);

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = useCallback((e) => {
    e.preventDefault();
    const newMessage = { nickname: token.email, message, timestamp: new Date() };
    api.chat.emit('chat:clientMessage', { msg: newMessage, token });
    setMessage('');
  }, [message, token]);

  useEffect(() => {
    api.chat.emit('user:login', token.token);
  }, [token]);

  const getMessage = useCallback(({ target }) => setMessage(target.value), []);

  api.chat.on('chat:serverMessage', (msg) => {
    setMessageList([...messageList, msg]);
  });

  api.chat.on('user:storedMessages', (msgs) => {
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
      />
      { messageList.map((msg, i) => <ChatMessage msg={ msg } key={ i } />) }
    </div>
  );
}
