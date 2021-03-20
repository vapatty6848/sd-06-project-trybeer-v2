import React from 'react';
import { MenuTop } from '../components';
import OrderCard from '../components/OrderCard';

function OrdersClient() {
  return (
    <div>
      <MenuTop title="Meus Pedidos" />
      <OrderCard />
    </div>
  );
}

export default OrdersClient;
