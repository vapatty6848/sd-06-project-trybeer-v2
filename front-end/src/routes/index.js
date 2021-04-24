import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect } from 'react-router-dom';

import Products from '../pages/Products';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import ProfileAdmin from '../pages/ProfileAdmin';
import AdminOrderDetails from '../pages/AdminOrderDetails';
import Checkout from '../pages/Checkout';
import AdminOrders from '../pages/AdminOrders';
import Orders from '../pages/Orders';
import OrdersDetails from '../pages/OrdersDetails';
import ChatClient from '../pages/ChatClient';
import ChatAdmin from '../pages/ChatAdmin';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect from="/" to="/login" />
      </Route>
      <Route path="/admin/orders/:id" component={ AdminOrderDetails } />
      <Route path="/admin/orders" component={ AdminOrders } />
      <Route path="/admin/profile" component={ ProfileAdmin } />
      <Route path="/admin/chats" component={ ChatAdmin } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/products" component={ Products } />
      <Route path="/profile" component={ Profile } />
      <Route path="/checkout" component={ Checkout } />
      <Route path="/orders/:id" component={ OrdersDetails } />
      <Route path="/orders" component={ Orders } />
      <Route path="/chat" component={ ChatClient } />
    </Switch>
  </Router>
);

export default Routes;
