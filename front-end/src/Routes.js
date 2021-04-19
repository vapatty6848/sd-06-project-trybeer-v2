import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import { TransitionGroup, Transition } from 'react-transition-group';

// import { play, exit } from './utils/timelines';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Products from './Pages/Products';
import Checkout from './Pages/Checkout';
// import CheckoutTest from './Pages/CheckoutTest';
import MyOrders from './Pages/OrderDetails';
import OrderDetails from './Pages/MyOrders';
import AdminProfile from './Pages/AdminProfile';
import AdminOrders from './Pages/AdminOrders';
import AdminOrderDetails from './Pages/AdminOrderDetails';

const Routes = () => (

  <Switch>
    <Route
      exact
      path="/"
      component={ () => <Redirect to="/login" /> }
    />
    <Route path="/login" component={ Login } />
    <Route path="/register" component={ Register } />
    <Route path="/profile" component={ Profile } />
    <Route path="/products" component={ Products } />
    <Route path="/checkout" component={ Checkout } />
    <Route exact path="/orders" component={ OrderDetails } />
    <Route path="/orders/:id" component={ MyOrders } />
    <Route path="/admin/profile" component={ AdminProfile } />
    <Route exact path="/admin/orders" component={ AdminOrders } />
    <Route path="/admin/orders/:id" component={ AdminOrderDetails } />
  </Switch>
);

// const Routes = () => (
//   <div className="app">
//     <Route
//       render={ ({ location }) => {
//         const { pathname, key } = location;

//         return (
//           <TransitionGroup component={ null }>
//             <Transition
//               key={ key }
//               appear
//               onEnter={ (node, appears) => play(pathname, node, appears) }
//               onExit={ (node, appears) => exit(node, appears) }
//               timeout={ { enter: 500, exit: 150 } }
//             >
//               <Switch location={ location }>
//                 <Route
//                   exact
//                   path="/"
//                   component={ () => <Redirect to="/login" /> }
//                 />
//                 <Route path="/login" component={ Login } />
//                 <Route path="/register" component={ Register } />
//                 <Route path="/profile" component={ Profile } />
//                 <Route path="/products" component={ Products } />
//                 <Route path="/checkout" component={ Checkout } />
//                 <Route exact path="/orders" component={ OrderDetails } />
//                 <Route path="/orders/:id" component={ MyOrders } />
//                 <Route path="/admin/profile" component={ AdminProfile } />
//                 <Route exact path="/admin/orders" component={ AdminOrders } />
//                 <Route path="/admin/orders/:id" component={ AdminOrderDetails } />
//               </Switch>
//             </Transition>
//           </TransitionGroup>
//         );
//       } }
//     />
//   </div>
// );

export default Routes;
