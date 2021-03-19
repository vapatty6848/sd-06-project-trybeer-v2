import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Context from './Context';

import productsFetch from '../services/ProductsService';
import loginFetch from '../services/LoginService';

const jwt = require('jsonwebtoken');

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('client');
  const [tokenInvalid, setTokenInvalid] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]);
  const [number, setNumber] = useState('');
  const [street, setStreet] = useState('');
  const [totalValue, setTotalValue] = useState(0);
  const [sucessmsg, setSucessmsg] = useState(false);

  async function decoder() {
    const jsonWebToken = await loginFetch(email, password);
    if (jsonWebToken.message !== 'Email ou senha inválidos') {
      localStorage.setItem('token', jsonWebToken.token);
      const decode = jwt.decode(jsonWebToken.token);
      setName(decode.name);
      return decode;
    }
    return jsonWebToken.message;
  }

  async function handleClick(history) {
    const decode = await decoder();
    if (decode && decode.role === 'client') {
      history.push('/products');
    } else if (decode && decode.role === 'administrator') {
      history.push('/admin/orders');
    }
  }

  async function getAllProducts() {
    const products = await productsFetch();
    if (products.message) {
      setTokenInvalid(true);
      setIsFetching(true);
    } else {
      setTokenInvalid(false);
      setAllProducts(products);
      setIsFetching(false);
    }
  }

  async function updateProduct({ id, price, nome, qtd, totalPrice }) {
    const clickedProduct = { id, price, nome, qtd, totalPrice };
    const cartProducts = cart.filter((item) => item.id !== id);
    if (clickedProduct.qtd > 0) {
      const newProducts = [...cartProducts, clickedProduct];
      setCart(newProducts);
      localStorage.setItem('Cart', JSON.stringify(newProducts));
    } else if (clickedProduct.qtd === 0) {
      const updatedProducts = cart.filter((item) => item.id !== id);
      setCart(updatedProducts);
      localStorage.setItem('Cart', JSON.stringify(updatedProducts));
    }
  }

  function handleDeleteClick(selectedProduct) {
    const cartProducts = cart.filter((item) => item.id !== selectedProduct.id);
    setCart(cartProducts);
    localStorage.setItem('Cart', JSON.stringify(cartProducts));
  }

  useEffect(() => {
    const localStgCart = JSON.parse(localStorage.getItem('Cart'));
    if (localStgCart) {
      setCart(localStgCart);
    }
  }, []);

  const contextValue = {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    role,
    setRole,
    isFetching,
    setIsFetching,
    allProducts,
    setAllProducts,
    getAllProducts,
    quantity,
    setQuantity,
    updateProduct,
    cart,
    setCart,
    tokenInvalid,
    setTokenInvalid,
    street,
    setStreet,
    number,
    setNumber,
    totalValue,
    setTotalValue,
    handleDeleteClick,
    sucessmsg,
    setSucessmsg,
    handleClick,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
