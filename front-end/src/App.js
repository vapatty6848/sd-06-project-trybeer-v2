import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Login, Register,
  Products, ClientProfile,
  AdminProfile, Orders, OrdersAdm,
  Checkout, OrderDetails, OrdersAdmDetails,
  Chat, AdminChat } from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/products" component={ Products } />
      {/* <Route path="/orders" component={ Orders } /> */}
      <Route path="/profile" component={ ClientProfile } />
      <Route exact path="/admin/profile" component={ AdminProfile } />
      <Route exact path="/checkout" component={ Checkout } />
      <Route exact path="/orders" component={ Orders } />
      <Route
        path="/orders/:id"
        render={ (routeProps) => <OrderDetails { ...routeProps } /> }
      />
      <Route exact path="/admin/orders" component={ OrdersAdm } />
      <Route
        path="/admin/orders/:id"
        render={ (routeProps) => <OrdersAdmDetails { ...routeProps } /> }
      />
      <Route exact path="/chat" component={ Chat } />
      <Route exact path="/admin/chats" component={ AdminChat } />
    </Switch>
  );
}

export default App;
