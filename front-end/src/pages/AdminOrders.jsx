import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuTopAdmin from '../components/MenuTopAdmin';
import api from '../services/api';
import '../styles/adminOrders.css';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const allOrders = await api.fetchAllOrders();

    setOrders(allOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="main-container-adm">
      <div className="menu-top-adm">
        <MenuTopAdmin />
      </div>
      <div className="page-body-adm">
        <div className="page-title-adm">
          <h1>Pedidos</h1>
        </div>
        <div className="main-page-adm">
          {orders.length !== 0 && orders.map((order, index) => (
            <Link
              to={ `/admin/orders/${order.id}` }
              key={ order.id }
            >
              <div className="cada-venda-adm">
                <div className="venda-adm">
                  <span data-testid={ `${index}-order-number` }>
                    { `Pedido ${order.id}` }
                  </span>
                  <br />
                  <span data-testid={ `${index}-order-address` }>
                    { `Rua ${order.deliveryAddress}, ${order.deliveryNumber}` }
                  </span>
                  <br />
                  <span data-testid={ `${index}-order-total-value` }>
                    { Number(order.totalPrice)
                      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
                  </span>
                  <br />
                  <span data-testid={ `${index}-order-status` }>{ order.status }</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
