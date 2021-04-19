import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login, Register, Profile, Products, Checkout, Orders,
  Admin, AdminOrders, OrderDetails, AdminOrderDetails,
} from '../pages';

function index() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/profile" component={ Profile } />
      <Route path="/products" component={ Products } />
      <Route path="/checkout" component={ Checkout } />
      <Route
        path="/orders/:id"
        render={ (props) => <OrderDetails { ...props } /> }
      />
      <Route path="/orders" component={ Orders } />
      <Route
        path="/admin/orders/:id"
        render={ (props) => <AdminOrderDetails { ...props } /> }
      />
      <Route path="/admin/orders" component={ AdminOrders } />
      <Route path="/admin/profile" component={ Admin } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}

export default index;
