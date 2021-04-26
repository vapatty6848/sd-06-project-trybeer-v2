import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import OrdersDetailsCard from '../components/orders/OrdersDetailsCard';
import MenuTop from '../components/menuClient/MenuTop';

import api from '../services/api';

const OrdersDetails = ({ match }) => {
  const [orderDetails, setOrderDetails] = useState({});
  const history = useHistory();
  const { params: { id } } = match;

  useEffect(() => {
    const user = JSON.parse(localStorage.user);
    api.getOrdersById(user.token, id).then((response) => {
      if (response.message) return history.push('/login');
      console.log('response', response);
      setOrderDetails(response[0]);
    });
  }, [id]);

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
  match: PropTypes.objectOf(Object).isRequired,
};

export default OrdersDetails;
