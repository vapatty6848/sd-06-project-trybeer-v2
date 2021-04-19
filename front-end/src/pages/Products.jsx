import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import MenuTop from '../components/MenuTop';
import Cards from '../components/Cards';
import contextTrybeer from '../Context/ContextAPI';
import '../styles/cards.css';

export default function Products() {
  const { setProductsCart } = useContext(contextTrybeer);

  const history = useHistory();

  const [isDisabled, setIsDisabled] = useState(true);

  const productsCart = JSON.parse(localStorage.getItem('productsCart'));

  useEffect(() => {
    if (!productsCart || productsCart.length === 0) {
      setIsDisabled(true);
    } else if (productsCart.length > 0) {
      setIsDisabled(false);
    }
  }, [productsCart]);

  const user = localStorage.getItem('user');
  if (!user) return <Redirect to="login" />;

  const sumOfCart = (sum, product) => {
    setProductsCart(sum);
    return sum + product.qty * product.price;
  };

  const handleClick = () => {
    history.push('/checkout');
  };

  return (
    <div>
      <MenuTop title="TryBeer" />
      <Cards />
      <div className="container">
        <button
          type="button"
          className="btn btn-danger button-cart"
          disabled={ isDisabled }
          data-testid="checkout-bottom-btn"
          onClick={ handleClick }
        >
          Ver Carrinho
          <span
            data-testid="checkout-bottom-btn-value"
          >
            {
              ` ${((productsCart && productsCart.length > 0
                ? productsCart.reduce(sumOfCart, 0) : 0))
                .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
            }
          </span>
        </button>
      </div>
    </div>
  );
}
