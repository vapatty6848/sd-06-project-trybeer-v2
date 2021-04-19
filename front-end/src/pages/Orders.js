import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TrybeerContext from '../context/TrybeerContext';
import { TopMenu } from '../components';
import { verifyToken } from '../utils/verifications';
import formatedPrice from '../utils/formatedPrice';
import formatedDate from '../utils/formatedDate';
import './Orders.css';

function Orders({ history }) {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(TrybeerContext);

  const fetchOrders = async () => {
    const allOrders = await verifyToken(`orders/${user.id}`, user, history);
    setOrders(allOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <TopMenu
        titleMenu="Meus Pedidos"
      />
      <div className="content-panel">
        <div className="container">
          {
            orders.map(({ id, date_time: saleDate, total_price: totalPrice }, index) => (
              <div
                key={ id }
                className="order-card-container"
                data-testid={ `${index}-order-card-container` }
              >
                <Link
                  to={ { pathname: `/orders/${id}`,
                    state: { id, saleDate, totalPrice } } }
                >
                  <div className="card-id-date">
                    <div data-testid={ `${index}-order-number` }>
                      {`Pedido ${id}` }
                    </div>
                    <div data-testid={ `${index}-order-date` }>
                      { formatedDate(saleDate) }
                    </div>
                  </div>
                  <div
                    className="card-total"
                    data-testid={ `${index}-order-total-value` }
                  >
                    { formatedPrice(totalPrice) }
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

Orders.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Orders;
