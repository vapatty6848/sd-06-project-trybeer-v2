import React from 'react';
import PropTypes from 'prop-types';
import formatPrice from '../service/formatPrice';
import statusConvert from '../service/statusConvert';
import '../style/OrderCardsAdmin.css';

function AdminOrdersCardsComponent({ element, index }) {
  const {
    id,
    total_price: totalPrice,
    status,
    delivery_address: deliveryAddress,
    delivery_number: deliveryNumber,
  } = element;

  return (
    <div className="orderCards">
      <div className="orderCards-first">
        <h4 data-testid={ `${index}-order-number` }>
          { `Pedido ${id}` }
        </h4>
        <p data-testid={ `${index}-order-address` }>
          { `${deliveryAddress}, ${deliveryNumber}` }
        </p>
      </div>
      <div className="orderCards-second">
        <h4 data-testid={ `${index}-order-total-value` }>
          { `R$ ${formatPrice(totalPrice)}` }
        </h4>
        <h3
          data-testid={ `${index}-order-status` }
          className={
            (statusConvert(status) === 'Entregue')
              ? 'greenStatusComponent'
              : 'redStatusComponent'
          }
        >
          { `${statusConvert(status)}` }
        </h3>
      </div>
    </div>
  );
}

AdminOrdersCardsComponent.propTypes = {
  index: PropTypes.number.isRequired,
  element: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    delivery_address: PropTypes.string,
    delivery_number: PropTypes.string,
    total_price: PropTypes.number,
  }).isRequired,
};

export default AdminOrdersCardsComponent;
