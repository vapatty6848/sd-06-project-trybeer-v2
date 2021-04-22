import React, { useState } from 'react';

const ChatBox = ({ messages, handleSend, userInfo }) => {
  const [currMessage, setCurrMessage] = useState('');

  const handleChange = (text) => setCurrMessage(text);

  const handleEnter = () => {
    handleSend(currMessage);
    setCurrMessage('');
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
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleEnter()
          }
        }}
      />
      <button
        data-testid="send-message"
        type="button"
        onClick={ () => handleEnter() }
      >
        Enviar
      </button>
    </div>
  );
};

export default ChatBox;