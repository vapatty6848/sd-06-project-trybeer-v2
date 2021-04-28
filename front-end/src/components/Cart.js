import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TrybeerContext from '../context/TrybeerContext';
import formatedPrice from '../utils/formatedPrice';
import { TiShoppingCart } from 'react-icons/ti';
import './Cart.scss';

const Cart = () => {
  const { cart, getTotalPriceCart } = useContext(TrybeerContext);
  const history = useHistory();

  const disabledButton = getTotalPriceCart() === null || getTotalPriceCart() === '0.00';

  useEffect(() => {
    getTotalPriceCart();
  }, [cart, getTotalPriceCart]);

  return (
    <div className="cart-container">
      <p data-testid="checkout-bottom-btn-value">
        TOTAL
        <br />
        { formatedPrice(getTotalPriceCart()) }
      </p>
      <button
        className="cart-btn"
        data-testid="checkout-bottom-btn"
        type="button"
        onClick={ () => history.push('/checkout') }
        disabled={ disabledButton }
      >
        Ver Carrinho <TiShoppingCart />
      </button>
    </div>
  );
};

export default Cart;
