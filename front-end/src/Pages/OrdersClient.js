import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import { MenuTop } from '../components';
import OrderCard from '../components/OrderCard';

function OrdersClient({ history }) {
  const { getAllOrders, allOrders, isFetching,
    validateToken, setIsFetching } = useContext(Context);

  useEffect(() => {
    validateToken(history);
    getAllOrders();
    // eslint-disable-next-line
  }, []);

  function handleOrders() {
    if (allOrders.length === 0) {
      return <h2>Não há pedidos!</h2>;
    }
    return allOrders.map((order, index) => (
      <Link key={ index } to={ `/orders/${order.saleId}` }>
        <OrderCard
          key={ index }
          indexId={ index }
          orderId={ order.saleId }
          date={ order.date }
          totalValue={ order.totalValue }
        />
      </Link>
    ));
  }

  useEffect(() => {
    if (allOrders.length > 0) {
      setIsFetching(false);
    } else {
      handleOrders();
    }
    // eslint-disable-next-line
  }, [allOrders]);

  return (
    <div className="orders-main-div">
      <MenuTop title="Meus Pedidos" />
      <div>
        {isFetching
          ? <h2>Loading...</h2>
          : handleOrders()}
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
