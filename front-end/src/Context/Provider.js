import React, { useState } from 'react';
import Context from './Context';

function Provider({children}) {
  const [email, setEmail] = useState('');

  const contextValue = {
    email,
    setEmail,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  )
};

export default Provider;
