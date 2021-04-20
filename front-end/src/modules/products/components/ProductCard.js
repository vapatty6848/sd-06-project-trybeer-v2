import React from 'react';
import PropTypes from 'prop-types';
import Buttons from './Buttons';

function ProductCard({ index, product }) {
  const { urlImage, name, price } = product;

  return (
    <div
      className="border rounded-md border-primary p-2 flex flex-col items-center"
    >
      <div className="w-50 h-50 border-gray-200 border p-2">
        <img
          data-testid={ `${index}-product-img` }
          src={ urlImage }
          className="round-md object-contain
            w-80 h-80 md:w-48 md:h-48 md:object-scale-down"
          alt={ name }
        />
      </div>
      <div className="flex flex-col">
        <p data-testid={ `${index}-product-price` }>
          <strong>{ `R$ ${price.replace('.', ',')}` }</strong>
        </p>
        <p data-testid={ `${index}-product-name` }>
          { name }
        </p>
        <Buttons
          index={ index }
          product={ product }
        />
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  index: PropTypes.number.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
