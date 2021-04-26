import React from 'react';
import PropTypes from 'prop-types';
import '../../css/TotalCheckout.css';

function TotalCheckout(props) {
  const { total } = props;
  return (
    <div>
      <p
        data-testid="order-total-value"
        className="order-total-value"
      >
        Total: R$
        { ` ${total.replace('.', ',')}` }
      </p>
    </div>
  );
}

TotalCheckout.propTypes = {
  total: PropTypes.number.isRequired,
};

export default TotalCheckout;
