import React, { useState } from 'react';
import { createMessage } from '../services/chatService';
import { formatMessage, getEmailLocalStorage } from '../utils';
// import socket from '../services/socketClient';
// import MenuTop from '../components/MenuTop';

function ClientChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // useEffect(() => {

  // }, [messages]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = (data) => {
    const user = getEmailLocalStorage();
    const obj = { [user]: data };
    console.log(obj);
    createMessage(obj);
  };

  const handleClick = (e) => {
    const formatedMessage = formatMessage(message);
    e.preventDefault();
    const msgArray = [...messages, formatedMessage];
    setMessages(msgArray);
    setMessage('');
    sendMessage(msgArray);
  };

  return (
    <div>
      {/* <MenuTop title="Chat" /> */}
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
  );
}

export default ClientChat;
