import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { CostumerOrdersCardsComponent } from '../components';
import HeaderComponent from '../components/HeaderComponent';
import BeersAppContext from '../context/BeersAppContext';
import socket from '../Socket.io/socket';
import '../style/CostumerOrder.css';

function CostumerOrdersPage() {
  const history = useHistory();
  const {
    user,
  } = useContext(BeersAppContext);

  if (!user.token) history.push('/login');

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    socket.on('statusUpdate', ({ id, status }) => {
      const AdminOrdersStatusUpdate = orders
        .map((element) => {
          if (element.id === parseInt(id, 10)) return { ...element, status };
          return element;
        });
      setOrders(AdminOrdersStatusUpdate);
    });
    return () => socket
      .off('statusUpdate', () => console.log('canal statusUpdate desconectado'));
  }, [orders]);

  useEffect(() => {
    fetch('http://localhost:3001/orders', {
      headers: {
        'Content-Type': 'application/json',
        authorization: user.token,
      },
    }).then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div>
      <HeaderComponent text="Meus Pedidos" />
      <div className="costumer_orders">
        <h1 data-testid="top-title">Meus Pedidos</h1>
        <div className="order-list-client">
          {orders.map((element, index) => (
            <div key={ element.id }>
              <Link to={ `/orders/${element.id}` }>
                <CostumerOrdersCardsComponent
                  element={ element }
                  index={ index }
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CostumerOrdersPage;
