import React from 'react';
import { Link } from 'react-router-dom';

function AdminChatCardsComponent({ cliente }) {
  const dateFormat = new Date(cliente.date);
  const five = 5;

  return (
    <>
      <Link to={ `/admin/chats/${cliente.email}` }>
        <p data-testid="profile-name">{ cliente.email }</p>
        <p data-testid="last-message">
          { `Última mensagem às ${dateFormat.toLocaleTimeString().substring(0, five)}` }
        </p>
      </Link>
    </>
  );
}

export default AdminChatCardsComponent;
