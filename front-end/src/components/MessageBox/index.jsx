/* eslint-disable react/prop-types */
import React from 'react';
import './styles.css';

const MessageBox = ({ isMine, user, sentTime, message }) => {
  const positionMsg = (isMine) ? 'right-msg' : 'left-msg';
  return (
    <section className={ `msg-container ${positionMsg}` }>
      <section className="info-container">
        <p className="msg-name">
          {user}
        </p>
        <p className="msg-date">
          {sentTime}
        </p>
      </section>
      <section className="msg-text">
        {message}
      </section>
    </section>
  );
};

export default MessageBox;
