import React from 'react';
import Provider from './Context/Provider';
import Routes from './Pages/Routes';
import './App.css';

function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}

export default App;
