import React, { useEffect, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TrybeerContext from '../context/TrybeerContext';
import { TopMenu } from '../components';
import { verifyToken } from '../utils/verifications';
import formatedPrice from '../utils/formatedPrice';
import formatedDate from '../utils/formatedDate';
import { IconContext } from 'react-icons';
import { TiShoppingCart } from 'react-icons/ti';
import './Orders.scss';

function Orders({ history }) {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(TrybeerContext);

  const fetchOrders = useCallback(async () => {
    const allOrders = await verifyToken(`orders/${user.id}`, user, history);
    setOrders(allOrders);
  }, [user, history]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div>
      <TopMenu
        titleMenu="Meus Pedidos"
      />
      <div className="content-panel">
        {
          orders.map(({ id, saleDate, totalPrice, status }, index) => (
            <div
              key={ id }
              className="order-card-container"
              data-testid={ `${index}-order-card-container` }
            >
              <IconContext.Provider value={{size: "4em"}}>
                <TiShoppingCart />
              </IconContext.Provider>
              <Link
                to={ { pathname: `/orders/${id}`,
                  state: { id, saleDate, totalPrice, status } } }
              >
                <div className="card-id-date">
                  <div data-testid={ `${index}-order-number` }>
                    {`Id do pedido: ${id}` }
                    <br />
                    Status: {status} 
                    <br />
                    Data da compra: { formatedDate(saleDate) }
                    <br />
                    TOTAL: { formatedPrice(totalPrice) }
                  </div>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
}

Orders.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Orders;
