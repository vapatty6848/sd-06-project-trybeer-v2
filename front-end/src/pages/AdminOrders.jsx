import React, { useState, useEffect } from 'react';
import AdminSideBar from '../components/AdminSideBar';
import { getOrders } from '../api/index';
import OrderCardAdmin from '../components/OrderCardAdmin';
import '../css/AdminOrders.css';
import '../css/General.css';

function AdminOrders() {
  const [orders, setOrders] = useState(false);

  useEffect(() => {
    getOrders(setOrders);
  }, []);

  return (
    <div className="admin-container">
      <div>
        <h1>Pedidos</h1>
        <AdminSideBar />
        <section className="admin-orders-list">
          { orders && orders.map((order, index) => (<OrderCardAdmin
            key={ index }
            index={ index }
            order={ order }
          />))}
        </section>
      </div>
    </div>
  );
}

export default AdminOrders;
