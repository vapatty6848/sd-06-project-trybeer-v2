import React from 'react';
import propTypes from 'prop-types';

function OrderCard({ indexId, orderId, date, totalValue }) {
  const changedPrice = totalValue.replace('.', ',');
  const yellow = 'w-75 mx-auto my-2 btn-group sale-card';
  const brown = 'w-75 mx-auto my-2 btn-group brown-card';

  return (
    <div
      data-testid={ `${indexId}-order-card-container` }
      className="d-flex flex-sm-column w-100 justify-content-center mt-4"
    >
      <div className={ indexId % 2 === 0 ? yellow : brown }>
        <div
          className="d-flex flex-fill flex-sm-row
          justify-content-sm-around m-2 btn-group"
        >
          <p
            className="p-content-oc"
            data-testid={ `${indexId}-order-number` }
          >
            { `Pedido ${orderId}` }
          </p>
          <p className="p-content-oc" data-testid={ `${indexId}-order-date` }>{date}</p>
          <p className="p-content-oc" data-testid={ `${indexId}-order-total-value` }>
            {`R$ ${changedPrice}`}
          </p>
        </div>
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  indexId: propTypes.number.isRequired,
  orderId: propTypes.number.isRequired,
  date: propTypes.string.isRequired,
  totalValue: propTypes.string.isRequired,
};

export default OrderCard;
