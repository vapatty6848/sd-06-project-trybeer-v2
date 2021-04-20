import React from 'react';

function RoleInput(setInputValue, inputValue) {
  const handleChange = ({ target }) => {
    const { name } = target;
    const value = target ? 'administrator' : 'client';
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <label htmlFor="role-ipt" className="flex space-x-2 items-center">
      <input
        id="role-ipt"
        type="checkbox"
        data-testid="signup-seller"
        name="role"
        value={ inputValue !== 'client' }
        onChange={ (target) => handleChange(target) }
        className="border rounded-md p-2 focus:outline-none
        focus:border-secondary-dark"
      />
      <p>Want to sell?</p>
      <p className="hidden">Quero vender</p>
    </label>
  );
}

export default RoleInput;
