import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import OrdersDetailsCard from '../components/orders/OrdersDetailsCard';
import MenuTop from '../components/menuClient/MenuTop';

import api from '../services/api';

const OrdersDetails = ({ match, history }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const { params: { id } } = match;

  useEffect(() => {
    async function fetchOrderDetails() {
      const user = JSON.parse(localStorage.user);
      const response = await api.getOrdersById(user.token, id);
      if (response.message) return history.push('/login');
      setOrderDetails(response);
    }
    fetchOrderDetails();
  }, [history, id]);

  return (
    <div>
      <MenuTop name="Detalhes de Pedido" />
      <div className="main-content-orders">
        <OrdersDetailsCard
          order={ orderDetails }
          id={ id }
        />
      </div>
    </div>
  );
};

OrdersDetails.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
  match: PropTypes.objectOf(Object).isRequired,
};

export default OrdersDetails;
