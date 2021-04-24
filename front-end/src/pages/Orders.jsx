import React from 'react';
import CardOrders from '../components/CardOrders';
import MenuTop from '../components/MenuTop';

export default function Orders() {
  return (
    <div>
      <MenuTop title="Meus Pedidos" />
      <CardOrders />
    </div>
  );
}
