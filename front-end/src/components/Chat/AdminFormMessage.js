import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTelegramPlane } from 'react-icons/fa';
import socket from '../../utils/socketClient';

import './InputMessage.css';

function AdminFormMessage(props) {
  const [message, setMessage] = useState('');

  const handleSend = (event) => {
    event.preventDefault();
    const chatRoom = props.roomName;
    console.log('Props roomname', props.roomName);
    const nickname = 'Loja';
    socket.emit('chat.sendMessage', { chatRoom, message, nickname });
    setMessage('');
  };

  return (
    <div className="divMessage">
      <form onSubmit={ handleSend }>
        <input
          className="inputMessage"
          type="text"
          id="message-input"
          data-testid="message-input"
          placeholder="Digite uma mensagem..."
          onChange={ (event) => setMessage(event.target.value) }
          value={ message }
        />
        <button
          className="buttonSendMessage"
          type="submit"
          data-testid="send-message"
        >
          <FaTelegramPlane size={ 20 } />
        </button>
      </form>
    </div>
  );
}

AdminFormMessage.propTypes = {
  roomName: PropTypes.string.isRequired,
};

export default AdminFormMessage;
