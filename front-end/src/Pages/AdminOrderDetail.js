import React, { useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import { SideBar } from '../components';

function AdminOrderDetail({ history }) {
  const { validateToken } = useContext(Context);

  useEffect(() => {
    validateToken(history);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <SideBar title="Detalhes de Pedido" />
    </div>
  );
}

AdminOrderDetail.defaultProps = {
  history: '/admin/orders',
};

AdminOrderDetail.propTypes = {
  history: propTypes.shape(),
};

export default AdminOrderDetail;
