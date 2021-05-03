import React, { useState, useEffect } from 'react';
// import socket from '../utils/socketClient';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import fetches from '../services/fetches';
import useChat from '../utils/userChat';
import TopMenuAdmin from '../components/TopMenuAdmin';

const dateFormat = require('dateformat');

export default function AdminChat({ match }) {
  const { email } = match.params;
  const sentAt = new Date();
  const tokenFromLocalStorage = localStorage.getItem('token');
  const [message, setMessage] = useState('');
  const { messages, setMessages, sendMessage } = useChat(email, true);
  const history = useHistory();

  useEffect(() => {
    fetches.getAllPrivateMessagesByEmail(tokenFromLocalStorage, email)
      .then((response) => {
        setMessages(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return null;
    console.log('meu horário', sentAt);
    sendMessage(message);
    console.log('linha 23', messages);
    setMessage('');
  };

  return (
    <div>
      <TopMenuAdmin />
      <div>{`Conversas com o cliente ${email}`}</div>
      <button
        type="button"
        data-testid="back-button"
        onClick={ () => history.push('/admin/chats') }
      >
        Voltar
      </button>
      <form>
        <div>
          <input
            type="text"
            placeholder="Mensagem"
            data-testid="message-input"
            value={ message }
            onChange={ (event) => setMessage(event.target.value) }
            id="message-input"
          />
          <button
            type="submit"
            onClick={ handleSubmit }
            data-testid="send-message"
          >
            Enviar
          </button>
        </div>
      </form>
      { messages.length && messages.map((element, index) => {
        const origin = element.isAdmin ? 'Loja' : element.email;
        return (
          <div key={ index }>
            <div>
              <div data-testid="nickname">{`${origin}`}</div>
              <div data-testid="message-time">{dateFormat(element.sentAt, 'HH:MM')}</div>
            </div>
            <div data-testid="text-message">
              {element.message}
            </div>
          </div>);
      })}
      {/* {messages.map((element) => {
        const { sentAt: date, message: msg, isAdmin, email: userEmail } = element;
        const origin = isAdmin ? 'Loja' : userEmail;
        const msgOut = `${origin} : ${dateFormat(date, 'HH:MM')} - ${msg}`;
        return (
          <p key={ date + msg }>
            { msgOut }
          </p>
        );
      })} */}
    </div>
  );
}

AdminChat.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      email: PropTypes.string,
    }),
  }).isRequired,
};
