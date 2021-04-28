import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TiArrowBack } from 'react-icons/ti';

import S from './style';

function MessagesBox({ messages, pathname, clientEmail }) {
  return (
    <S.ListUl>
      { pathname.includes('admin') && (
        <S.AdminInfo>
          <Link to="/admin/chats" data-testid="back-button">
            <TiArrowBack />
          </Link>
          <p>{ `Conversando com ${clientEmail}` }</p>
        </S.AdminInfo>
      ) }
      { messages.length === 0
        ? <p data-testid="text-for-no-conversation">Nenhuma conversa por aqui</p>
        : messages.map(({ message, email, timestamp, role }, index) => (
          <li key={ index } className={ role }>
            <div>
              <span data-testid="nickname">
                { role === 'administrator' ? 'Loja' : email }
              </span>
              { ' - ' }
              <span data-testid="message-time">{ timestamp }</span>
              <p data-testid="text-message">{ message }</p>
            </div>
          </li>
        )) }
    </S.ListUl>
  );
}

MessagesBox.defaultProps = {
  clientEmail: null,
};

MessagesBox.propTypes = {
  messages: PropTypes.instanceOf(Array).isRequired,
  pathname: PropTypes.string.isRequired,
  clientEmail: PropTypes.string,
};

export default MessagesBox;
