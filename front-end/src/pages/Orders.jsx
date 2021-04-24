import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import OrdersCard from '../components/orders/OrdersCard';
import MenuTop from '../components/menuClient/MenuTop';

import api from '../services/api';

const Orders = ({ history }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      const user = JSON.parse(localStorage.user);
      api.getAllOrdersByUser(user.token).then((response) => {
        if (response.message) return history.push('/login');
        setOrders(response);
        setIsLoading(true);
      });
    }
    fetchOrders();
  }, [history]);

  return (
    isLoading
      ? (
        <div>
          <MenuTop name="Meus Pedidos" />
          <div className="movie-list">
            <OrdersCard orders={ orders } />
          </div>
        </div>
      ) : false
  );
};

Orders.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default Orders;
