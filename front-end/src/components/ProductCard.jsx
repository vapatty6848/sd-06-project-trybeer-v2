import React from 'react';
import PropTypes from 'prop-types';
import currencyFormat from '../utils/currencyFormat';

function ProductCard({ product }) {
  return (
    <div>
      {product.map((e, i) => (
        <div key={ i }>
          <p data-testid={ `${i}-product-qtd` }>
            quantidade:
            {' '}
            {`${e.quantity} und`}
            {' '}
          </p>
          <p data-testid={ `${i}-product-name` }>
            {`nome do produto: ${e.name}`}
          </p>
          <p data-testid={ `${i}-product-total-value` }>
            subtotal: {' '} {currencyFormat(Number(e.totalPrice))}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.shape({
    map: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
};
