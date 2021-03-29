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
    <div className="orders-main-div">
      <MenuTop title="Detalhes de Pedido" />
      <div className="text-center mx-auto">
        <h3 className="my-3" data-testid="order-number">{`Pedido ${id}`}</h3>
        {orderDetails.length > 0 && (
          <h5 data-testid="order-date">{orderDetails[0].date}</h5>)}
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
        {orderDetails.length > 0 && (
          <h4 className="my-3" data-testid="order-total-value">
            {`Total R$ ${orderDetails[0].totalValue.replace('.', ',')}`}
          </h4>
        )}
      </div>
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
