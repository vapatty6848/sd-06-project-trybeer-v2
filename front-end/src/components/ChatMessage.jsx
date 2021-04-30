import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/chat.css';

function ChatMessage({ nickname, message, timestamp }) {
  const [title, setitle] = useState('user');
  const [messagebox, setmessagebox] = useState('listmessage');
  const [ divM, setDivM] = useState('divU')

  useEffect(() => {
    if (nickname === 'Loja') {
      setmessagebox('listmessageloja');
      setitle('userloja');
      setDivM('divL')
    }
  }, [messagebox, nickname, title,divM]);

  return (
    <div className={divM}>
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
    </div>
  );
}

ChatMessage.propTypes = {
  nickname: PropTypes.string,
  message: PropTypes.string,
  timestamp: PropTypes.string,
}.isRequired;

export default ChatMessage;
