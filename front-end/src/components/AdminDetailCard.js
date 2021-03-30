import React from 'react';
import propTypes from 'prop-types';

function AdminDetailCard({ indexId, quantity, name, unitPrice }) {
  const sumPrices = (price, qtd) => {
    const result = (parseFloat(price) * parseFloat(qtd)).toFixed(2);
    const resultString = result.toString();
    return resultString.replace('.', ',');
  };
  const yellow = 'my-3 btn-group sale-card';
  const brown = 'my-3 btn-group brown-card';

  return (
    <div className="d-flex flex-sm-column justify-content-sm-between mx-5">
      <div className={ indexId % 2 === 0 ? yellow : brown }>
        <div
          className="d-flex flex-fill flex-sm-row
          justify-content-sm-between m-2 btn-group mr-2"
        >
          <p data-testid={ `${indexId}-product-qtd` }>{quantity}</p>
          <p data-testid={ `${indexId}-product-name` }>{name}</p>
          <p data-testid={ `${indexId}-product-total-value` }>
            {`R$ ${sumPrices(unitPrice, quantity)}`}
          </p>
          <span data-testid={ `${indexId}-order-unit-price` }>
            { `(R$ ${unitPrice.replace('.', ',')})` }
          </span>
        </div>
      </div>
    </div>
  );
}

AdminDetailCard.propTypes = {
  indexId: propTypes.number.isRequired,
  unitPrice: propTypes.string.isRequired,
  quantity: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
};
export default AdminDetailCard;
