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
      <h3>{`Pedido ${id}`}</h3>
      {!isFetching && <h5>{orderDetails[0].date}</h5>}
      {isFetching
        ? <h2>Loading...</h2>
        : orderDetails.map((detail, index) => (
          <OrderDetailCard
            key={ index }
            indexId={ index }
            quantity={ detail.quantity }
            name={ detail.name }
            unitPrice={ detail.unitPrice }
          />
        ))}
      {!isFetching && <h4>{`Total R$ ${orderDetails[0].totalValue}`}</h4>}
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
