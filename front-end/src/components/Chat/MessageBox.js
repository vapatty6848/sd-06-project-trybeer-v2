import React from 'react';

function MessageBox({ message, nickname, sentAt }) {
  return (
    <div>
      <div>
        <span data-testid="nickname">{ nickname }</span>
        <span data-testid="message-time">{ sentAt }</span>
      </div>
      <p data-testid="text-message">{ message }</p>
    </div>
  );
}

export default MessageBox;
