import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './Context';

function Provider({ children }) {
  const [totalCart, setTotalCart] = useState(0);

  const contextValues = {
    totalCart,
    setTotalCart,
  };

  return (
    <context.Provider value={ contextValues }>
      { children }
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
