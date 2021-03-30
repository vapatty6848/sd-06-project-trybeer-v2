import React from 'react';
import propTypes from 'prop-types';

function OrderDetailCard({ indexId, quantity, name, unitPrice }) {
  const sumPrices = (price, qtd) => {
    const result = (parseFloat(price) * parseFloat(qtd)).toFixed(2);
    const resultString = result.toString();
    return resultString.replace('.', ',');
  };
  const yellow = 'w-75 mx-auto my-2 btn-group sale-card';
  const brown = 'w-75 mx-auto my-2 btn-group brown-card';

  return (
    <div
      data-testid={ `${indexId}-order-card-container` }
      className="d-flex flex-sm-column justify-content-sm-between"
    >
      <div className={ indexId % 2 === 0 ? yellow : brown }>
        <div
          className="d-flex flex-fill flex-sm-row
          justify-content-sm-between btn-group mr-4 my-2"
        >
          <p
            className="p-content-oc ml-3"
            data-testid={ `${indexId}-product-qtd` }
          >
            {quantity}
          </p>
          <p className="p-content-oc" data-testid={ `${indexId}-product-name` }>{name}</p>
          <p className="p-content-oc" data-testid={ `${indexId}-product-total-value` }>
            {`R$ ${sumPrices(unitPrice, quantity)}`}
          </p>
        </div>
      </div>
    </div>
  );
}

OrderDetailCard.propTypes = {
  indexId: propTypes.number.isRequired,
  unitPrice: propTypes.string.isRequired,
  quantity: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
};
export default OrderDetailCard;
