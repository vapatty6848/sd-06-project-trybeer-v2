import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextAPI from './ContextAPI';

function GlobalProvider({ children }) {
  const [productsCart, setProductsCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);

  const contextState = {
    productsCart,
    setProductsCart,
    totalCart,
    setTotalCart,
  };

  return (
    <ContextAPI.Provider value={ contextState }>
      { children }
    </ContextAPI.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalProvider;
