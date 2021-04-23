import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  Login,
  Orders,
  Profile,
  Register,
  Products,
  Checkout,
  DetailsOrder,
  DetailsOrderAdm,
  ProfileAdm,
  OrdersAdm,
  Chat,
  ChatAdmin,
} from './pages/index';
import Provider from './hooks/Provider';
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider>
        <Switch>
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/orders/:orderId" component={ DetailsOrder } />
          <Route exact path="/orders" component={ Orders } />
          <Route path="/products" component={ Products } />
          <Route path="/profile" component={ Profile } />
          <Route path="/checkout" component={ Checkout } />
          <Route path="/admin/orders/:id" component={ DetailsOrderAdm } />
          <Route exact path="/admin/orders" component={ OrdersAdm } />
          <Route path="/admin/profile" component={ ProfileAdm } />
          <Route path="/chat" component={ Chat } />
          <Route path="/admin/chats" component={ ChatAdmin } />
          <Redirect from="/" to="/login" />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
