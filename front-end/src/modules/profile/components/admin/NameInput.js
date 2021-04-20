import React from 'react';

function NameInput(inputValue) {
  return (
    <div htmlFor="email-ipt" className="flex flex-col space-y-2">
      <p>Nome*</p>
      <p
        data-testid="profile-name"
        className="border rounded-md p-2 bg-gray-300"
      >
        { inputValue }
      </p>
    </div>
  );
}

export default NameInput;
