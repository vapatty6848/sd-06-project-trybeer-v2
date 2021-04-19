import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import NavbarAdmin from '../components/NavBarAdmin';
import withAuth from '../components/hocs/withAuth';
import { Container } from '../styles/styles';
import Api from '../api/axiosApi';
import withOrders from '../components/hocs/withHandleApi';
import './AdminOrderDetail.css';

function AdminOrders(orders) {
  return (
    <div>
      <Header isAdmin />
      <NavbarAdmin />
      <Container>
        {
          !orders.loading && orders.data.map((order, index) => (
            <div key="index" className="card">
              <ul>
                <Link to={ `/admin/orders/${index + 1}` }>
                  <button
                    type="button"
                    data-testid={ `${index}-order-number` }
                  >
                    {`Pedido ${index + 1}`}
                  </button>
                  <p
                    data-testid={ `${index}-order-address` }
                  >
                    {`${order.delivery_address}, ${order.delivery_number}`}
                  </p>
                  <p
                    data-testid={ `${index}-order-total-value` }
                  >
                    {`R$ ${order.total_price.replace('.', ',')}`}
                  </p>
                  <p
                    data-testid={ `${index}-order-status` }
                  >
                    { order.status }
                  </p>
                </Link>
              </ul>

            </div>
          ))
        }
      </Container>
    </div>
  );
}

export default withAuth(withOrders(AdminOrders, Api.getSales));
