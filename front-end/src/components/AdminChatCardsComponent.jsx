import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function AdminChatCardsComponent({ cliente: { date, email } }) {
  const dateFormat = new Date(date);
  const five = 5;

  return (
    <Link to={ `/admin/chats/${email}` }>
      <p data-testid="profile-name">{ email }</p>
      <p data-testid="last-message">
        { `Última mensagem às ${dateFormat.toLocaleTimeString().substring(0, five)}` }
      </p>
    </Link>
  );
}

AdminChatCardsComponent.propTypes = {
  cliente: PropTypes.shape({
    date: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default AdminChatCardsComponent;
