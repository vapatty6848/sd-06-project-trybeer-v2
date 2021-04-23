import React from 'react';
import PropTypes from 'prop-types';
import currencyFormat from '../utils/currencyFormat';

function ProductCardAdm({ product, index }) {
  return (
    <div>
      <p>
        <span data-testid={ `${index}-product-qtd` }>
          {`${product.quantity} - `}
        </span>
        <span data-testid={ `${index}-product-name` }>
          {`${product.name}`}
        </span>
        <span data-testid={ `${index}-product-total-value` }>
          {currencyFormat(Number(product.totalPrice))}
        </span>
        <span data-testid={ `${index}-order-unit-price` }>
          {`(${currencyFormat(Number(product.price))})`}
        </span>
      </p>
    </div>
  );
}

export default ProductCardAdm;

ProductCardAdm.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
