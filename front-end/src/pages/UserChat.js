import React from 'react';
import TopBar from '../components/SideBarClient/TopBar';
import FormMessage from '../components/Chat/FormMessage';

function UserChat() {
  return (
    <div>
      <TopBar title="TryBeer" />
      Chat do usuário
      <FormMessage />
    </div>
  );
}

export default UserChat;
