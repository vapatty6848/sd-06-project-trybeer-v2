import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Context from './Context';

import productsFetch from '../services/ProductsService';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
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
    setPass,
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
