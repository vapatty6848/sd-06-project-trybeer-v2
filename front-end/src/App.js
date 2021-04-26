import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import ClientProfile from './pages/ClientProfile';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import AdminOrders from './pages/AdminOrders';
import AdminProfile from './pages/AdminProfile';
import ProductDetails from './pages/ProductDetails';
import OrderDetails from './pages/OrderDetails';
import ClientChat from './pages/ClientChat';
import AdminChats from './pages/AdminChats';
import AdminChat from './pages/AdminChat';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/profile" component={ ClientProfile } />
        <Route exact path="/products" component={ Products } />
        <Route exact path="/checkout" component={ Checkout } />
        <Route exact path="/orders" component={ Orders } />
        <Route exact path="/admin/orders" component={ AdminOrders } />
        <Route exact path="/admin/orders/:id" component={ OrderDetails } />
        <Route exact path="/admin/profile" component={ AdminProfile } />
        <Route exact path="/orders/:id" component={ ProductDetails } />
        <Route exact path="/chat" component={ ClientChat } />
        <Route exact path="/admin/chats" component={ AdminChats } />
        <Route exact path="/admin/chats/:id" component={ AdminChat } />
      </Switch>
    </Provider>
  );
}

export default App;
