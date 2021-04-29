import React, { useContext } from 'react';
import TrybeerContext from '../../context/TrybeerContext';
import handleAddressInput from '../../services/addressService';

import './Address.css';

function Address() {
  const { address, setAddress } = useContext(TrybeerContext);
  return (
    <form className="formAddress">
      <fieldset className="field">
        <legend className="legend">Endereço</legend>
        <label className="label" htmlFor="checkout-street-input">
          Rua
          <br />
          <input
            className="inputAddress"
            id="rua"
            data-testid="checkout-street-input"
            type="text"
            onChange={ () => handleAddressInput(address, setAddress) }
          />
        </label>
        <br />
        <label className="label" htmlFor="checkout-house-number-input">
          Número da casa
          <br />
          <input
            className="inputAddress"
            id="numero"
            data-testid="checkout-house-number-input"
            type="text"
            onChange={ () => handleAddressInput(address, setAddress) }
          />
        </label>
      </fieldset>
    </form>
  );
}

export default Address;
