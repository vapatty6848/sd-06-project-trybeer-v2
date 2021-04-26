import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getMessages } from '../services/chatService';
import { formatMessage } from '../utils';
import socket from '../utils/socketClient';
import MenuAdmin from '../components/MenuAdmin';

function AdminChat({ match }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { id } = match.params;

  const fetchMessages = async () => {
    const msg = await getMessages(id);
    setMessages(msg);
    setIsLoading(false);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const formatedMessage = formatMessage(message, id, 'Loja');
    setMessage('');
    socket.emit('sendMessage', formatedMessage);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    socket.emit('connectRoom', id);

    socket.on('receivedMessage', (data) => {
      setMessages([...messages, data]);
      console.log(messages);
    });
  }, [messages]);

  return (
    !isLoading
      ? (
        <div>
          <MenuAdmin />
          <div className="orders-container">
            <Link to="/admin/chats" data-testid="back-button">Voltar</Link>
            <div>
              {messages.map((msg, index) => (
                <div key={ index }>
                  <p data-testid="text-message">{ msg.message }</p>
                  <span data-testid="nickname">{ msg.user }</span>
                  <span>{'  -  '}</span>
                  <span data-testid="message-time">{ msg.hour }</span>
                </div>
              ))}
            </div>
            <form>
              <input
                data-testid="message-input"
                type="text"
                placeholder="Envie sua mensagem ..."
                value={ message }
                onChange={ (e) => handleMessage(e) }
              />
              <button
                data-testid="send-message"
                type="submit"
                onClick={ (e) => handleClick(e) }
              >
                Botão
              </button>
            </form>
          </div>
        </div>
      ) : null
  );
}

AdminChat.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default AdminChat;
