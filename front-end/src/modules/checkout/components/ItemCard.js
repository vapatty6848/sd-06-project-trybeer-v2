import React from 'react';
import PropTypes from 'prop-types';
import Buttons from './Buttons';
import ButtonRemove from './ButtonRemove';

function ItemCard({ index, item }) {
  const { price, urlImage, name, quantity } = item;
  const total = `R$ ${(price * quantity).toFixed(2).replace('.', ',')}`;
  const unitPrice = `(R$ ${price.replace('.', ',')} un)`;

  return (
    <div
      className="flex items-center space-x-2 border-primary border
        rounded-md overflow-hidden justify-between"
    >
      <div className="flex items-center space-x-2">
        <img
          src={ urlImage }
          className="round-md object-contain
            w-8 h-8 md:w-10 md:h-10 md:object-scale-down"
          alt={ name }
        />
        <p data-testid={ `${index}-product-name` }>
          { name }
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <p data-testid={ `${index}-product-unit-price` }>
          { unitPrice }
        </p>
        <Buttons
          index={ index }
          item={ item }
        />
        <p data-testid={ `${index}-product-total-value` }>
          { total }
        </p>
        <ButtonRemove
          data-testid={ `${index}-removal-button` }
          index={ index }
          item={ item }
        />
      </div>
    </div>
  );
}

ItemCard.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default ItemCard;
