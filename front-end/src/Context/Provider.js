import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Context from './Context';

import productsFetch from '../services/ProductsService';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('client');
  const [isFetching, setIsFetching] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]);

  async function getAllProducts() {
    const products = await productsFetch();
    setAllProducts(products);
    setIsFetching(false);
  }

  function removeProduct(id) {
    const currentLocal = JSON.parse(localStorage.getItem('Cart'));
    const getById = cart.filter((item) => item.id === id);
    if (getById.qtd === 0) {
      currentLocal.splice(getById, 1);
      localStorage.setItem('Cart', JSON.stringify(currentLocal));
      setCart(currentLocal);
    }
  }

  async function updateProduct(id, price, nome, qtd) {
    const obj = { id, price, nome, qtd };
    const cartItems = cart.filter((item) => item.id !== id);
    const newItem = [...cartItems, obj];
    setCart(newItem);
    localStorage.setItem('Cart', JSON.stringify(newItem));
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
