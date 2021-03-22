import React, { useEffect} from 'react';
import { MenuTop } from '../components';
import OrderCard from '../components/OrderCard';

function OrdersClient() {
  useEffect(() => {
    console.log('ordersClient');
  });
  return (
    <div>
      <MenuTop title="Meus Pedidos" />
      <OrderCard />
    </div>
  );
}

export default OrdersClient;
