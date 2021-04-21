import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { CheckoutCardsComponent, HeaderComponent } from '../components';
import BeersAppContext from '../context/BeersAppContext';
import fetchApiJsonBody from '../service/fetchApi';
import formatPrice from '../service/formatPrice';
import '../style/CostumerCheckout.css';

function CostumerCheckoutPage() {
  const history = useHistory();
  const {
    user,
    productQuantity,
    amount,
    setProductQuantity,
    setAmount,
    setReferenceSetTimeout,
  } = useContext(BeersAppContext);

  if (!user.token) history.push('/login');

  const [valid, setValid] = useState(false);
  const [inputValues, setInputValues] = useState({ street: '', number: '' });
  const [showMessage, setShowMessage] = useState('');
  const { street, number } = inputValues;

  const isValid = () => {
    if (street !== '' && number !== '' && productQuantity.length !== 0) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  useEffect(() => {
    isValid();
  }, [inputValues, productQuantity]);

  const handleChange = ({ target }) => {
    setInputValues({ ...inputValues, [target.name]: target.value });
  };

  const redirectingFinishedOrders = async () => {
    const salesProducts = productQuantity.map((objQuantity) => [
      objQuantity.id,
      objQuantity.qnt,
    ]);
    const returnCheckout = await fetchApiJsonBody(
      '/checkout',
      {
        deliveryAddress: inputValues.street,
        deliveryNumber: inputValues.number,
        salesProducts,
      },
      'POST',
      user.token,
    );
    if (returnCheckout.err) return setShowMessage(returnCheckout.err);
    const time = 2000;
    setShowMessage('Compra realizada com sucesso!');
    setProductQuantity([]);
    setAmount(0.0);

    const referenceSetTimeout = setTimeout(() => {
      history.push('/products');
    }, time);
    setReferenceSetTimeout(referenceSetTimeout);
  };

  return (
    <div>
      <HeaderComponent text="Finalizar Pedido" id="top-title" />
      <div className="costumer_checkout">
        <h1>Produtos</h1>
        <div className="costumer_checkout_product">
          {productQuantity.length === 0 && <p>Não há produtos no carrinho</p>}
          {productQuantity.map((element, index) => (
            <div key={ element.id }>
              <CheckoutCardsComponent element={ element } index={ index } />
            </div>
          ))}
        </div>
        <div className="costumer_checkout_total">
          <p>Total: </p>
          <p data-testid="order-total-value">{ `R$ ${formatPrice(amount)}` }</p>
        </div>
        <div className="costumer_checkout_address">
          <p>Endereço</p>
          <label htmlFor="street">
            Rua:
            <br />
            <input
              type="text"
              name="street"
              id="street"
              value={ street }
              onChange={ handleChange }
              data-testid="checkout-street-input"
            />
          </label>
          <label htmlFor="number">
            Número da casa:
            <br />
            <input
              type="text"
              name="number"
              id="number"
              value={ number }
              onChange={ handleChange }
              data-testid="checkout-house-number-input"
            />
          </label>
          <button
            type="button"
            data-testid="checkout-finish-btn"
            disabled={ valid }
            onClick={ redirectingFinishedOrders }
          >
            Finalizar Pedido
          </button>
          <span>{ showMessage }</span>
        </div>
      </div>
    </div>
  );
}

export default CostumerCheckoutPage;
