import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/chat.css';

function ChatMessage({ nickname, message, timestamp }) {
  const [title, setitle] = useState('user');
  const [messagebox, setmessagebox] = useState('listmessage');

  useEffect(() => {
    if (nickname === 'Loja') {
      setmessagebox('listmessageloja');
      setitle('userloja');
    }
  }, [messagebox, nickname, title]);

  return (
    <li className={ messagebox }>
      <div className={ title }>
        <span data-testid="nickname">{ `${nickname} - ` }</span>
        <span data-testid="message-time">
          { `${timestamp}` }
        </span>
      </div>
      <span data-testid="text-message" className="textmessage">
        { `${message}` }
      </span>
    </li>
  );
}

ChatMessage.propTypes = {
  nickname: PropTypes.string,
  message: PropTypes.string,
  timestamp: PropTypes.string,
}.isRequired;

export default ChatMessage;
