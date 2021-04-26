import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ChatCard({ chatRoom, messages }) {
  const lastMessage = messages[messages.length -1].sentAt;
  return (
    <div data-testid="containerChat">
      <h2 data-testid="profile-name">
        { chatRoom }
      </h2>
      <p data-testid="last-message">
        { `Última mensagem às ${lastMessage}`}
      </p>
    </div>
  );
}

ChatCard.propTypes = {
  chatRoom: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
};

export default ChatCard;
