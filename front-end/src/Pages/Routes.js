import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Products from './Products';
import Profile from './Profile';
import OrdersClient from './OrdersClient';
import OrdersAdmin from './OrdersAdmin';
import Checkout from './Checkout';
import OrderDetail from './OrderDetail';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><Redirect to="/login" /></Route>
        <Route exact path="/admin/orders" component={ OrdersAdmin } />
        <Route exact path="/orders" component={ OrdersClient } />
        <Route path="/orders/:id" component={ OrderDetail } />
        <Route path="/register" component={ Register } />
        <Route path="/products" component={ Products } />
        <Route path="/checkout" component={ Checkout } />
        <Route path="/profile" component={ Profile } />
        <Route path="/login" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}
