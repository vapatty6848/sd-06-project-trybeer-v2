import React, { useState } from 'react';

// Proptypes
import PropTypes from 'prop-types';

// Context
import BeerContext from '../context/BeerContext';

export default function BeerProvider({ children }) {
  const [productsOrder, setProductsOrder] = useState('');
  const [saleIdOrder, setSaleIdOrder] = useState('');
  const [dateOrder, setDateOrder] = useState('');
  const [totalPriceOrder, setTotalprice] = useState('');
  const [saleDetail, setSaleDetail] = useState('');

  const context = {
    productsOrder,
    setProductsOrder,
    saleIdOrder,
    setSaleIdOrder,
    dateOrder,
    setDateOrder,
    totalPriceOrder,
    setTotalprice,
    saleDetail,
    setSaleDetail,
  };

  return (
    <BeerContext.Provider value={ context }>
      { children }
    </BeerContext.Provider>
  );
}

BeerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
