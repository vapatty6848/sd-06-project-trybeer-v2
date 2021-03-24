import React from 'react';
import propTypes from 'prop-types';

function AdminSaleCard({ indexId, saleId, street, number, totalValue, status }) {
  const changedPrice = totalValue.replace('.', ',');

  return (
    <div className="d-flex flex-sm-column justify-content-sm-between mx-5">
      <h4 data-testid={ `${indexId}-order-number` }>{`Pedido ${saleId}`}</h4>
      <div className="border border-bottom rounded my-3 shadow-sm btn-group">
        <div
          className="d-flex flex-fill flex-sm-row
          justify-content-sm-between m-2 btn-group mr-2"
        >
          <p data-testid={ `${indexId}-order-address` }>
            { `${street}, ${number}` }
          </p>
          <p data-testid={ `${indexId}-order-total-value` }>
            {`R$ ${changedPrice}`}
          </p>
          <p data-testid={ `${indexId}-order-status` }>{status}</p>
        </div>
      </div>
    </div>
  );
}

AdminSaleCard.propTypes = {
  indexId: propTypes.number.isRequired,
  saleId: propTypes.number.isRequired,
  street: propTypes.string.isRequired,
  number: propTypes.string.isRequired,
  status: propTypes.string.isRequired,
  totalValue: propTypes.string.isRequired,
};

export default AdminSaleCard;
