import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TopMenu } from '../components';
import { verifyToken } from '../utils/verifications';
import formatedPrice from '../utils/formatedPrice';
import TrybeerContext from '../context/TrybeerContext';

function AdminOrders({ history }) {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(TrybeerContext);
  const fetchOrders = async () => {
    const allOrders = await verifyToken('admin/orders/', user, history);
    setOrders(allOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, [setOrders, user]);

  return (
    <div>
      <TopMenu />
      {
        orders.map(({
          id,
          delivery_address: deliveryAddress,
          delivery_number: deliveryNumber,
          total_price: totalPrice,
          status,
        }, index) => (
          <div key={ id }>
            <Link
              to={ { pathname: `/admin/orders/${id}`, state: { id } } }
            >
              <div data-testid={ `${index}-order-number` }>
                {`Pedido ${id}` }
              </div>
              <div data-testid={ `${index}-order-address` }>
                { `${deliveryAddress}, ${deliveryNumber}` }
              </div>
              <div data-testid={ `${index}-order-total-value` }>
                { formatedPrice(totalPrice) }
              </div>
              <div data-testid={ `${index}-order-status` }>
                { status }
              </div>
            </Link>
          </div>
        ))
      }
    </div>
  );
}

AdminOrders.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default AdminOrders;
