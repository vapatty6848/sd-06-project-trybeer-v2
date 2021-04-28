import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './styleChat.css';

export default function ListaDeConversas() {
  const [users, setUsers] = useState([]);

  const callAllMessages = async () => {
    const allMessages = await fetch('http://localhost:4001/chat/messages');
    const allMsg = await allMessages.json();
    console.log(allMsg);
    const teste = allMsg.filter((el) => el.user !== 'Loja');
    setUsers(teste);
  };

  useEffect(() => {
    callAllMessages();
  }, []);

  return (
    <div>
      {users.length === 0
        ? (
          <h3 data-testid="text-for-no-conversation">
            Nenhuma conversa por aqui
          </h3>
        )
        : (
          <div>
            {users && users.map((element, index) => (
              <Link className="link" to={ `/admin/chats/${element.user}` } key={ index }>
                <div className="conversas" data-testid="containerChat">
                  <p data-testid="profile-name">{element.user}</p>
                  <p data-testid="last-message">{element.lastMessage}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      <Header title="TryBeer" user="admin" />
    </div>
  );
}
