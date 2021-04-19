import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminSideBarComponent, AdminOrdersCardsComponent } from '../components';
import BeersAppContext from '../context/BeersAppContext';
import '../style/AdminOrder.css';

function AdminOrdersPage() {
  const {
    user,
  } = useContext(BeersAppContext);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/admin/orders', {
      headers: {
        'Content-Type': 'application/json',
        authorization: user.token,
      },
    }).then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div>
      <AdminSideBarComponent />
      <div className="admin_orders">
        <h1>Pedidos</h1>
        <div className="order-list">
          {orders.map((element, index) => (
            <div key={ element.id }>
              <Link to={ `/admin/orders/${element.id}` }>
                <AdminOrdersCardsComponent
                  element={ element }
                  index={ index }
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminOrdersPage;
