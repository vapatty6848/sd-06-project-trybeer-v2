import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import AppContext from '../context/app.context';

import OrderProduct from './OrderProduct';
import AdminButton from './AdminButton';
import { convertDate } from '../utils';
import adminApi from '../services/api.admin';

export default function OrderDetails({ order, callback }) {
  const { tokenContext: { token },
    productsContext: { products } } = useContext(AppContext);

  const updateStatus = async (newStatus) => {
    try {
      await adminApi({ ...token, saleId: order.id, status: newStatus });
      callback({ ...order, status: newStatus });
      return { status: 'OK', message: `Sale status updated to ${newStatus}` };
    } catch (error) {
      return error;
    }
  };

  if (!order.products || !products) return 'Loading order...';

  return (
    <section className="order-detail-wrapper">
      <h3 data-testid="order-number">{ `Pedido ${order.id}` }</h3>
      <p data-testid="order-date">{ convertDate(order.createdAt)[0] }</p>
      <section>
        <p>{ `Cliente: ${order.user.name}` }</p>
        <p data-testid="order-status">{ order.status }</p>
      </section>
      { order.products.map((curr, index) => (
        <OrderProduct index={ index } product={ curr } key={ index } />
      )) }
      <p data-testid="order-total-value">
        { `Total: R$ ${order.totalPrice.replace('.', ',')}` }
      </p>
      { (order.status !== 'Entregue') && (
        <>
          <AdminButton callback={ updateStatus } id="preparando" />
          <AdminButton callback={ updateStatus } id="entregue" />
        </>) }
    </section>
  );
}

OrderDetails.propTypes = {
  order: PropTypes.objectOf(PropTypes.any),
  callback: PropTypes.func,
};

OrderDetails.defaultProps = {
  order: {},
  callback: () => {},
};
