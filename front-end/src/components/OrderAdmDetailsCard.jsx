import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductCardAdm from './ProductCardAdm';
import currencyFormat from '../utils/currencyFormat';
import updateStatus from '../methods/updateStatus';

function OrderDetailsCard({ orderDetails }) {
  const [update, setUpdate] = useState(orderDetails[0]);
  let visible = true;

  if (orderDetails[0] && orderDetails[0].status === 'Entregue') {
    console.log('Já estava entregue');
    visible = false;
  }
  if (update && update.status === 'Entregue') {
    console.log('mudou para entregue');
    orderDetails[0].status = update.status;
    visible = false;
  }

  if (orderDetails[0]) {
    return (

      <div>
        <div>
          <span data-testid="order-number">{`Pedido ${orderDetails[0].saleId}`}</span>
          <span data-testid="order-status">{` - ${orderDetails[0].status}`}</span>
        </div>
        <div>
          {orderDetails.map(
            (product) => (<ProductCardAdm
              product={ product }
              key={ product.name }
            />),
          )}
          <p data-testid="order-total-value">
            total do pedido:
            {' '}
            {currencyFormat(Number(orderDetails[0].totalPrice))}
            {' '}
          </p>
          <hr />
        </div>
        { visible
        && (
          <button
            data-testid="mark-as-delivered-btn"
            type="button"
            onClick={ async () => setUpdate(await updateStatus(orderDetails[0])) }
          >
            Marcar como entregue
          </button>
        ) }
      </div>);
  }
  return <p>...loading </p>;
}

OrderDetailsCard.propTypes = {
  orderDetails: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default OrderDetailsCard;
