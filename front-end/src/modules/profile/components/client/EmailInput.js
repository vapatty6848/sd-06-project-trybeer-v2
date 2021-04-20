import React from 'react';

function EmailInput(inputValue) {
  return (
    <label htmlFor="email-ipt" className="flex flex-col space-y-2">
      <p>Email*</p>
      <input
        id="email-ipt"
        data-testid="profile-email-input"
        name="email"
        type="text"
        value={ inputValue }
        disabled
        readOnly
        className="border rounded-md p-2 bg-gray-300"
      />
    </label>
  );
}

export default EmailInput;
