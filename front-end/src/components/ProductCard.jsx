import React from 'react';
import PropTypes from 'prop-types';
import currencyFormat from '../utils/currencyFormat';
import sales from '../methods/sales';

function ProductCard({ product })  {
return (
  <>
  {product.map((e,i) => {
    return <>
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
        subtotal:
        {' '}
        {currencyFormat(Number(e.totalPrice))}
      </p>
      <hr />
    </>
  })}
    </>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.shape({
    productName: PropTypes.string.isRequired,
    productQuantity: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    productPrice: PropTypes.string.isRequired,
  }).isRequired,
};
