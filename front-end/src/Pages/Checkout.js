import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import { TotalPrice } from '../services';
import { MenuTop, CardCheckout } from '../components';

function Checkout({ history }) {
  const { cart, isFetching, setIsFetching, setStreet, totalValue, setNumber,
    handleDeleteClick, street, number, sucessmsg, setSucessmsg,
    setTotalValue, setCart,
  } = useContext(Context);
  const [isDisabled, setIsDisabled] = useState(true);
  const time = 3000;

  const allPrices = cart.map((element) => element.totalPrice);
  const totalSum = TotalPrice(allPrices);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTotalValue(totalSum);
    // eslint-disable-next-line
  }, [totalSum]);

  function handleCart() {
    if (cart.length === 0) {
      return <h4>Não há produtos no carrinho</h4>;
    }
    return cart.map((product, index) => (
      <CardCheckout
        indexId={ index }
        price={ product.price }
        name={ product.nome }
        qtd={ product.qtd }
        key={ index }
        onClick={ () => handleDeleteClick(product) }
      />
    ));
  }

  function handleCheckoutFinish() {
    setSucessmsg(true);
    setCart([]);
    localStorage.removeItem('Cart');
    setTimeout(() => {
      setSucessmsg(false);
      history.push('/products');
    }, time);
  }

  useEffect(() => {
    if (cart.length > 0) {
      setIsFetching(false);
    } else {
      handleCart();
    }
    // eslint-disable-next-line
  }, [cart]);

  useEffect(() => {
    if (cart.length > 0 && street && number) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [cart, street, number]);

  return (
    <div>
      <MenuTop title="Finalizar Pedido" />
      <div>
        <h3>Produtos</h3>
        {isFetching ? (
          <h2>Loading</h2>
        ) : handleCart()}
        <h4
          data-testid="order-total-value"
        >
          {`Total R$ ${totalValue.toFixed(2).replace('.', ',')}`}
        </h4>
      </div>
      <div>
        <h3>Endereço</h3>
        <label htmlFor="rua">
          Rua:
          <input
            onChange={ ({ target }) => setNumber(target.value) }
            id="rua"
            type="text"
            data-testid="checkout-street-input"
          />
        </label>
        <label htmlFor="numero">
          Número da casa:
          <input
            onChange={ ({ target }) => setStreet(target.value) }
            id="numero"
            type="number"
            data-testid="checkout-house-number-input"
          />
        </label>
      </div>
      <div>
        <button
          data-testid="checkout-finish-btn"
          type="button"
          disabled={ isDisabled }
          onClick={ () => handleCheckoutFinish() }
        >
          Finalizar Pedido
        </button>
        {sucessmsg ? <p>Compra realizada com sucesso! </p> : null}
      </div>
    </div>
  );
}

Checkout.defaultProps = {
  history: '/checkout',
};

Checkout.propTypes = {
  history: propTypes.shape(),
};

export default Checkout;
