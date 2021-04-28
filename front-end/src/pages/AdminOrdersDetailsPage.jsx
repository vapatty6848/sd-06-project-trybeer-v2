import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import BeersAppContext from '../context/BeersAppContext';
import {
  AdminDetailsOrdersCardsComponent,
  AdminSideBarComponent,
} from '../components';
import '../style/AdminOrderDetails.css';
import fetchApiJsonBody from '../service/fetchApi';
import statusConvert from '../service/statusConvert';
import formatPrice from '../service/formatPrice';
import socket from '../Socket.io/socket';
import statusConvertCss from '../service/statusConvertCss';

function AdminOrdersDetailsPage() {
  const { id } = useParams();
  const {
    user,
  } = useContext(BeersAppContext);

  const [AdminOrders, setAdminOrders] = useState([]);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    socket.on('statusUpdate', ({ status }) => {
      const AdminOrdersStatusUpdate = AdminOrders
        .map((element) => ({ ...element, status }));
      setAdminOrders(AdminOrdersStatusUpdate);
    });
    return () => socket
      .off('statusUpdate', () => console.log('canal statusUpdate desconectado'));
  }, [AdminOrders]);

  useEffect(() => {
    fetch(`http://localhost:3001/admin/orders/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: user.token,
      },
    }).then((response) => response.json())
      .then((data) => {
        if (data.err) return setMessageError(data.err);
        setMessageError('');
        setAdminOrders(data);
      });
  }, []);

  const totalPrice = AdminOrders
    .reduce((total, element) => {
      const price = parseFloat(total) + parseFloat(element.productPrice);
      return price;
    }, 0).toFixed(2);

  const statusOrder = () => {
    if (AdminOrders.length !== 0) {
      const { status } = AdminOrders[0];
      return statusConvert(status);
    }
    return '';
  };

  const updateStatus = async ({ target: { name: status } }) => {
    socket.emit('statusUpdate', { id, status });
    const returnUpdate = await fetchApiJsonBody(
      `/admin/orders/${id}`,
      { status },
      'PUT',
      user.token,
    );
    if (returnUpdate.err) return setMessageError(returnUpdate.err);
    setMessageError('');
    const AdminOrdersStatusUpdate = AdminOrders
      .map((element) => ({ ...element, status }));
    setAdminOrders(AdminOrdersStatusUpdate);
  };

  return (
    <div className="admin_orders_details">
      <AdminSideBarComponent />
      <div className="admin_orders_details_title">
        <h1 data-testid="order-number">{ `Pedido ${id}` }</h1>
        <h1
          data-testid="order-status"
          className={ statusConvertCss(statusOrder()) }
        >
          { statusOrder() }
        </h1>
      </div>
      <div className="admin_orders_details_list">
        <div className="admin_orders_details_product">
          {AdminOrders.map((element, index) => (
            <div key={ index }>
              <AdminDetailsOrdersCardsComponent
                element={ element }
                index={ index }
              />
            </div>
          ))}
        </div>
        <div className="admin_orders_details_price">
          <p data-testid="order-total-value">{ `R$ ${formatPrice(totalPrice)}` }</p>
        </div>
      </div>
      <div className="admin_orders_details_button">
        {statusOrder() === 'Pendente' && (
          <button
            type="button"
            data-testid="mark-as-prepared-btn"
            onClick={ updateStatus }
            name="PREPARING"
          >
            Preparar pedido
          </button>
        )}
      </div>
      <div className="admin_orders_details_button">
        { (
          statusOrder() === 'Pendente'
            || statusOrder() === 'Preparando'
        ) && (
          <button
            type="button"
            data-testid="mark-as-delivered-btn"
            onClick={ updateStatus }
            name="DELIVERED"
          >
            Marcar como entregue
          </button>
        )}
      </div>
      <span>{ messageError }</span>
    </div>
  );
}

export default AdminOrdersDetailsPage;
