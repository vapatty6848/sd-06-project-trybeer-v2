import React from 'react';

function Chat({ activeChat, setActiveChat }) {

  return (
    <div>
      <button
        data-testid="back-button"
        onClick={() => setActiveChat('')}
      >
        Voltar
      </button>
      Hello, {activeChat}
    </div>
  );
}

export default Chat;
