import React, { useEffect, useState } from 'react';

function AddressInput(setError, setInputValue, inputValue) {
  const [errorLabel, setErrorLabel] = useState();
  const pattern = /.+/;
  const delay = 500;

  const useDebounce = (value, delayValue) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delayValue);
      return () => clearTimeout(handler);
    }, [value, delayValue]);

    return debouncedValue;
  };

  const debounceValue = useDebounce(inputValue, delay);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const validation = pattern.test(value);
    setInputValue((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: !validation }));
  };

  useEffect(() => {
    if (errorLabel !== undefined && inputValue !== '') {
      setErrorLabel(!pattern.test(inputValue));
    }
  }, [debounceValue]);

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="address-ipt" className="flex flex-col space-y-2">
        <p>Address*</p>
        <input
          id="address-ipt"
          data-testid="checkout-street-input"
          name="address"
          type="text"
          value={ inputValue }
          onChange={ handleChange }
          className="border rounded-md p-2 focus:outline-none
          focus:border-secondary-dark"
          placeholder="Enter your address..."
          required
          onKeyUp={ () => setErrorLabel(false) }
        />
      </label>
      <p className={ errorLabel ? 'text-xs text-red-500' : 'hidden' }>
        Address should contains street and city
      </p>
    </div>
  );
}

export default AddressInput;
