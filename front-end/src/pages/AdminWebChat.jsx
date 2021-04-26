import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BeersAppContext from '../context/BeersAppContext';
import { AdminSideBarComponent } from '../components';
// import { AdminChatCardsComponent } from '../components';
import socket from '../Socket.io/socket';

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
        console.log('entrou no then');
        if (historyMessages.err) return;
        console.log('entrou no then e passou do err');
        setMessages(historyMessages);
      })
      .catch(() => console.log('entrou no catch'));

    return () => socket.emit('closeRoom', email);
  }, []);

  useEffect(() => {
    socket.on('message', (messageParam) => {
      console.log('messageParam', messageParam);
      const ola = [
        ...messages,
        {
          ...messageParam,
          cli: true,
        },
      ];
      setMessages(ola);
    });
  }, [messages]);

  const handleChange = ({ target: { value } }) => {
    setInput(value);
  };

  const submeterMessage = () => {
    const cli = false;
    socket.emit('message', { email, message: input, cli });
    console.log('entrou botão');
    const ola = [
      ...messages,
      {
        message: input,
        date: new Date(),
        cli,
      },
    ];
    setMessages(ola);
    setInput('');
  };

  const five = 5;

  return (
    <div>
      <AdminSideBarComponent />
      <button
        type="button"
        data-testid="back-button"
        onClick={ () => history.push('/admin/chats') }
      >
        Voltar
      </button>
      <h1>{ `Conversando com ${email}` }</h1>
      {
        messages.sort((a, b) => a.date - b.date)
          .map(({ message, date, cli }, index) => {
            const dateFormat = new Date(date);
            return (
              <div key={ index }>
                <p>
                  <span data-testid="nickname">
                    {cli ? email : 'Loja'}
                  </span>
                  {' '}
                  -
                  {' '}
                  <span data-testid="message-time">
                    {dateFormat.toLocaleTimeString().substring(0, five)}
                  </span>
                </p>
                <p data-testid="text-message">{message}</p>
              </div>
            )
          })
      };
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
        onClick={ submeterMessage }
      >
        Enviar
      </button>
    </div>
  );
}

export default AdminWebChat;
