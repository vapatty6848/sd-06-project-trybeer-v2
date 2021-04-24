import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuAdmin from '../components/MenuAdmin';
import { findUsers } from '../services/chatService';

function AdminChats() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    const usersFetch = await findUsers();
    setUsers(usersFetch);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    !isLoading
      ? (
        <div>
          <MenuAdmin />
          <div className="orders-container">
            <h2>Conversas</h2>
            {users.length === 0
              ? <p data-testid="text-for-no-conversation">Nenhuma conversa por aqui</p>
              : users.map((item, index) => (
                <div data-testid="containerChat" key={ index }>
                  <Link to={ `/admin/chats/${item}` }>
                    <p data-testid="profile-name">{ item }</p>
                  </Link>
                </div>
              ))}
          </div>
        </div>)
      : null
  );
}

export default AdminChats;
