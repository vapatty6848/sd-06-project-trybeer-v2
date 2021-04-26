import React from 'react';
const dateFormat = require('dateformat');

function ChatList({ chats, setActiveChat }) {

  return (
    <div>
      {chats[0] ? chats.map(({ nickname, date }, index) => (
        <div
          data-testid="containerChat"
          key={ index }
          onClick={() => setActiveChat(nickname)}
          >
          <p data-testid="profile-name">{nickname}</p>
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

export default ChatList;
