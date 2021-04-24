import React, { useContext } from 'react';
import BeersAppContext from '../context/BeersAppContext';

function AdminChatCardsComponent() {
  const { user } = useContext(BeersAppContext); 
  
  return (
    <div>
      <p>{ user.email }</p>
      <p>{`Última mensagem às ${date}`}</p>
    </div>
  );
}

export default AdminChatCardsComponent;
