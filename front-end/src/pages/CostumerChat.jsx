import React, { useState, useContext, useEffect } from 'react';
import socket from '../Socket.io/socket';
import BeersAppContext from '../context/BeersAppContext';

function CostumerChat() {
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState('');
  const { user: { email } } = useContext(BeersAppContext);
  
  useEffect(() => {
    socket.emit('openRoom', email);
  }, []);

  useEffect(() => {
    socket.on('message', (messageParam) => { console.log('messageParam', messageParam) });
  }, [message]);

  const handleChange = ({ target: { value }}) => {
    setInput(value);
  }

  const submeterMessage = () => {
    socket.emit('message', { email, message: input });
    setInput('');
  }

  return (
    <div>
      <h1>Costumer Chat cli</h1>
      {
        message.map(({ email, message, hour }) => (
          <div>
            <p>{`${email} - ${hour}`}</p>
            <p>{message}</p>
          </div>
        ))
      }

      <input
        data-testid="message-input"
        type='text'
        placeholder='Digite...$'
        onChange={ handleChange }
        value={ input }
      />
      <button
        type='button'
        data-testid="send-message"
        onClick={ submeterMessage }
      >
        Enviar
      </button>
    </div>
  );
}

export default CostumerChat;
