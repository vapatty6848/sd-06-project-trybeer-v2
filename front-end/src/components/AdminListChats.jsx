import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import admOrders from '../methods/admOrders';

function AdminListChats() {
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  const dateFormat = require('dateformat');

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const response = await admOrders.getAll(user.token);
        setOrders(response.orders);
      } else { history.push('/login'); }
    };
    fetchOrders();
  }, [history]);

  return (
    <div>
    <div>
      {orders.length === 0
        ? <p data-testid="text-for-no-conversation">Nenhuma conversa por aqui!</p>
        : orders.map(({email, date}, i) => (
          <div
            data-testid="containerChat"
            key={ i }
            className="paracss"
          >
            <p data-testid="profile-name">{email}</p>
            <p data-testid="last-message">
              Última mensagem às
              {dateFormat(date, 'HH:MM')}
            </p>
          </div>
        ))}
    </div>
  </div>
  );
}

export default AdminListChats;
