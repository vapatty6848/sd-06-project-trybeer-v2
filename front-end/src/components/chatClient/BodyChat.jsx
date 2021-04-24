import React from 'react';
import PropTypes from 'prop-types';

function BodyChat({ data, user }) {
  return (
    <div id="chat">
      {data.map((dataMsg, index) => (
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BodyChat;
