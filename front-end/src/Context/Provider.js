import React, { useState } from 'react';
import propTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('client');
  const [isFetching, setIsFetching] = useState(true);
  const [allProducts, setAllProducts] = useState([]);

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
