import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';
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
      <div className="chatadmincontainer">
        <div className="title-chat-adm-user">
          <span>
            {` Conversa com ${userNickname}`}
          </span>
          <button
            type="button"
            data-testid="back-button"
            className="buttonback"
            onClick={ () => history.push('/admin/chats') }
          >
            Voltar
          </button>
        </div>
        <div className="chatmessage chatmessageadm">
          <ul className="ullist ullistadm">
            {chatMessages.map((chatMessage, index) => (
              <ChatMessage
                key={ index }
                nickname={ chatMessage.nickname }
                message={ chatMessage.message }
                timestamp={ chatMessage.timestamp }
              />
            ))}
          </ul>
        </div>
        <div className="submitmessage submitmessageadm">
          <input
            data-testid="message-input .inputmenssageadm"
            value={ message }
            onChange={ handleChange }
            className="inputmenssage "
            placeholder="Digite sua menssagem ..."
          />
          <IoArrowForwardCircleOutline
            type="button"
            data-testid="send-message"
            onClick={ handleSubmit }
            size={ 40 }
            color="#e9925c"
          />
        </div>
      </div>
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
