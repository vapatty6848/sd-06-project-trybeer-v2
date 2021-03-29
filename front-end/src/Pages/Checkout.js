import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import { TotalPrice } from '../services';
import { MenuTop, CardCheckout } from '../components';

function Checkout({ history }) {
  const { cart, isFetching, setIsFetching, setStreet, totalValue, setNumber,
    handleDeleteClick, street, number, sucessmsg, validateToken,
    setTotalValue, handleCheckoutFinish,
  } = useContext(Context);
  const [isDisabled, setIsDisabled] = useState(true);

  const allPrices = cart.map((element) => element.totalPrice);
  const totalSum = TotalPrice(allPrices);

  useEffect(() => {
    validateToken(history);
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
    <div className="checkout-main-div">
      <MenuTop title="Finalizar Pedido" />
      <div>
        <h3 className="w-50 p-1 text-center mx-auto mt-2 mb-2">Produtos</h3>
        {isFetching ? (
          <h2 className="w-50 p-1 text-center mx-auto mb-3">Loading</h2>
        ) : handleCart()}
        <h4
          data-testid="order-total-value"
          className=" ml-5 pl-5 mr-0 mb-3"
        >
          {`Total R$ ${totalValue.toFixed(2).replace('.', ',')}`}
        </h4>
      </div>
      <div className="my-5 text-center">
        <h3 className="w-50 p-1 text-center mx-auto my-5">Endereço</h3>
        <form
          className="form-inline my-5 ml-3
        d-flex justify-content-sm-around flex-sm-wrap mb-5 text-center"
        >
          <label htmlFor="rua" className="mx-4">
            Rua:
            <input
              onChange={ ({ target }) => setStreet(target.value) }
              id="rua"
              type="text"
              data-testid="checkout-street-input"
              className="form-control ml-2"
            />
          </label>
          <label htmlFor="numero" className="mx-4">
            Número da casa:
            <input
              onChange={ ({ target }) => setNumber(target.value) }
              id="numero"
              type="number"
              data-testid="checkout-house-number-input"
              className="form-control ml-2 mb-4"
            />
          </label>
        </form>
      </div>
      <div className="w-50 p-1 fixed-bottom text-center mx-auto mb-3">
        <button
          data-testid="checkout-finish-btn"
          type="button"
          disabled={ isDisabled }
          onClick={ () => handleCheckoutFinish(history) }
          className={ isDisabled ? 'btn btn-light' : 'btn btn-success' }
        >
          Finalizar Pedido
        </button>
      </div>
      {sucessmsg ? <p>Compra realizada com sucesso!</p> : null}
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
