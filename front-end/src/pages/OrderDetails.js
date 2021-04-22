import React from 'react';

import { Topbar, OrderDetails as OrderDetailComponent } from '../components';

import '../styles/OrderDetails.css';

export default function OrderDetails() {
  const title = 'Meu Pedido';

  return (
    <section>
      <Topbar title={ title } />
      <OrderDetailComponent />
    </section>
  );
}
