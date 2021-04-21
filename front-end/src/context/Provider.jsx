import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import { saveStorage, loadStorage } from '../service/localStorage';
import BeersAppContext from './BeersAppContext';

function Provider({ children }) {
  const location = useLocation();
  const [referenceSetTimeout, setReferenceSetTimeout] = useState();

  if (location.pathname !== '/checkout') {
    clearTimeout(referenceSetTimeout);
  }
  const [user, setUser] = useState(loadStorage('user', {}));
  const [
    productQuantity,
    setProductQuantity,
  ] = useState(loadStorage('productQuantity', []));

  const [amount, setAmount] = useState(loadStorage('amount', 0.00));

  useEffect(() => {
    saveStorage('productQuantity', productQuantity);
  }, [productQuantity]);

  useEffect(() => {
    saveStorage('amount', amount);
  }, [amount]);

  useEffect(() => {
    saveStorage('user', user);
  }, [user]);

  const contextValue = {
    user,
    setUser,
    productQuantity,
    setProductQuantity,
    amount,
    setAmount,
    setReferenceSetTimeout,
  };

  return (
    <BeersAppContext.Provider value={ contextValue }>
      {children}
    </BeersAppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
