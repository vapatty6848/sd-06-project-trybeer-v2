import React from 'react';
import PropTypes from 'prop-types';
import '../style/OrdersDetails.css';

function CostumerOrdersDetailsCardsComponent({ element, index }) {
  const { name, quantity, productPrice } = element;

  const commaAmount = (price) => `${price}`.replace('.', ',');

  return (
    <div className="ordersDetails">
      <p data-testid={ `${index}-product-qtd` }>{ quantity }</p>
      <p data-testid={ `${index}-product-name` }>{ name }</p>
      <p
        data-testid={ `${index}-product-total-value` }
      >
        { `R$ ${commaAmount(productPrice)}` }
      </p>
    </div>
  );
}

CostumerOrdersDetailsCardsComponent.propTypes = {
  index: PropTypes.number.isRequired,
  element: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.string,
    productPrice: PropTypes.string,
  }).isRequired,
};

export default CostumerOrdersDetailsCardsComponent;
