import React from 'react';
import PropTypes from 'prop-types';
import '../styles/chat.css';

function ChatMessage({ nickname, message, timestamp }) {
  return (
    <li className="listmessage">
      <div className="user">
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
