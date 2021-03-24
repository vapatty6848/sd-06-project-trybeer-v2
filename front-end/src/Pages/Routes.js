import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Products from './Products';
import Profile from './Profile';
import OrdersClient from './OrdersClient';
import Checkout from './Checkout';
import OrderDetail from './OrderDetail';
import AdminOrders from './AdminOrders';
import AdminProfile from './AdminProfile';
import AdminOrderDetail from './AdminOrderDetail';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><Redirect to="/login" /></Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/products" component={ Products } />
        <Route exact path="/checkout" component={ Checkout } />
        <Route exact path="/orders/:id" component={ OrderDetail } />
        <Route exact path="/orders" component={ OrdersClient } />
        <Route exact path="/admin/orders/:id" component={ AdminOrderDetail } />
        <Route exact path="/admin/orders" component={ AdminOrders } />
        <Route exact path="/admin/profile" component={ AdminProfile } />
      </Switch>
    </BrowserRouter>
  );
}
