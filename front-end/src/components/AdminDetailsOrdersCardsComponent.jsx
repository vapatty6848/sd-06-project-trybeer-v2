import React from 'react';
import PropTypes from 'prop-types';
import formatPrice from '../service/formatPrice';
import '../style/OrdersDetailsAdmin.css';

function AdminDetailsOrdersCardsComponent({ element, index }) {
  const { productPrice, quantity, name, price } = element;
  return (
    <div className="admin_orders_details_list">
      <p>
        <span data-testid={ `${index}-product-qtd` }>{ quantity }</span>
        {' '}
        <span data-testid={ `${index}-product-name` }>{ name }</span>
        {' '}
        <span data-testid={ `${index}-product-total-value` }>
          { `R$ ${formatPrice(productPrice)}` }
        </span>
        {' '}
        <span data-testid={ `${index}-order-unit-price` }>
          { `(R$ ${formatPrice(price)})` }
        </span>
      </p>
    </div>
  );
}

AdminDetailsOrdersCardsComponent.propTypes = {
  element: PropTypes.shape({
    quantity: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    productPrice: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default AdminDetailsOrdersCardsComponent;
