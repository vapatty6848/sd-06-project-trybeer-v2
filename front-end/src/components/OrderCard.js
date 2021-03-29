import React from 'react';
import propTypes from 'prop-types';

function OrderCard({ indexId, orderId, date, totalValue }) {
  const changedPrice = totalValue.replace('.', ',');

  return (
    <div
      data-testid={ `${indexId}-order-card-container` }
      className="d-flex flex-sm-column w-100 justify-content-center mt-4"
    >
      <div
        className="border border-bottom w-100 m-4 rounded my-3
          shadow-sm btn-group order-card-main-div"
      >
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
