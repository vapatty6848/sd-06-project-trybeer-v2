import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../../../context/Context';

function CartButton() {
  const { cartItems } = useContext(GlobalContext);

  let total = cartItems.reduce((acc, curr) => {
    const result = (acc + curr.quantity * curr.price);
    return result;
  }, 0);

  total = total.toFixed(2).replace('.', ',');

  return (
    <div>
      { cartItems.length > 0 && (
        <Link
          className="flex items-center w-full space-x-2
            bg-secondary rounded-md p-2 justify-center"
          to="/checkout"
          data-testid="checkout-bottom-btn"
          disabled={ total <= 0 }
        >
          <p>Ver Carrinho</p>
          <p data-testid="checkout-bottom-btn-value">
            { `R$ ${total}` }
          </p>
        </Link>
      )}
      { cartItems.length === 0 && (
        <button
          type="button"
          className="flex items-center w-full space-x-2
          bg-red-100 rounded-md p-2 justify-center"
          data-testid="checkout-bottom-btn"
          disabled
        >
          <p>Ver Carrinho</p>
          <p data-testid="checkout-bottom-btn-value">
            { `R$ ${total}` }
          </p>
        </button>
      ) }
    </div>
  );
}

export default CartButton;
