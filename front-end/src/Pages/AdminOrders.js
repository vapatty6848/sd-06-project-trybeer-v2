import React, { useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import { SideBar } from '../components';

function AdminOrders({ history }) {
  const { validateToken } = useContext(Context);

  useEffect(() => {
    validateToken(history);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <SideBar title="Pedidos" />
      <div className="adm-body">
        <h4>Pedidos</h4>
      </div>
    </div>
  );
}

AdminOrders.defaultProps = {
  history: '/admin/orders',
};

AdminOrders.propTypes = {
  history: propTypes.shape(),
};

export default AdminOrders;
