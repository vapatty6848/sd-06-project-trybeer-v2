import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ChatMessage from '../components/ChatMessage';
import SideBarAdm from '../components/SideBarAdm';
import socket from '../utils/socketClient';

function ChatAdminUser({ match }) {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const { role } = JSON.parse(localStorage.getItem('user'));
  const { nickname: userNickname } = match.params;
  const history = useHistory();

  useEffect(() => {
    socket.emit('getMessages', { email: userNickname });
  }, [userNickname]);

  useEffect(() => {
    socket.on('message', (data) => {
      setChatMessages([...data]);
    });
  }, [chatMessages]);

  const handleSubmit = () => {
    const nickname = role === 'administrator' ? 'Loja' : userNickname;
    const messageToSend = {
      nickname,
      message,
      email: userNickname,
    };

    socket.emit('message', messageToSend);
    setMessage('');
  };

  const handleChange = (e) => setMessage(e.target.value);

  return (
    <div>
      <SideBarAdm />
      <br />
      <br />
      <button
        type="button"
        style={ { marginLeft: 225 } }
        data-testid="back-button"
        onClick={ () => history.push('/admin/chats') }
      >
        Voltar
      </button>
      <span>
        {` Conversa com ${userNickname}`}
      </span>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ul style={ { marginLeft: 200 } }>
        {chatMessages.map((chatMessage, index) => (
          <ChatMessage
            key={ index }
            nickname={ chatMessage.nickname }
            message={ chatMessage.message }
            timestamp={ chatMessage.timestamp }
          />
        ))}
      </ul>
      <input
        style={ { marginLeft: 250 } }
        data-testid="message-input"
        value={ message }
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="send-message"
        onClick={ handleSubmit }
      >
        Send
      </button>
    </div>
  );
}

ChatAdminUser.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      nickname: PropTypes.string,
    }),
  }),
}.isRequired;

export default ChatAdminUser;
