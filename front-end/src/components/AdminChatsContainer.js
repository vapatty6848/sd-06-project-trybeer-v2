import React from 'react';
import { PropTypes } from 'prop-types';

import AdminChatCard from './AdminChatCard';

export default function AdminChatContainer({ chats }) {
  const emptyChats = 'Nenhuma conversa por aqui.';

  return (
    <section className="admin-chats-container">
      { (chats.length < 1)
        ? <h4>{ emptyChats }</h4>
        : chats.map((chat, index) => (
          <AdminChatCard chat={ chat } index={ index } key={ chat.userId } />)) }
    </section>
  );
}

AdminChatContainer.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.any),
};

AdminChatContainer.defaultProps = {
  chats: [],
};
