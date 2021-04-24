import React from 'react';

function MessageBox({ isMine, emailUser, sendAt, message }) {
  const positionClass = (isMine) ? 'right-msg' : 'left-msg';
  return (
    <div className={ `msg ${positionClass}` }>
      <div className="msg-bubble">
        <div className="msg-info">
          <div className="msg-info-name">{emailUser}</div>
          <div className="msg-info-time">{sendAt}</div>
        </div>
        <div className="msg-text">
          {message}
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
