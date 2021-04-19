import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import CustomerOrders from './pages/CustomerOrders';
import SaleDetails from './pages/SaleDetails';
import AdminProfile from './pages/AdminProfile';
import AdminOrders from './pages/AdminOrders';
import AdminSaleDetail from './pages/AdminSaleDetail';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={ Login } />
      <Route path="/products" component={ Products } />
      <Route path="/register" component={ Register } />
      <Route exact path="/orders/:id" component={ SaleDetails } />
      <Route path="/orders" component={ CustomerOrders } />
      <Route exact path="/admin/orders/:id" component={ AdminSaleDetail } />
      <Route path="/admin/orders" component={ AdminOrders } />
      <Route path="/profile" component={ Profile } />
      <Route path="/checkout" component={ Checkout } />
      <Route path="/admin/profile" component={ AdminProfile } />
    </Switch>
  );
}
