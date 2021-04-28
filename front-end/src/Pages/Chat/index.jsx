import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { BiChat } from 'react-icons/bi';
import MenuTop from '../../Components/MenuTop';
import SideBar from '../../Components/SideBar';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import MessagesBox from '../../Components/MessagesBox';

import socket from '../../utils/socketClient';
import { saveMessage, getMessages } from '../../Services/Apis';

import S from './styles';

function Chat({ location: { pathname } }) {
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

      <MenuTop />

      <SideBar />

      <S.ContainerCard>
        <S.ChatContainer>
          <S.ContainerMessages>
            { isLoading ? <p>Carregando mensagens</p> : (
              <MessagesBox
                messages={ messages }
                pathname={ pathname }
                clientEmail={ email }
              />
            ) }
          </S.ContainerMessages>
          <form onSubmit={ handleSendMessage }>
            <Input
              id="input-message"
              label=""
              type="text"
              value={ message }
              onChange={ ({ target: { value } }) => setMessage(value) }
              dataTestid="message-input"
              icon={ BiChat }
            />
            <Button
              type="submit"
              heigth="40px"
              color="green"
              fontSize="20px"
              dataTestid="send-message"
            >
              Enviar
            </Button>
          </form>
        </S.ChatContainer>
      </S.ContainerCard>
    </S.Container>
  );
}

Chat.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default Chat;
