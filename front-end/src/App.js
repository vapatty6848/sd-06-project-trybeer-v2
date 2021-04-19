import React from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import BeerProvider from './provider/Provider';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProfileClient from './pages/ProfileClient';
import AdminOrders from './pages/AdminOrders';
import AdminProfile from './pages/AdminProfile';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import ClientDetailsOrder from './pages/ClientDetailsOrder';
import AdminDetailsOrder from './pages/AdminDetailsOrder';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <BeerProvider>
        <div className="App">
          <Route exact path="/"><Login /></Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/register"><Register /></Route>
          <Route exact path="/products"><Products /></Route>
          <Route exact path="/profile"><ProfileClient /></Route>
          <Route exact path="/admin/orders"><AdminOrders /></Route>
          <Route exact path="/admin/profile"><AdminProfile /></Route>
          <Route exact path="/checkout"><Checkout /></Route>
          <Route exact path="/orders"><Orders /></Route>
          <Route exact path="/orders/:id"><ClientDetailsOrder /></Route>
          <Route exact path="/admin/orders/:id"><AdminDetailsOrder /></Route>
        </div>
      </BeerProvider>
    </BrowserRouter>
  );
}

export default App;
