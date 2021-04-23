import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MenuTop from '../components/MenuTop';
import clientOrders from '../methods/clientOrders';
import Orderslist from '../components/OrdersList';

function Orders() {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const response = await clientOrders.getAll(user.token);
        console.log(response);
        console.log(orders)
        setOrders(response.orders);
      } else { history.push('/login'); }
    };
    fetchOrders();
  }, [history]);

  return (
    <div>
      <MenuTop title="TryBeer" />
      <h1 data-testid="top-title">Meus Pedidos</h1>
      <Orderslist orders={ orders } />
    </div>
  );
}

export default Orders;
