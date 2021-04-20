import React, { useEffect, useState } from 'react';
import MenuAdmin from '../components/MenuAdmin';
import OrderCard from '../components/OrderCard';
import { allSales } from '../services/salesServices';

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    const responseOrders = await allSales();
    setOrders(responseOrders);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div>
      <MenuAdmin />
      <h1 className="align-center"> Meus Pedidos</h1>
      <div className="admin-orders-main">
        {orders.map((order, index) => (
          <div key={ index } className="order-details-card-admin">
            <OrderCard
              index={ index }
              saleId={ order.id }
              street={ order.deliveryAddress }
              streetNR={ order.deliveryNumber }
              totalValue={ order.totalPrice }
              status={ order.status }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
