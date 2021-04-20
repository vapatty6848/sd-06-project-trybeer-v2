import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../context/CartContext';

const CheckoutCart = () => {
  const { cart, history } = useContext(CartContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleTotalPrice = totalPrice.toFixed(2).replace('.', ',');

  useEffect(() => {
    const sumItems = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setTotalPrice(sumItems);
    setIsDisabled(cart.length === 0);
  }, [cart]);

  return (
    <footer className="">
      <div className="test">
        <div className="nova">
          <div>
            <button
              className="button is-success length-button-prod"
              type="button"
              data-testid="checkout-bottom-btn"
              onClick={ () => history.push('/checkout') }
              disabled={ isDisabled }
            >
              { `Ver Carrinho R$ ${handleTotalPrice}` }
            </button>
          </div>
          <div>
            <span
              data-testid="checkout-bottom-btn-value"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CheckoutCart;
