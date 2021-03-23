import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import { MenuTop } from '../components';
import OrderCard from '../components/OrderCard';

function OrdersClient({ history }) {
  const { getAllOrders, allOrders, isFetching, validateToken } = useContext(Context);

  useEffect(() => {
    validateToken(history);
    getAllOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <MenuTop title="Meus Pedidos" />
      <div>
        {isFetching
          ? <h2>Loading...</h2>
          : allOrders.map((order, index) => (
            <Link key={ index } to={ `/orders/${order.saleId}` }>
              <OrderCard
                key={ index }
                indexId={ index }
                orderId={ order.saleId }
                date={ order.date }
                totalValue={ order.totalValue }
              />
            </Link>
          ))}
      </div>
    </div>
  );
}

OrdersClient.defaultProps = {
  history: '/orders',
};

OrdersClient.propTypes = {
  history: propTypes.shape(),
};

export default OrdersClient;
