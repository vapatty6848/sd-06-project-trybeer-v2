import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ isSeller, setIsSeller }) => (
  <label htmlFor="check">
    Quero vender
    <input
      type="checkbox"
      data-testid="signup-seller"
      checked={ isSeller }
      onClick={ () => setIsSeller(!isSeller) }
      id="check"
    />
  </label>
);

Checkbox.propTypes = {
  isSeller: PropTypes.bool.isRequired,
  setIsSeller: PropTypes.func.isRequired,
};

export default Checkbox;
