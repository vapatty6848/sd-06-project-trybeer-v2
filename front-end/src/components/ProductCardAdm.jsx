import React from 'react';
import PropTypes from 'prop-types';
import currencyFormat from '../utils/currencyFormat';

function ProductCardAdm({ product }) {
  return (
    <div>
      <p>
        <span data-testid={ `${product.id - 1}-product-qtd` }>
          {`${product.quantity} - `}
        </span>
        <span data-testid={ `${product.id - 1}-product-name` }>
          {`${product.name}`}
        </span>
        <span data-testid={ `${product.id - 1}-product-total-value` }>
          {currencyFormat(Number(product.totalPrice))}
        </span>
        <span data-testid={ `${product.id - 1}-order-unit-price` }>
          {`(${currencyFormat(Number(product.price))})`}
        </span>
      </p>
    </div>
  );
}

export default ProductCardAdm;

ProductCardAdm.propTypes = {
  product: PropTypes.shape({
    productName: PropTypes.string.isRequired,
    productQuantity: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    productPrice: PropTypes.string.isRequired,
  }).isRequired,
};
