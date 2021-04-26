import React from 'react';
import PropTypes from 'prop-types';
import '../../css/FormsCheckout.css';

function FormsCheckout(props) {
  const { setAddress, address } = props;

  return (
    <div className="checkout-form">
      <div>
        <span>Rua: </span>
        <input
          data-testid="checkout-street-input"
          type="text"
          onChange={ (event) => setAddress({
            address: event.target.value,
            number: address.number,
          }) }
        />
      </div>
      <div>
        <span>Número da Casa: </span>
        <input
          data-testid="checkout-house-number-input"
          onChange={ (event) => setAddress({
            address: address.address,
            number: event.target.value,
          }) }
        />
      </div>
    </div>
  );
}

FormsCheckout.propTypes = {
  address: PropTypes.objectOf(PropTypes.string).isRequired,
  setAddress: PropTypes.func.isRequired,
};

export default FormsCheckout;
