import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Products from './Products';
import Profile from './Profile';
import OrdersClient from './OrdersClient';
import Checkout from './Checkout';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><Redirect to="/login" /></Route>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/orders" component={ OrdersClient } />
        <Route path="/products" component={ Products } />
        <Route path="/profile" component={ Profile } />
        <Route path="/checkout" component={ Checkout } />
      </Switch>
    </BrowserRouter>
  );
}
