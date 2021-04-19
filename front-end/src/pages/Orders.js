import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import OrdersCard from '../components/Orders/OrdersCard';
import TrybeerContext from '../context/TrybeerContext';
import TopBar from '../components/SideBarClient/TopBar';
import getOrders from '../services/ClientOrderService';

import './Orders.css';

function Orders() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  const { clientOrders, setOrders } = useContext(TrybeerContext);

  useEffect(() => {
    if (!user) return history.push('/login');

    async function fetchOrders() {
      const orders = await getOrders(user.email);
      setOrders(orders);
    }

    fetchOrders();
  }, []);

  function redirectDetails(id) {
    history.push(`/orders/${id}`);
  }

  return (
    <div>
      <TopBar title="Meus Pedidos" />
      { clientOrders.map((order, index) => (
        <div key={ index }>
          <button
            className="divPedidos"
            type="button"
            onClick={ () => redirectDetails(order.id) }
          >
            <OrdersCard
              index={ index }
              id={ order.id }
              date={ order.sale_date }
              total={ order.total_price }
            />
          </button>
        </div>
      )) }
    </div>
  );
}

export default Orders;
