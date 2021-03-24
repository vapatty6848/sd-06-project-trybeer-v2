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
  const [quantity, setQuantity] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [allOrders, setAllOrders] = useState([]);
  const [allSales, setAllSales] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [saleDetails, setSaleDetails] = useState([]);
  const [status, setStatus] = useState(false);

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
      console.log(products.message);
      setIsFetching(true);
    } else {
      setAllProducts(products);
      setIsFetching(false);
    }
  }

  async function getAllOrders() {
    const orders = await ApiService.getOrders();
    if (orders.length === 0) {
      setIsFetching(true);
    } else {
      setAllOrders(orders);
      setIsFetching(false);
    }
  }

  async function getAllSales() {
    const sales = await ApiService.getSales();
    if (sales.length === 0) {
      setIsFetching(true);
    } else {
      setAllSales(sales);
      setIsFetching(false);
    }
  }

  async function getOrderDetail(id) {
    const orderD = await ApiService.getOrderDetails(id);
    if (orderD.length === 0) {
      setIsFetching(true);
    } else {
      setOrderDetails(orderD);
      setIsFetching(false);
    }
  }

  async function getAdminDetails(id) {
    const saleDetail = await ApiService.getSaleDetails(id);
    if (saleDetail.length === 0) {
      setIsFetching(true);
    } else {
      setSaleDetails(saleDetail);
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
    const timeParaRedirecionar = 2000;
    const decode = LocalStorage.getToken();
    const decodificado = jwt.decode(decode);
    const userEmail = decodificado.email;
    const order = { userEmail, totalValue, street, number, cart };
    const newOrder = await ApiService.registerOrder(order);
    if (newOrder === 'Pedido registrado com sucesso!') {
      setSucessmsg(true);
      setCart([]);
      localStorage.removeItem('Cart');
      setTimeout(() => {
        setSucessmsg(false);
        history.push('/products');
      }, timeParaRedirecionar);
    } else {
      console.log('Alguma coisa deu errado, tente novamente mais tarde!');
    }
  }

  async function validateToken(history) {
    const token = LocalStorage.getToken();
    if (!token) {
      history.push('/');
    }
  }

  async function handleStatus(id) {
    const orderStatus = await ApiService.updateStatus(id);
    if (orderStatus.message === 'Pedido atualizado') {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }

  useEffect(() => {
    const localStgCart = LocalStorage.getCartProducts();
    if (localStgCart) {
      setCart(localStgCart);
    }
  }, []);

  useEffect(() => {
    const decode = LocalStorage.getToken();
    if (decode) {
      const decodificado = jwt.decode(decode);
      setEmail(decodificado.email);
      setName(decodificado.name);
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
    allOrders,
    setAllOrders,
    getAllOrders,
    handleClick,
    updateProduct,
    validateToken,
    getAllProducts,
    handleDeleteClick,
    handleCheckoutFinish,
    getOrderDetail,
    orderDetails,
    setOrderDetails,
    allSales,
    setAllSales,
    getAllSales,
    getAdminDetails,
    saleDetails,
    setSaleDetails,
    status,
    setStatus,
    handleStatus,
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
