import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AdminOrders from './pages/AdminOrders';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Provider from './Context/Provider';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';
import AdminProfile from './pages/AdminProfile';
import AdminOrdersDetails from './pages/AdminOrdersDetails';
import Chat from './pages/Chat';
import ChatAdmin from './pages/ChatAdmin';
import ChatAdminDetail from './pages/ChatAdminDetail';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route exact path="/admin/orders/:id" component={ AdminOrdersDetails } />
          <Route exact path="/admin/orders" component={ AdminOrders } />
          <Route exact path="/admin/profile" component={ AdminProfile } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/products" component={ Products } />
          <Route exact path="/chat" component={ Chat } />
          <Route exact path="/orders" component={ Orders } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/checkout" component={ Checkout } />
          <Route exact path="/orders/:id" component={ OrderDetails } />
          <Route exact path="/admin/chats" component={ ChatAdmin } />
          <Route exact path="/admin/chat" component={ ChatAdminDetail } />
          <Redirect from="/" to="/login" />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
