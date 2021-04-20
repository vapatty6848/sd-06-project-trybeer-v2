import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as API from '../../../utils';
import ButtonCheckout from './ButtonCheckout';
import AddressInput from './AddressInput';
import NumberInput from './NumberInput';
import GlobalContext from '../../../context/Context';

function Form() {
  const { cartItems, setCartItems } = useContext(GlobalContext);
  const [form, setForm] = useState({ address: '', number: '' });
  const [errorForm, setErrorForm] = useState({ address: true, number: true });
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const numberOfItems = cartItems.length;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('user'));

    const productsOnCart = cartItems.map((product) => ({
      id: product.id, quantity: product.quantity,
    }));

    const totalPrice = cartItems.reduce((acc, item) => {
      const result = (acc + item.quantity * item.price);
      return result;
    }, 0);

    const reqBody = {
      products: productsOnCart,
      customerId: userInfo.id,
      total: totalPrice,
      address: form.address,
      number: form.number,
    };

    const response = await API.post('/sales', reqBody);
    if (response.message !== 'Sale created.') return setErrorMsg(response.message);
    setSuccess(true);
    const delay = 2000;

    setTimeout(() => {
      setCartItems([]);
      if (history.location.pathname === '/checkout') history.push('/products');
    }, delay);
  };

  return (
    <form
      className={ `${(numberOfItems > 0 || success) ? '' : 'hidden'}
        w-1/3 flex flex-col mt-10` }
      onSubmit={ handleSubmit }
    >
      <div className={ `${success ? '' : 'hidden'} bg-primary` }>
        <p>Order concluded with success!</p>
        <p className="text-opacity-100">Compra realizada com sucesso!</p>
      </div>
      <div className="flex flex-col space-y-4">
        { AddressInput(setErrorForm, setForm, form.address) }
        { NumberInput(setErrorForm, setForm, form.number) }
        { ButtonCheckout(errorMsg, errorForm) }
      </div>
    </form>
  );
}

export default Form;
