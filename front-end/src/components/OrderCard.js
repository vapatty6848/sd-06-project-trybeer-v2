import React from 'react';
import propTypes from 'prop-types';

function OrderCard({ indexId, orderId, date, totalValue }) {
  return (
    <div
      data-testid={ `${indexId}-order-card-container` }
      className="d-flex flex-sm-column justify-content-sm-between mx-5"
    >
      <div className="border border-bottom rounded my-3 shadow-sm btn-group">
        <div
          className="d-flex flex-fill flex-sm-row
          justify-content-sm-between m-2 btn-group mr-2"
        >
          <p data-testid={ `${indexId}-order-number` }>{ `Pedido ${orderId}` }</p>
          <p data-testid={ `${indexId}-order-date` }>{date}</p>
          <p data-testid={ `${indexId}-order-total-value` }>
            {`R$ ${totalValue}`}
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
