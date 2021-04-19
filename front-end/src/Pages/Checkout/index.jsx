import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { FaStreetView } from 'react-icons/fa';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { registerOrder } from '../../Services/Apis';

import MenuTop from '../../Components/MenuTop';
import SideBar from '../../Components/SideBar';
import Button from '../../Components/Button';

import { GlobalContext } from '../../Contexts/GlobalContext';

import S from './styles';
import Input from '../../Components/Input';

const mountData = (params) => {
  const { street, numberHouse } = params;
  const user = JSON.parse(localStorage.getItem('user'));
  const products = JSON.parse(localStorage.getItem('infosCheckout'));
  const orderValue = JSON.parse(localStorage.getItem('total'));
  const order = {
    email: user.email,
    orderValue,
    address: street,
    number: numberHouse,
    products,
    token: user.token,
  };
  return order;
};

const checkOutRedirect = async (setCheckOut, history, params) => {
  const time = 2000;
  const order = mountData(params);

  await registerOrder(order);
  setCheckOut(true);
  setTimeout(() => {
    history.push('/products');
  }, time);

  localStorage.removeItem('infosCheckout');
  localStorage.removeItem('total');
};

const form = (params) => {
  const {
    valueTotal,
    setStreet,
    setNumberHouse,
    cardsProductsValues,
    checkOut,
    stateSideBar,
  } = params;

  const theme = JSON.parse(localStorage.getItem('@trybeer:theme'));

  return (
    <S.ContainerMain stateSideBar={ stateSideBar }>
      {checkOut ? (
        <S.CompletedSale>Compra realizada com sucesso!</S.CompletedSale>
      ) : (
        <S.ContainerProducts>
          <h1>Produtos</h1>
          {cardsProductsValues}
          <S.Total data-testid="order-total-value">
            Total: R$
            {' '}
            {(valueTotal).toFixed(2).replace('.', ',')}
          </S.Total>
          <S.ContainerAddress>
            <h1>Endereço</h1>
            <Input
              id="Rua"
              label="Rua"
              width="100%"
              dataTestid="checkout-street-input"
              themeStorage={ theme && theme.title }
              widthDivLabel="100%"
              icon={ FaStreetView }
              onChange={ ({ target }) => setStreet(target.value) }
            />
            <Input
              id="Número da casa"
              label="Número da casa"
              width="100%"
              dataTestid="checkout-house-number-input"
              themeStorage={ theme && theme.title }
              widthDivLabel="100%"
              icon={ AiOutlineFieldNumber }
              onChange={ ({ target }) => setNumberHouse(target.value) }
            />
          </S.ContainerAddress>
        </S.ContainerProducts>
      )}
    </S.ContainerMain>
  );
};

const Checkout = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [valueTotal, setValueTotal] = useState(0);
  const [street, setStreet] = useState('');
  const [numberHouse, setNumberHouse] = useState('');
  const [checkOut, setCheckOut] = useState(false);
  const { setCartList, stateSideBar } = useContext(GlobalContext);
  const history = useHistory();

  const cartListLocalStorage = JSON.parse(localStorage.getItem('infosCheckout'));

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user'));

    if (!userToken) history.push('/login');
  }, [history]);

  useEffect(() => {
    if (cartListLocalStorage) {
      const prices = cartListLocalStorage.map((item) => item.price * item.quantity);

      const total = prices.reduce((acc, cur) => acc + cur, 0);

      setValueTotal(total);

      if (total > 0 && street.length > 0 && numberHouse.length > 0) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  }, [cartListLocalStorage, numberHouse.length, street.length]);

  const removeItem = useCallback((id) => {
    const products = JSON.parse(localStorage.getItem('infosCheckout'));

    const product = products.filter((item) => item.id !== id);

    localStorage.setItem('infosCheckout', JSON.stringify(product));

    setCartList(products);
  }, [setCartList]);

  const cardsProductsValues = useMemo(() => (
    <div>
      {cartListLocalStorage && cartListLocalStorage.length > 0 ? (
        cartListLocalStorage.map((infos, index) => (
          <S.ContainerInfos key={ infos.id }>
            <div data-testid={ `${index}-product-qtd-input` }>{infos.quantity}</div>
            <span data-testid={ `${index}-product-name` }>{infos.name}</span>
            <span data-testid={ `${index}-product-total-value` }>
              R$
              {' '}
              {(infos.price * infos.quantity).toFixed(2).replace('.', ',')}
            </span>
            <p data-testid={ `${index}-product-unit-price` }>
              (R$
              {' '}
              {(infos.price).replace('.', ',')}
              {' '}
              un)
            </p>
            <S.ButtonForm
              type="button"
              onClick={ () => removeItem(infos.id) }
              data-testid={ `${index}-removal-button` }
            >
              X
            </S.ButtonForm>
          </S.ContainerInfos>
        ))
      ) : (
        <S.ContainerEmptyCart>
          <span>Não há produtos no carrinho</span>
        </S.ContainerEmptyCart>
      )}
    </div>
  ), [cartListLocalStorage, removeItem]);

  const params = {
    valueTotal,
    street,
    setStreet,
    setNumberHouse,
    numberHouse,
    cardsProductsValues,
    checkOut,
    stateSideBar,
  };

  return (
    <S.Container>
      <MenuTop />

      <SideBar />

      {form(params)}

      <S.ContainerButton stateSideBar={ stateSideBar }>
        <Button
          type="button"
          color="green"
          fontSize="20px"
          width="100%"
          heigth="40px"
          botton="0"
          position="fixed"
          disabled={ isDisabled }
          onClick={ () => checkOutRedirect(setCheckOut, history, params) }
          dataTestid="checkout-finish-btn"
        >
          Finalizar Pedido
        </Button>
      </S.ContainerButton>
    </S.Container>
  );
};

export default Checkout;
