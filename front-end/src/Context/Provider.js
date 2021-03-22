import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Context from './Context';

import { ApiService, LocalStorage } from '../services';

const jwt = require('jsonwebtoken');

function Provider({ children }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [street, setStreet] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [cart, setCart] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [valid, setValid] = useState(false);
  const [sucessmsg, setSucessmsg] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [tokenInvalid, setTokenInvalid] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [allOrders, setAllOrders] = useState([]);

  async function decoder() {
    const jsonWebToken = await ApiService.login(email, password);
    if (jsonWebToken.message !== 'Email ou senha inválidos') {
      LocalStorage.setToken(jsonWebToken.token);
      const decode = jwt.decode(jsonWebToken.token);
      setName(decode.name);
      return decode;
    }
    return jsonWebToken.message;
  }

  async function handleClick(history) {
    const decode = await decoder();
    if (decode && decode.role === 'client') {
      setValid(false);
      history.push('/products');
    } else if (decode && decode.role === 'administrator') {
      setValid(false);
      history.push('/admin/orders');
    }
  }

  async function getAllProducts() {
    const products = await ApiService.getProducts();
    if (products.message) {
      setTokenInvalid(true);
      setIsFetching(true);
    } else {
      setTokenInvalid(false);
      setAllProducts(products);
      setIsFetching(false);
    }
  }

  async function getAllOrders() {
    const orders = await ApiService.getOrders();
    console.log('provider', orders);
    if (orders.length === 0) {
      setTokenInvalid(true);
      setIsFetching(true);
    } else {
      setTokenInvalid(false);
      setAllOrders(orders);
      setIsFetching(false);
    }
  }

  async function updateProduct({ id, price, nome, qtd, totalPrice }) {
    const clickedProduct = { id, price, nome, qtd, totalPrice };
    const cartProducts = cart.filter((item) => item.id !== id);
    if (clickedProduct.qtd > 0) {
      const newProducts = [...cartProducts, clickedProduct];
      setCart(newProducts);
      LocalStorage.updateCart(newProducts);
    } else if (clickedProduct.qtd === 0) {
      const updatedProducts = cart.filter((item) => item.id !== id);
      setCart(updatedProducts);
      LocalStorage.updateCart(updatedProducts);
    }
  }

  function handleDeleteClick(selectedProduct) {
    const cartProducts = cart.filter((item) => item.id !== selectedProduct.id);
    setCart(cartProducts);
    LocalStorage.updateCart(cartProducts);
  }

  async function handleCheckoutFinish(history) {
    const time = 3000;
    const decode = await decoder();
    const userEmail = decode.email;
    const order = { userEmail, totalValue, street, number, cart };
    const newOrder = await ApiService.registerOrder(order);
    if (newOrder === 'Pedido registrado com sucesso!') {
      setSucessmsg(true);
      setCart([]);
      localStorage.removeItem('Cart');
      setTimeout(() => {
        setSucessmsg(false);
        history.push('/products');
      }, time);
    } else {
      console.log('Alguma coisa deu errado, tente novamente mais tarde!');
    }
  }

  function validateToken(history) {
    const token = LocalStorage.getToken();
    if (!token) {
      history.push('/');
    }
  }

  useEffect(() => {
    const localStgCart = LocalStorage.getCartProducts();
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
    quantity,
    setQuantity,
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
    sucessmsg,
    setSucessmsg,
    valid,
    setValid,
    handleClick,
    updateProduct,
    validateToken,
    getAllProducts,
    handleDeleteClick,
    handleCheckoutFinish,
    getAllOrders,
    allOrders,
    setAllOrders,
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
