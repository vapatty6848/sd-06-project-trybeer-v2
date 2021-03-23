import React, { useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import { MenuTop, OrderDetailCard } from '../components';

function OrderDetail({ history, match }) {
  const { getOrderDetail, orderDetails, validateToken, isFetching } = useContext(Context);
  const { id } = match.params;

  useEffect(() => {
    validateToken(history);
    getOrderDetail(id);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <MenuTop title="Detalhes de Pedido" />
      {isFetching
        ? <h2>Loading...</h2>
        : orderDetails.map((detail, index) => (
          <OrderDetailCard
            key={ index }
            indexId={ index }
            quantity={ orderDetails.quantity }
            name={ orderDetails.name }
            unitPrice={ orderDetails.unitPrice }
          />
        ))}
    </div>
  );
}

OrderDetail.defaultProps = {
  history: '/orders',
};

OrderDetail.propTypes = {
  history: propTypes.shape(),
  match: propTypes.shape().isRequired,
};

export default OrderDetail;
