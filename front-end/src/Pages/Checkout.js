import React, { useContext, useEffect } from 'react';
import CardCheckout from '../components/CardCheckout';
import MenuTop from '../components/MenuTop';
import Context from '../Context/Context';

function Checkout({ history }) {
  const {
    cart,
    isFetching,
    street,
    setStreet,
    number,
    setNumber,
    tokenInvalid
  } = useContext(Context);

  // useEffect(() => {
  //   if (tokenInvalid) {
  //     history.push('/');
  //   }
  // });

  return (
    <div>
      <MenuTop title="Finalizar Pedido" />
      <div>
        {isFetching ? (
          <h2>Loading</h2>
        ) : (
          <h3>Produtos</h3>
          && cart.map((product, index) => (
            <CardCheckout
              indexId={ index }
              price={ product.price }
              name={ product.nome }
              qtd={ product.qtd }
              key={ index }
              onClick={ () => console.log(product) }
            />
          ))
        )}
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
    </div>
  );
}

// verifyElementVisible('[data-testid="order-total-value"]');
// verifyElementVisible('[data-testid="checkout-finish-btn"]');

export default Checkout;
