import React from 'react';

function EmailInput(setError, setInputValue) {
  const pattern = /\S+@\S+\.\S+/;

  // const useDebounce = (value, delayValue) => {
  //   const [debouncedValue, setDebouncedValue] = useState(value);

  //   useEffect(() => {
  //     const handler = setTimeout(() => setDebouncedValue(value), delayValue);
  //     return () => clearTimeout(handler);
  //   }, [value, delayValue]);

  //   return debouncedValue;
  // };

  // const debounceValue = useDebounce(inputValue, delay);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const validation = pattern.test(value);
    setInputValue((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: !validation }));
  };

  // useEffect(() => {
  //   if (errorLabel !== undefined && inputValue !== '') {
  //     setErrorLabel(!pattern.test(inputValue));
  //   }
  // }, [debounceValue]);

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="email-ipt" className="flex flex-col space-y-2">
        <p>Email*</p>
        <input
          id="email-ipt"
          data-testid="email-input"
          name="email"
          type="text"
          // value={ inputValue }
          onChange={ handleChange }
          className="border rounded-md p-2 focus:outline-none
          focus:border-secondary-dark"
          placeholder="Enter your email..."
          required
        />
      </label>
    </div>
  );
}

export default EmailInput;
