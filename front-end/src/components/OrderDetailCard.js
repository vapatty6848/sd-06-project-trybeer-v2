import React from 'react';
import propTypes from 'prop-types';

function OrderDetailCard({ indexId, quantity, name, unitPrice }) {
  // const changedPrice = unitPrice.replace('.', ',');
  // const changedPrice = parseFloat(unitPrice);

  const sumPrices = (price, qtd) => {
    const result = (parseFloat(price) * parseFloat(qtd)).toFixed(2);
    const resultString = result.toString();
    return resultString.replace('.', ',');
  };

  return (
    <div
      data-testid={ `${indexId}-order-card-container` }
      className="d-flex flex-sm-column justify-content-sm-between mx-5"
    >
      <div
        className="border border-bottom rounded my-3
          shadow-sm btn-group order-card-main-div"
      >
        <div
          className="d-flex flex-fill flex-sm-row
          justify-content-sm-between m-2 btn-group mr-4"
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
