import React, { useContext } from 'react';
import AppContext from '../context/app.context';

import { Topbar, AdminOrderDetails as AdminOrderComponent } from '../components';

import '../styles/OrderDetails.css';

export default function AdminOrderDetails() {
  const { tokenContext: { token } } = useContext(AppContext);

  return (
    <section>
      <Topbar title="Detalhes de Pedido" />
        <AdminOrderComponent />
    </section>
  );
}
