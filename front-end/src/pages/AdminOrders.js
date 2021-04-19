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
          <div className="order-details-card-admin">
          <OrderCard
            key={ index }
            index={ index }
            saleId={ order.id }
            street={ order.delivery_address }
            streetNR={ order.delivery_number }
            totalValue={ order.total_price }
            status={ order.status }
          />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
