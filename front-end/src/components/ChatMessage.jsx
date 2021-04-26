import React from 'react';
import PropTypes from 'prop-types';

function ChatMessage({ nickname, message, timestamp }) {
  return (
    <li>
      <span data-testid="nickname">{ `${nickname} - ` }</span>
      <span data-testid="message-time">
        { `${timestamp}` }
        <br />
      </span>
      <span data-testid="text-message">
        { `${message}` }
        <br />
        <br />
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
