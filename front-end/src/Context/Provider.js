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

  const currentLocal = JSON.parse(localStorage.getItem('Cart'));

  async function getAllProducts() {
    const products = await productsFetch();
    setAllProducts(products);
    setIsFetching(false);
  }

  async function updateProduct(id, price, nome, qtd) {
    const newProduct = { id, price, nome, qtd };
    setCart(currentLocal);
    const productId = cart.find((item) => item.id === id);
    const productsCart = cart.filter((item) => item.id !== id);
    if (productId === null || productId.qtd > 0) {
      const newItem = [...productsCart, newProduct];
      setCart(newItem);
      localStorage.setItem('Cart', JSON.stringify(newItem));
    } else if (productId.qtd === 0) {
      localStorage.setItem('Cart', JSON.stringify(productsCart));
      setCart(productsCart);
    }

    // const cartItems = cart.filter((item) => item.id !== id);
    // const newItem = [...cartItems, newProduct];
    // setCart(newItem);
    // localStorage.setItem('Cart', JSON.stringify(newItem));
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
