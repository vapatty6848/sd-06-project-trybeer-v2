import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import AppContext from '../context/app.context';
import api from '../services';

import { Topbar, AdminMessageInput, ChatMessage } from '../components';

import '../styles/Chat.css';

export default function AdminChat({ location }) {
  const { tokenContext: { token } } = useContext(AppContext);
  const params = useParams();

  const currentClient = location.state.user;

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const ENDPOINT = process.env.REACT_APP_ENDPOINT || 'http://localhost:4001';
  const options = useMemo(() => ({ auth: { token } }), [token]);
  const socket = useMemo(() => api.chat(ENDPOINT, options), [options, ENDPOINT]);

  const sendMessage = useCallback((e) => {
    e.preventDefault();
    const newMessage = { nickname: token.email, message, timestamp: new Date() };
    socket.emit('admin:sendMessage',
      { msg: newMessage, client: currentClient, userId: params.roomId });
    setMessage('');
  }, [message, socket, token, currentClient, params.roomId]);

  useEffect(() => {
    socket.emit('admin:getRoomMessages', {
      client: currentClient,
      userId: params.roomId,
    });

    return () => socket.disconnect();
  }, [socket, currentClient, params.roomId]);

  const getMessage = useCallback(({ target }) => setMessage(target.value), []);

  socket.on('chat:serverMessage', (msg) => {
    setMessageList([...messageList, msg]);
  });

  socket.on('admin:storedRoomMessages', (msgs) => {
    setMessageList(msgs);
  });

  const title = 'Atendimento';

  return (
    <div>
      <Topbar title={ title } />
      <section className="admin-chat-header">
        <Link to="/admin/chats" data-testid="back-button">
          Voltar
        </Link>
        <h3>
          <span>Conversando com </span>
          { currentClient }
        </h3>
      </section>
      <AdminMessageInput
        callback={ getMessage }
        sendMessage={ sendMessage }
        value={ message }
        className="admin-msg-input"
      />
      <section className="chat-wrapper">
        { messageList.map((msg, i) => (
          <ChatMessage msg={ msg } key={ i } client={ currentClient } admin />
        )) }
      </section>
    </div>
  );
}

AdminChat.propTypes = {
  location: PropTypes.objectOf(PropTypes.any),
};

AdminChat.defaultProps = {
  location: {},
};
