import React from 'react';

export default function MessageBox() {
  return (
    <div>
      <div>
        <div>
          <div data-testid="nickname">Email</div>
          <div data-testid="message-time">Sent at</div>
        </div>
        <div data-testid="text-message">
          Mensagem
        </div>
      </div>
    </div>
  );
}
