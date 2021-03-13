import React from 'react';
import Provider from './Context/Provider';
import Rotas from './Pages/Rotas';

function App() {
  return (
    <Provider>
      <Rotas />
    </Provider>
  );
}

export default App;
