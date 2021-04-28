import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function ChatCard({ email, lastTimestamp }) {
  const history = useHistory();

  return (
    <li>
      <button
        type="button"
        data-testid="containerChat"
        onClick={ () => history.push(`/admin/chats/${email}`) }
        className="card-chat-adm"
      >
        <span data-testid="profile-name" className="title-chat">{email}</span>
        <span data-testid="last-message">{lastTimestamp}</span>
      </button>
    </li>
  );
}

ChatCard.propTypes = {
  email: PropTypes.string,
  lastTimestamp: PropTypes.string,
}.isRequired;

export default ChatCard;
