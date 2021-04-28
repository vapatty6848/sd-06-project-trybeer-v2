import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BeersAppContext from '../context/BeersAppContext';
import { AdminSideBarComponent } from '../components';
import socket from '../Socket.io/socket';
import '../style/WebChat.css';

function AdminWebChat() {
  const { user: { token } } = useContext(BeersAppContext);
  const history = useHistory();

  const { email } = useParams();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.emit('openRoom', email);

    fetch(`http://localhost:3001/chat/admin/${email}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    }).then((response) => response.json())
      .then((historyMessages) => {
        console.log('historyMessages', historyMessages);
        if (historyMessages.err) return;
        setMessages(historyMessages);
      })
      .catch((err) => console.log(err));

    return () => socket.emit('closeRoom', email);
  }, []);

  useEffect(() => {
    socket.on('message', (messageParam) => {
      const messageShape = [
        ...messages,
        {
          ...messageParam,
          cli: true,
        },
      ];
      setMessages(messageShape);
    });
  }, [messages]);

  const handleChange = ({ target: { value } }) => {
    setInput(value);
  };

  const submitMessage = () => {
    const cli = false;
    const date = new Date();
    socket.emit('message', { email, message: input, cli, date });
    const messageShape = [
      ...messages,
      {
        message: input,
        date,
        cli,
      },
    ];
    setMessages(messageShape);
    setInput('');
  };

  const dateFormat = (date) => {
    const ten = 10;
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    if (minutes < ten) {
      return `${hours}:0${minutes}`;
    }
    return `${hours}:${minutes}`;
  };

  return (
    <div>
      <AdminSideBarComponent />
      <div className="constaine-adimin-chat">
        <div className="titleChatAdm">
          <button
            type="button"
            data-testid="back-button"
            onClick={ () => history.push('/admin/chats') }
          >
            Voltar
          </button>
          <h1>{ `Conversando com ${email}` }</h1>
        </div>
        {
          messages
            .map(({ message, date, cli }, index) => (
              <div
                key={ index }
                className={ cli ? 'messageCli' : 'message' }
              >
                <p>
                  <span data-testid="nickname">
                    {cli ? email : 'Loja'}
                  </span>
                  {' '}
                  -
                  {' '}
                  <span data-testid="message-time">
                    {dateFormat(date)}
                  </span>
                </p>
                <p data-testid="text-message">{message}</p>
              </div>
            ))
        }
        <div className="message-send-adm">
          <input
            data-testid="message-input"
            type="text"
            placeholder="Digite..."
            onChange={ handleChange }
            value={ input }
          />
          <button
            type="button"
            data-testid="send-message"
            onClick={ submitMessage }
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminWebChat;
