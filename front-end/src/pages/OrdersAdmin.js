import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import AppContext from '../context/app.context';
import { Topbar, Loading } from '../components';
import api from '../services';

import '../styles/Orders.css';

export default function Orders() {
  const { tokenContext: { token } } = useContext(AppContext);
  const [orders, setOrders] = useState();
  const history = useHistory();

  useEffect(() => {
    const magicTime = 100;
    const fetchOrders = async () => {
      const ordersArray = await api.admin.sales(token).catch((error) => error);
      setOrders(ordersArray);
    };
    const timeOut = setTimeout(() => fetchOrders(), magicTime);
    return () => {
      clearTimeout(timeOut);
    };
  }, [setOrders, token]);

  const convertDate = (date) => {
    const orderDate = new Date(date);
    const month = orderDate.getMonth() + 1;
    const min = 10;
    return [
      `${orderDate.getDate()}/${(month < min) ? `0${month}` : month}`,
      orderDate.getFullYear(),
    ];
  };

  const getOrderDetails = useCallback((id) => {
    history.push(`/orders/${id}`);
  }, [history]);

  return (
    <section>
      <Topbar title="Meus Pedidos" />
      { (!orders)
        ? <Loading />
        : (
          <section className="orders-container">
            { (orders.length < 1)
              ? 'Você ainda não tem pedidos.'
              : orders.map(({ id, total_price: totalPrice, sale_date: date }, index) => (
                <section
                  className="order-card"
                  role="link"
                  onClick={ () => getOrderDetails(id) }
                  onKeyDown={ () => getOrderDetails(id) }
                  tabIndex={ index }
                  key={ `${index}-${id}` }
                  data-testid={ `${index}-order-card-container` }
                >
                  <section className="name" data-testid={ `${index}-order-number` }>
                    { `Pedido ${id}` }
                  </section>
                  <section className="total" data-testid={ `${index}-order-total-value` }>
                    { `R$ ${totalPrice.replace('.', ',')}` }
                  </section>
                  <section className="date" data-testid={ `${index}-order-date` }>
                    { convertDate(date)[0] }
                    <br />
                    { convertDate(date)[1] }
                  </section>
                </section>
              )) }
          </section>
        ) }
    </section>
  );
}
