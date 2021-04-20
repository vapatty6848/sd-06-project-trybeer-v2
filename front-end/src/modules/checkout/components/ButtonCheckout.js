import React from 'react';

function ButtonCheckout(errorMsg, errorForm) {
  return (
    <div className="w-full mt-10 flex flex-col space-y-2">
      <p
        className={ `bg-red-500 rounded-md p-2 text-center ${errorMsg ? '' : 'hidden'}` }
      >
        { errorMsg }
      </p>
      <button
        data-testid="checkout-finish-btn"
        className={ `rounded-md w-full p-2 ${(!errorForm.number
          && !errorForm.address) ? 'bg-secondary' : 'bg-gray-300'}
          focus:outline-none` }
        type="submit"
        disabled={ errorForm.address || errorForm.number }
      >
        <p className="hidden">CONFIRM</p>
        <p>Checkout</p>
      </button>
    </div>
  );
}

export default ButtonCheckout;
