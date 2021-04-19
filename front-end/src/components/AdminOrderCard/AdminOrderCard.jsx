import React from 'react';
import PropTypes from 'prop-types';
import './AdminOrderCard.css';
import capitalize from '../../utils/capitalize';

export default function AdminOrderCard({ sale, index }) {
  const {
    id,
    delivery_address: deliveryAddress,
    delivery_number: deliveryNumber,
    total_price: totalPrice,
    status,
  } = sale;
  return (
    <a className="adminOrderCard" href={ `/admin/orders/${id}` }>
      <h2
        data-testid={ `${index}-order-number` }
      >
        Pedido
        {' '}
        {id}
      </h2>
      <p
        data-testid={ `${index}-order-address` }
      >
        {`${deliveryAddress}, ${deliveryNumber}`}
      </p>
      <div>
        <span
          data-testid={ `${index}-order-total-value` }
        >
          R$
          {' '}
          {(totalPrice).replace('.', ',')}
        </span>
        <span
          className={
            `itemStatus ${status === 'pendente' ? 'itemPending' : 'itemDelivered'}`
          }
          data-testid={ `${index}-order-status` }
        >
          {capitalize(status)}
        </span>
      </div>
    </a>
  );
}

AdminOrderCard.propTypes = {
  sale: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  delivery_address: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  delivery_number: PropTypes.string.isRequired,
  total_price: PropTypes.number.isRequired,
};
