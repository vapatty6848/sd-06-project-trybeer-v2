import React from 'react';

function MessageBox({ isMine, emailUser, sendAt, message }) {
  const positionClass = (isMine) ? 'right-msg' : 'left-msg';
  return (
    <div className={ `msg ${positionClass}` }>
      <div className="msg-bubble">
        <div className="msg-info">
          <div
            className="msg-info-name"
            data-testid="nickname"
          >
            {emailUser}
          </div>
          <div
            className="msg-info-time"
            data-testid="message-time"
          >
            {sendAt}
          </div>
        </div>
        <div className="msg-text" data-testid="text-message">
          {message}
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
