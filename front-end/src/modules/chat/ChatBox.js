import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ChatBox = ({ messages, handleSend, userInfo }) => {
  const [currMessage, setCurrMessage] = useState('');

  const handleChange = (text) => setCurrMessage(text);

  const handleEnter = (input) => {
    handleSend(currMessage);
    setCurrMessage('');
    input.value = '';
  };

  return (
    <div>
      Chat Publico
      <div>
        {
          messages.map((message, index) => (
            <div key={ `message-${index}` }>
              <p data-testid="message-time">{ message.time }</p>
              <span data-testid="nickname">{ userInfo.email }</span>
              <p data-testid="text-message">{ message.currMessage }</p>
            </div>
          ))
        }
      </div>
      <input
        onChange={ ({ target }) => handleChange(target.value) }
        placeholder="Digite..."
        data-testid="message-input"
        id="msg-input"
        onKeyPress={ (e) => {
          if (e.key === 'Enter') {
            const msgTarget = e.target;
            handleEnter(msgTarget);
          }
        } }
      />
      <button
        data-testid="send-message"
        type="button"
        onClick={ () => {
          const msgInput = document.getElementById('msg-input');
          handleEnter(msgInput);
        } }
      >
        Enviar
      </button>
    </div>
  );
};

ChatBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSend: PropTypes.func.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ChatBox;
