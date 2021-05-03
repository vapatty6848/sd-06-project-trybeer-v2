import React from 'react';
import PropTypes from 'prop-types';
import OrderCard from './OrderCard';

function OrdersList({ orders }) {
  return (
    <section>
      <h1>Meus Pedidos</h1>
      <div style={{ marginTop: 0 }} className="cards-container">

        {
          orders
            .map((order, index) => (
              <OrderCard
                order={order}
                orderIndex={index}
                key={order.id}
              />))
        }
      </div>
    </section>
  );
}

export default OrdersList;

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.any).isRequired,
};
