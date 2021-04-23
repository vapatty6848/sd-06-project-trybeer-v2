import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const MessageBox = ({ isMine, email, sentTime, message }) => {
  const positionMsg = (isMine) ? 'right-msg' : 'left-msg';
  return (
    <section className={ `msg-container ${positionMsg}` }>
      <section className="info-container">
        <p className="msg-name" data-testid="nickname">
          {email}
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

MessageBox.propTypes = {
  isMine: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  sentTime: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
