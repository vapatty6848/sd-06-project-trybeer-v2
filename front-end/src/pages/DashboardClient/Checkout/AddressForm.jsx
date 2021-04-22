import React from 'react';
import PropTypes from 'prop-types';

const AddressForm = ({ handleChange }) => (
  <form>
    <label htmlFor="st">
      <h4>Rua:</h4>
      <input
        data-testid="checkout-street-input"
        type="text"
        id="st"
        onChange={ (e) => handleChange('st', e) }
      />
    </label>
    <br />
    <label htmlFor="numero">
      <h4>Número da casa:</h4>
      <input
        data-testid="checkout-house-number-input"
        type="text"
        id="numero"
        onChange={ (e) => handleChange('num', e) }
      />
    </label>
  </form>
);

AddressForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default AddressForm;
