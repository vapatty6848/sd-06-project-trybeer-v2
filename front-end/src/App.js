import React from 'react';
import ProductsProvider from './context/productsProvider';
import Routes from './Routes';

function App() {
  return (
    <ProductsProvider>
      <Routes />
    </ProductsProvider>
  );
}

export default App;
