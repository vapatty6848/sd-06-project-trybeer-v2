import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MenuSideBar from '../components/menuAdmin/MenuSideBar';

import api from '../services/api';
// import { valueTotal } from '../utils/checkoutUtils';

const AdminOrders = ({ history }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const user = JSON.parse(localStorage.user);
      const response = await api.getAllOrders(user.token);
      if (response.message) return history.push('/login');
      setOrders(response);
    }
    fetchOrders();
  }, [history]);

  const handleClick = (id) => {
    history.push(`/admin/orders/${id}`);
  };

  return (
    <div>
      <MenuSideBar />
      {orders.map((order, index) => (
        <div className="movie-card" key={ index }>
          <button type="button" onClick={ () => handleClick(order.id) }>
            <p data-testid={ `${index}-order-number` }>
              {`Pedido ${order.id}`}
            </p>
            <p data-testid={ `${index}-order-address` }>
              {`${order.deliveryAddress}, ${order.deliveryNumber}`}
            </p>
            <p data-testid={ `${index}-order-total-value` }>
              {`R$ ${order.totalPrice.replace('.', ',')}`}
            </p>
            <p data-testid={ `${index}-order-status` }>
              {order.status}
            </p>
          </button>
        </div>
      ))}
    </div>
  );
};

AdminOrders.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default AdminOrders;
