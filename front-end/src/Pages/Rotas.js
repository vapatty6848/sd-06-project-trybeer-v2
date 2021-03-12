import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';

export default function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={ Login } />
      </Switch>
    </BrowserRouter>
  )
};
