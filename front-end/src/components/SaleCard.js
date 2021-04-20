import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

function SaleCard(props) {
  const { index, saleNumber, date, value, status } = props;
  const FIVE = 5;
  const MINUSFOURTEEN = -14;
  const history = useHistory();
  let correctDate = date.slice(FIVE, MINUSFOURTEEN);
  const arrayDate = correctDate.split('-');
  correctDate = `${arrayDate[1]}/${arrayDate[0]}`;

  return (
    <div className="salecard-card">
      <div
        data-testid={ `${index}-order-card-container` }
        onClick={ () => history.push(`/orders/${saleNumber}`) }
        aria-hidden="true"
      >
        <div className="order-side-info">
          <p
            className="bold-font"
            data-testid={ `${index}-order-number` }
          >
            { `Pedido ${saleNumber}` }
          </p>
          <p
            data-testid={ `${index}-order-date` }
          >
            { correctDate }
          </p>
        </div>
        <p
          className="bold-font"
          data-testid={ `${index}-order-total-value` }
        >
          { `R$ ${value.replace('.', ',')}` }
        </p>
        <span>{ status }</span>
      </div>
    </div>
  );
}

SaleCard.propTypes = {
  index: PropTypes.number.isRequired,
  saleNumber: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default SaleCard;
