import React, { useState } from 'react';
import PropTypes from 'prop-types';
import productsContext from './productsContext';

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const context = {
    products,
    setProducts,
    cartProducts,
    setCartProducts,
    orders,
    setOrders,
  };

  return (
    <productsContext.Provider value={ context }>
      {children}
    </productsContext.Provider>
  );
}

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
