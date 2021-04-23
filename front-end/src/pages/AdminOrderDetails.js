import React from 'react';

import { Topbar, AdminOrderDetails as AdminOrderComponent } from '../components';

import '../styles/OrderDetails.css';

export default function AdminOrderDetails() {
  return (
    <section>
      <Topbar title="Detalhes de Pedido" />
      <AdminOrderComponent />
    </section>
  );
}
