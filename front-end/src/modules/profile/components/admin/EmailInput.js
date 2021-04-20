import React from 'react';

function EmailInput(inputValue) {
  return (
    <div className="flex flex-col space-y-2">
      <p>Email*</p>
      <p
        data-testid="profile-email"
        className="border rounded-md p-2 bg-gray-300"
      >
        { inputValue }
      </p>
    </div>
  );
}

export default EmailInput;
