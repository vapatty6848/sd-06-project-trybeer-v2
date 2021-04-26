import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { GlobalContext } from '../../Contexts/GlobalContext';

import MenuTopAdmin from '../../Components/MenuTopAdmin';
import SideBarAdmin from '../../Components/SideBarAdmin';
import S from '../AdminOrderDetails/styles';
import socket from '../../utils/socketClient';
import { saveMessage, getMessages } from '../../Services/Apis';
import MessagesBox from '../../Components/MessagesBox';

function AdminChatTalks({ location: { pathname } }) {
  const { stateSideBarAdmin } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const generateTimeStamp = () => {
    const dateOptions = Intl.DateTimeFormat(
      'en-gb',
      {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      },
    ).formatToParts(new Date());
    const dateParts = {};

    dateOptions.forEach(({ type, value }) => {
      dateParts[type] = value;
    });

    const { hour, minute } = dateParts;

    return `${hour}:${minute}`;
  };

  const renderOldMessages = async () => {
    const oldMessagesData = await getMessages();
    const oldMessages = oldMessagesData.find((oldMessage) => oldMessage.email === email);
    const messagesList = [];

    if (oldMessages && email) {
      oldMessages.messages.forEach((oldMessage) => {
        oldMessage.email = oldMessages.email;
        messagesList.push(oldMessage);
      });
    }
    setMessages(messagesList);
    setIsLoading(false);
  };

  useEffect(() => {
    const dataStorage = localStorage.getItem('user');
    const { email: localStorageEmail, role: localStorageRole } = JSON.parse(dataStorage);
    setEmail(localStorageEmail);
    setRole(localStorageRole);
  }, []);

  useEffect(() => {
    renderOldMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    const timestamp = generateTimeStamp();
    saveMessage(message, email, timestamp, role);
    socket.emit('sendMessage', { data: { message, email, timestamp, role } });
    setMessage('');
  };

  useEffect(() => {
    socket.on('receiveMessage', ({ data }) => {
      setMessages([...messages, {
        message: data.message,
        email: data.email,
        timestamp: data.timestamp,
        role: data.role,
      }]);
    });
  }, [messages]);

  return (
    <S.Container>

      <MenuTopAdmin dataTestid="top-title" title="Meu perfil" />

      <S.Context>

        <SideBarAdmin />

        <S.ContainerCard stateSideBarAdmin={ stateSideBarAdmin }>
          { isLoading ? <p>Carregando mensagens</p> : (
            <MessagesBox
              messages={ messages }
              pathname={ pathname }
              clientEmail={ email }
            />
          ) }
          <form onSubmit={ handleSendMessage }>
            <input
              type="text"
              value={ message }
              onChange={ ({ target: { value } }) => setMessage(value) }
              data-testid="message-input"
            />
            <button
              type="submit"
              data-testid="send-message"
            >
              Enviar
            </button>
          </form>
        </S.ContainerCard>

      </S.Context>

    </S.Container>
  );
}

AdminChatTalks.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default AdminChatTalks;
