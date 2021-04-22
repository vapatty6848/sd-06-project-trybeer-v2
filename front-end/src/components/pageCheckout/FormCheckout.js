import React, { useContext } from 'react';
import CheckoutContext from '../../context/CheckoutContext';

function FormCheckout() {
  const { handleChange, address } = useContext(CheckoutContext);

  return (
    <div>
      <label className="label" htmlFor="rua">
        Rua:
        <input
          className="input"
          type="text"
          id="rua"
          name="rua"
          value={ address.rua }
          onChange={ handleChange }
          data-testid="checkout-street-input"
        />
      </label>
      <label className="label" htmlFor="numero">
        Número da casa:
        <input
          className="input"
          type="number"
          id="numero"
          name="numero"
          value={ address.numero }
          onChange={ handleChange }
          data-testid="checkout-house-number-input"
        />
      </label>
    </div>
  );
}

export default FormCheckout;
