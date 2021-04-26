import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [stateSideBar, setStateSideBar] = useState(false);
  const [stateSideBarAdmin, setStateSideBarAdmin] = useState(true);
  const [stateSumPrice, setStateSumPrice] = useState(0);
  const [stateTheme, setStateTheme] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [stateIsFixed, setStateIsFixed] = useState('fixed');
  const [stateIsOpacity, setStateIsOpacity] = useState('1');
  const [stateSaleProduct, setStateSaleProduct] = useState([]);
  const [stateDetailsSale, setStateDetailsSale] = useState({});

  const context = {
    stateSideBar,
    setStateSideBar,
    stateSumPrice,
    setStateSumPrice,
    stateTheme,
    setStateTheme,
    cartList,
    setCartList,
    stateSideBarAdmin,
    setStateSideBarAdmin,
    stateIsFixed,
    setStateIsFixed,
    stateIsOpacity,
    setStateIsOpacity,
    stateSaleProduct,
    setStateSaleProduct,
    stateDetailsSale,
    setStateDetailsSale,
  };

  return (
    <GlobalContext.Provider value={ context }>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
