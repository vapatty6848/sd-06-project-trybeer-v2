import React from 'react';
import PropTypes from 'prop-types';
import './checkbox.scss';

const Checkbox = ({ isSeller, setIsSeller }) => (
  <label class="checkbox-label" htmlFor="check">
    Quero vender
    <input
      class="checkbox"
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
