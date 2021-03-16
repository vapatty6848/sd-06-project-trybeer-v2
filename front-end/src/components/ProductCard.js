import React from 'react';
import propTypes from 'prop-types';

function ProductCard({ indexId, price, qtd, name, img }) {
  return (
    <div data-testid={ `${indexId}-product-card` }>
      <p data-testid={ `${indexId}-product-price` }>{price}</p>
      <img
        data-testid={ `${indexId}-product-img` }
        src={ img }
        alt="Product cover"
      />
      <p data-testid={ `${indexId}-product-name` }>{name}</p>
      <p data-testid={ `${indexId}-product-qtd` }>{qtd}</p>
      <button type="button" data-testid={ `${indexId}-product-plus` }>+</button>
      <button type="button" data-testid={ `${indexId}-product-minus` }>-</button>
    </div>
  );
}

ProductCard.propTypes = {
  indexId: propTypes.number.isRequired,
  price: propTypes.number.isRequired,
  qtd: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
};

export default ProductCard;
