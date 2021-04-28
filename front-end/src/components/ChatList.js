import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import TrybeerContext from '../context/TrybeerContext';

function ChatList({ chats }) {
  const { setActiveChat } = useContext(TrybeerContext);

  return (
    <div>
      {chats[0] ? chats.map(({ from, dest, date }, index) => (
        <div
          data-testid="containerChat"
          key={ index }
          onClick={ () => setActiveChat(from === 'tryber@trybe.com.br' ? dest : from) }
        >
          <p data-testid="profile-name">{from}</p>
          <p data-testid="last-message">
            Última mensagem às
            {' '}
            {dateFormat(date, 'HH:MM')}
          </p>
        </div>
      )) : (
        <p data-testid="text-for-no-conversation">
          Nenhuma conversa por aqui
        </p>
      )}
    </div>
  );
}

ChatList.propTypes = {
  chats: PropTypes.shape(PropTypes.array).isRequired,
};

export default ChatList;
