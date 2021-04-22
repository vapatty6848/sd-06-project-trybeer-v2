import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import AppContext from '../context/app.context';

import { Topbar, Loading, AdminOrderDetails as AdminOrderComponent } from '../components';
import api from '../services';

import '../styles/OrderDetails.css';

export default function AdminOrderDetails() {
  const { tokenContext: { token } } = useContext(AppContext);
  const [order, setOrder] = useState();
  const params = useParams();

  const history = useHistory();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const currOrder = await api.admin({ ...token, saleId: params.id });
        if (currOrder.code) {
          history.push({
            pathname: '/error',
            state: { ...currOrder } });
        }
        setOrder(currOrder);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [setOrder, params, token, history]);

  return (
    <section>
      <Topbar title="Detalhes de Pedido" />
      { (!order)
        ? <Loading />
        : <AdminOrderComponent order={ order } callback={ setOrder } /> }
    </section>
  );
}
