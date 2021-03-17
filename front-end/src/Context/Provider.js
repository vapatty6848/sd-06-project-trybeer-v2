import React, { useState } from 'react';
import propTypes from 'prop-types';
import Context from './Context';

import productsFetch from '../services/ProductsService';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('client');
  const [isFetching, setIsFetching] = useState(true);
  const [allProducts, setAllProducts] = useState([]);

  async function getAllProducts() {
    const products = await productsFetch();
    setAllProducts(products);
    console.log(allProducts);
    setIsFetching(false);
  }

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
