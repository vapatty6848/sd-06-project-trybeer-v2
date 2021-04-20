import React, { useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Products from './modules/products/pages/Products';
import Login from './modules/login/pages/Login';
import Register from './modules/register/pages/Register';
import BodyContainer from './design-system/containers/BodyContainer';
import GlobalContext from './context/Context';
import Menu from './design-system/page-menu/Menu';
import OrdersClient from './modules/orders/pages/OrdersClient';
import OrdersAdmin from './modules/orders/pages/OrdersAdmin';
import ProfileClient from './modules/profile/pages/ProfileClient';
import ProfileAdmin from './modules/profile/pages/ProfileAdmin';
import Checkout from './modules/checkout/pages/Checkout';
import DetailedOrder from './modules/orders/pages/DetailedOrder';

const Routes = () => {
  const { token } = useContext(GlobalContext);

  const storage = JSON.parse(localStorage.getItem('user'));
  const role = storage ? storage.role : 'client';
  const tokenFromStorage = storage ? storage.token : false;
  const existToken = storage ? tokenFromStorage : token;
  const adminOrdersRoute = '/admin/orders';
  const productRoute = '/products';

  let baseRoute = role === 'client' ? productRoute : adminOrdersRoute;
  baseRoute = existToken ? baseRoute : '/login';

  return (
    <Switch>
      {/* ROTAS PÚBLICAS - LOGIN E REGISTER */}
      <Route path={ ['/login', '/register'] }>
        { existToken && <Redirect to="/" /> }
        <BodyContainer>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
        </BodyContainer>
      </Route>
      {/* ROTAS PRIVADAS - USUÁRIO ADMIN */}
      <Route path={ [adminOrdersRoute, '/admin/profile'] }>
        { !existToken && <Redirect to="/" /> }
        { role === 'client' && <Redirect to="/" /> }
        <Menu />
        <BodyContainer>
          <Route path="/admin/profile" component={ ProfileAdmin } />
          <Route exact path="/admin/orders/:id" component={ DetailedOrder } />
          <Route exact path={ adminOrdersRoute } component={ OrdersAdmin } />
        </BodyContainer>
      </Route>
      {/* ROTAS PRIVADAS - USUÁRIO CLIENT */}
      <Route path={ ['/profile', '/products', '/orders', '/checkout'] }>
        { !existToken && <Redirect to="/" /> }
        { !role === 'client' && <Redirect to="/" /> }
        <Menu />
        <BodyContainer>
          <Route path="/profile" component={ ProfileClient } />
          <Route path="/products" component={ Products } />
          <Route exact path="/checkout" component={ Checkout } />
          <Route exact path="/orders/:id" component={ DetailedOrder } />
          <Route exact path="/orders" component={ OrdersClient } />
        </BodyContainer>
      </Route>
      {/* ROTAS PRIVADAS - USUÁRIO ADMIN */}
      <Route path={ ['/admin/orders', '/admin/profile'] }>
        { !existToken && <Redirect to="/" /> }
        <Menu />
        <BodyContainer>
          <Route path="/admin/profile" component={ ProfileAdmin } />
          <Route path="/admin/orders/:id" component={ DetailedOrder } />
          <Route exact path="/admin/orders" component={ OrdersAdmin } />
        </BodyContainer>
      </Route>
      {/* ROTA RAIZ - RESPONSÁVEL POR FAZER DIRECIONAMENTO */}
      <Route exact path="/">
        <Redirect to={ baseRoute } />
      </Route>
    </Switch>
  );
};

export default Routes;
