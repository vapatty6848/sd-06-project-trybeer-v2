import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './AddressForm.scss';

const AddressForm = (props) => {
  const {
    setIsFormFilled,
    number,
    street,
    setNumber,
    setStreet,
  } = props;
  useEffect(() => {
    if (street && number) {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  }, [street, number, setIsFormFilled]);

  return (
    <form>
      <label htmlFor="street">
        Rua:
        <input
          data-testid="checkout-street-input"
          type="text"
          name="street"
          value={ street }
          onChange={ (e) => setStreet(e.target.value) }
        />
      </label>
      <label htmlFor="street">
        Número:
        <input
          data-testid="checkout-house-number-input"
          type="text"
          name="street"
          value={ number }
          onChange={ (e) => setNumber(e.target.value) }
        />
      </label>
    </form>
  );
};

AddressForm.propTypes = {
  setIsFormFilled: PropTypes.func.isRequired,
  number: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  setNumber: PropTypes.func.isRequired,
  setStreet: PropTypes.func.isRequired,
};

export default AddressForm;
