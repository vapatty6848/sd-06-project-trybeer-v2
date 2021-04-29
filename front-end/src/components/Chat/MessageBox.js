import React from 'react';
import PropTypes from 'prop-types';

import './MessageBox.css';

function MessageBox({ message, nickname, sentAt, isMine }) {
  const positionClass = (isMine) ? 'rightMsg' : 'leftMsg';

  return (
    <div className={ `msg ${positionClass}` }>
      <div>
        <span className="text" data-testid="nickname">{ nickname }</span>
        <span className="text" data-testid="message-time">{ sentAt }</span>
      </div>
      <p className="textMessage" data-testid="text-message">{ message }</p>
    </div>
  );
}

MessageBox.propTypes = {
  nickname: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  sentAt: PropTypes.string.isRequired,
  isMine: PropTypes.bool.isRequired,
};

export default MessageBox;
