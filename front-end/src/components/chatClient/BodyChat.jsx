import React from 'react';
import PropTypes from 'prop-types';

function BodyChat({ data, dataBD, user }) {
  return (
    <div id="chat">
      {dataBD.length > 0 && dataBD.map((dataHistoric, index) => (
        <div key={ index }>
          <p data-testid="nickname">{dataHistoric.nickname}</p>
          <p data-testid="message-time">{dataHistoric.hour}</p>
          <p data-testid="text-message">{dataHistoric.message}</p>
        </div>
      ))}
      {data.length > 0 && data.map((dataMsg, index) => (
        <div key={ index }>
          <p data-testid="nickname">{user}</p>
          <p data-testid="message-time">{dataMsg.hour}</p>
          <p data-testid="text-message">{dataMsg.message}</p>
        </div>
      ))}
    </div>);
}

BodyChat.propTypes = {
  user: PropTypes.string.isRequired,
  dataBD: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BodyChat;
