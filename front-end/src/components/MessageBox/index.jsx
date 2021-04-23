/* eslint-disable react/prop-types */
import React from 'react';
import './styles.css';

const MessageBox = ({ isMine, user, sentTime, message }) => {
  const positionMsg = (isMine) ? 'right-msg' : 'left-msg';
  return (
    <section className={ `msg-container ${positionMsg}` }>
      <section className="info-container">
        <p className="msg-name" data-testid="nickname">
          {user}
        </p>
        <p className="msg-date" data-testid="message-time">
          {sentTime}
        </p>
      </section>
      <section className="msg-text" data-testid="text-message">
        {message}
      </section>
    </section>
  );
};

export default MessageBox;
