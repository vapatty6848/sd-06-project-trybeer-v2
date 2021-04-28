import React from 'react';
import PropTypes from 'prop-types';
import formatPrice from '../service/formatPrice';
import statusConvert from '../service/statusConvert';
import statusConvertCss from '../service/statusConvertCss';
import '../style/OrderCardsAdmin.css';

function AdminOrdersCardsComponent({ element, index }) {
  const {
    id,
    totalPrice,
    status,
    deliveryAddress,
    deliveryNumber,
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
          className={ statusConvertCss(statusConvert(status)) }
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
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
    totalPrice: PropTypes.number,
  }).isRequired,
};

export default AdminOrdersCardsComponent;
