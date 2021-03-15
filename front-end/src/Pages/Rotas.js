import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Products from './Products';

export default function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><Redirect to="/login" /></Route>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/products" component={ Products } />
      </Switch>
    </BrowserRouter>
  );
}
