import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import CheckoutProductsCard from '../components/CheckoutProductsCard';
import productsContext from '../context/productsContext';
import fetches from '../services/fetches';

export default function Checkout() {
  const { cartProducts, setCartProducts } = useContext(productsContext);
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [orderSuccess, setOrderSuccess] = useState('');
  const history = useHistory();
  const tokenFromLocalStorage = localStorage.getItem('token');
  let totalPrice = '0,00';

  useEffect(() => {
    const cartLS = JSON.parse(localStorage.getItem('cartProducts'));
    if (!cartLS) return;
    console.log(cartLS);
    setCartProducts(cartLS.filter((product) => product.quantityItem !== 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirect = (token) => {
    if (!token) return history.push('/login');
  };

  const isTotalNotPriceZero = () => {
    if (totalPrice === '0,00') {
      return false;
    }
    return true;
  };

  const streetValidation = () => {
    const isStreetFilled = street.length > 0;
    return isStreetFilled;
  };

  const houseNumberValidation = () => {
    const ishouseNumberFilled = houseNumber.length > 0;
    return ishouseNumberFilled;
  };

  const handleTotalPrice = () => {
    if (cartProducts.length) {
      totalPrice = cartProducts
        .reduce((accumulator, current) => accumulator + current.subTotal, 0);
      totalPrice = (totalPrice.toFixed(2)).replace('.', ',');
      return totalPrice;
    }
    return totalPrice;
  };

  const sendOrder = () => {
    const limitIndex = 19;
    const SUCCESSMESSAGEDESAPEAR = 3000;
    const date = new Date();
    const objOrder = {
      totalPrice: Number(handleTotalPrice().replace(',', '.')),
      address: street,
      number: houseNumber,
      date: date.toISOString().slice(0, limitIndex).replace('T', ' '),
      orderStatus: 'Pendente',
      cartProducts,
    };

    fetches.createOrder(tokenFromLocalStorage, objOrder)
      .then((response) => {
        if (!response) {
          return (setOrderSuccess('Algum erro aconteceu na realização do seu pedido!'));
        }
        (setOrderSuccess(response.message));
        setTimeout(() => {
          setCartProducts([]);
          localStorage.removeItem('cartProducts');
          history.push('/products');
        }, SUCCESSMESSAGEDESAPEAR);
      });
  };

  return (
    <div>
      { handleRedirect(tokenFromLocalStorage) }
      <TopMenu data-testid="top-title" pageTitle="Finalizar Pedido" />
      <CheckoutProductsCard />
      <div>
        <span
          data-testid="order-total-value"
        >
          { `R$ ${handleTotalPrice()}` }
        </span>
      </div>
      <div>
        <h5>Endereço</h5>
        <fieldset>
          <label htmlFor="street-input">
            Rua:
            <input
              id="street-input"
              data-testid="checkout-street-input"
              type="text"
              value={ street }
              onChange={ (e) => setStreet(e.target.value) }
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="house-number-input">
            Número da casa:
            <input
              id="house-number-input"
              data-testid="checkout-house-number-input"
              type="text"
              value={ houseNumber }
              onChange={ (e) => setHouseNumber(e.target.value) }
            />
          </label>
        </fieldset>
      </div>
      <button
        data-testid="checkout-finish-btn"
        type="button"
        disabled={ !(isTotalNotPriceZero()
          && streetValidation()
          && houseNumberValidation()) }
        onClick={ () => { sendOrder(); } }
      >
        Finalizar Pedido
      </button>
      <div>{orderSuccess}</div>
    </div>
  );
}
