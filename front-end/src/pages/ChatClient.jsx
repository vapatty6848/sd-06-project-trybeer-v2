import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import io from 'socket.io-client';
import MenuTop from '../components/menuClient/MenuTop';

const baseUrl = 'http://localhost:3001';
const socket = io(baseUrl);
// import { useHistory } from 'react-router';
// import MenuTop from '../components/menuClient/MenuTop';

// import CheckoutContext from '../context/CheckoutContext';
// import { checkoutUtils } from '../utils';

function ChatClient() {
  const { email } = JSON.parse(localStorage.user);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [user, setUser] = useState(email);

  const history = useHistory();

  useEffect(() => {
    socket.emit('login', user);
    socket.on('socketNick', (userNick) => {
      setUser(userNick);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (message.length > 0)setButtonDisable(false);
    else setButtonDisable(true);
    socket.on('sendMessage', (mess) => {
      setChatMessages([...chatMessages, mess]);
    });
  }, [chatMessages, message]);

  const handleChange = ({ target }) => {
    setMessage(target.value);
  };

  const handleClick = () => {
    const inputMessage = document.querySelector('#message');
    inputMessage.value = '';
    setMessage('');
    socket.emit('message', message);
  };

  return (
    <div>
      <div>
        <MenuTop name="Meus Pedidos" />
      </div>
      <div>
        <ul id="chat">
          {chatMessages.map((data, index) => (
            <div key={ index }>
              <p data-testid="nickname">{user}</p>
              <p data-testid="message-time">{data.hour}</p>
              <li data-testid="text-message">{data.message}</li>
            </div>
          ))}
        </ul>
      </div>
      <label htmlFor="message">
        <input
          type="text"
          onChange={ handleChange }
          id="message"
          data-testid="message-input"
        />
      </label>
      <button
        type="button"
        disabled={ buttonDisable }
        onClick={ handleClick }
        ata-testid="send-message"
      >
        Enviar
      </button>
    </div>
  );
}

export default ChatClient;
