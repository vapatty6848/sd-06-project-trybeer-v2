import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuAdmin from '../components/MenuAdmin';
import { findUsers, getMessages } from '../services/chatService';

function AdminChats() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLastMessage = async () => {
    users.forEach(async (item) => {
      const message = await getMessages(item);
      setMessages(...messages, [message[message.length - 1]]);
    });
  };

  const fetchUsers = async () => {
    const usersFetch = await findUsers();
    await setUsers(usersFetch);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchLastMessage();
    setIsLoading(false);
  }, [users]);

  return (
    !isLoading
      ? (
        <div>
          <MenuAdmin />
          <div className="orders-container">
            <h2>Conversas</h2>
            {users.length === 0
              ? <p data-testid="text-for-no-conversation">Nenhuma conversa por aqui</p>
              : messages.length > 0 && users.map((item, index) => (
                <div data-testid="containerChat" key={ index }>
                  <Link to={ `/admin/chats/${item}` }>
                    <p data-testid="profile-name">{ item }</p>
                    <p data-testid="last-message">{messages[index].hour}</p>
                  </Link>
                </div>
              ))}
          </div>
        </div>)
      : null
  );
}

export default AdminChats;
