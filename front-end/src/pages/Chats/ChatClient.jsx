import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import socket from './socketClient';
import { verifyUser } from '../../store/LocalStorage/actions';

export default function ChatClient() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  socket.emit('message', 'minha mensagem incrivel!');
  // recebe msg do back
  socket.on('mensagem', (msg) => {
    console.log(msg, 'msg');
  });
  
  const history = useHistory();
  
  useEffect(() => {
    const { email } = verifyUser(history);
    const getAllMessages = async () => {
      const allMessages = await fetch(`http://localhost:4001/chat/userMessages/${email}`);
      
      // console.log(messages);
      
      setMessages(allMessages);
    }
    getAllMessages();
  }, [history]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    setInputValue('');
    console.log(e, 'eeeeee');
  };

  const handleChangeMessage = (value) => {
    setInputValue(value);
  };
  
  

  return (
    <div>
      <h1>Chat Client</h1>
      <div>
        <ul>
        </ul>
      </div>
      <form>
        <input
          type="text"
          data-testid="message-input"
          value={ inputValue }
          onChange={ ({ target }) => handleChangeMessage(target.value) }
        />
        <button
          type="submit"
          data-testid="send-message"
          onClick={ (e) => handleSendMessage(e) }
        >
          Send
        </button>
      </form>
    </div>
  );
}
