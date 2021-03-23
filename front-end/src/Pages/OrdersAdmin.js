import React, { useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import { MenuTop } from '../components';
// import { Link } from 'react-router-dom';

function OrdersAdmin({ history }) {
  const { validateToken } = useContext(Context);

  useEffect(() => {
    validateToken(history);
    // getAllOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <MenuTop title="Pedidos" />
    </div>
  );
}

OrdersAdmin.defaultProps = {
  history: '/admin/orders',
};

OrdersAdmin.propTypes = {
  history: propTypes.shape(),
};

export default OrdersAdmin;
