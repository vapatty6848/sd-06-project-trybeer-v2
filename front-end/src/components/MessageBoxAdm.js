import React from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';

function MessageBox({ message, nickname, date, isMine }) {
  const position = (isMine) ? 'right-msg' : 'left-msg';
  return (
    <div className={ `msg ${position}` }>
      <div className="msg-bubble">
        <div className="msg-info">
          <div className="msg-info-name" data-testid="nickname">{ nickname }</div>
          <div className="msg-info-time" data-testid="message-time">
            { dateFormat(date, 'HH:MM') }
          </div>
        </div>

        <div className="msg-text" data-testid="text-message">
          { message }
        </div>
      </div>
    </div>
  );
}

MessageBox.propTypes = {
  isMine: PropTypes.bool.isRequired,
  nickname: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default MessageBox;
