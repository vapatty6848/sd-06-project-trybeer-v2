import React, { useState, useEffect } from 'react';

function PasswordInput(setError, setInputValue, inputValue) {
  const [errorLabel, setErrorLabel] = useState(false);
  const [seePassword, setSeePassword] = useState(true);
  const pattern = /^[0-9]{6,}$/;
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

      <label htmlFor="password-ipt" className="flex flex-col space-y-2">
        <p>Password*</p>
        <p className="hidden">Senha</p>
        <div className="flex space-x-2 items-center">
          <input
            id="password-ipt"
            data-testid="signup-password"
            name="password"
            type={ !seePassword ? 'password' : 'text' }
            value={ inputValue }
            onChange={ handleChange }
            className="border rounded-md p-2 focus:outline-none
            focus:border-secondary-dark"
            placeholder="Enter your password..."
            required
            onKeyUp={ () => setErrorLabel(false) }
          />
          <button
            className="w-4 h-4 rounded-full bg-secondary focus:outline-none"
            type="button"
            onClick={ () => setSeePassword((prev) => !prev) }
          >
            <p className="hidden">Icone</p>
          </button>
        </div>
      </label>
      <p className={ errorLabel ? 'text-xs text-red-500' : 'hidden' }>
        At least  6 numbers
      </p>
    </div>
  );
}

export default PasswordInput;
