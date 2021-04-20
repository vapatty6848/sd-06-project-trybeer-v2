import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import ButtonCheckout from '../components/pageCheckout/ButtonCheckout';
import FormCheckout from '../components/pageCheckout/FormCheckout';
import ProductCard from '../components/pageCheckout/ProductCard';
import MenuTop from '../components/menuClient/MenuTop';

import CheckoutContext from '../context/CheckoutContext';
import { checkoutUtils } from '../utils';

function Checkout() {
  const productsList = JSON.parse(localStorage.cart);
  const newlist = productsList.map((item) => {
    item.totalValue = (item.quantity * item.price);
    return item;
  });
  const [address, setEndereco] = useState({ rua: '', numero: '' });
  const [products, setProdutos] = useState(newlist);
  const [able, setAble] = useState(true);
  const [sumTotal, setSumTotal] = useState(0);
  const history = useHistory();

  const handleChange = ({ target }) => {
    setEndereco({ ...address, [target.name]: target.value });
  };

  useEffect(() => {
    if (!localStorage.user) {
      history.push('/login');
    }
    const { token } = JSON.parse(localStorage.getItem('user'));

    if (!token) {
      history.push('/login');
    }
  }, [history]);

  useEffect(() => {
    checkoutUtils.valueTotal(products, setSumTotal);
    checkoutUtils.disable(setAble, products, address);
  }, [address, products]);

  return (
    <CheckoutContext.Provider
      value={ {
        handleChange,
        address,
        products,
        setProdutos,
        able,
        history,
        sumTotal,
      } }
    >
      <div className="">
        <MenuTop name="Finalizar Pedido" />
        <div className="form-content-check">
          <ProductCard />
          <FormCheckout />
          <ButtonCheckout />
        </div>
      </div>
    </CheckoutContext.Provider>
  );
}

export default Checkout;
