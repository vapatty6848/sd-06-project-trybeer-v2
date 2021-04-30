import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TopMenu } from '../components';
import { verifyToken } from '../utils/verifications';
import { IconContext } from 'react-icons';
import { TiShoppingCart } from 'react-icons/ti';
import formatedPrice from '../utils/formatedPrice';
import TrybeerContext from '../context/TrybeerContext';
import './Orders.scss';

function AdminOrders({ history }) {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(TrybeerContext);

  const fetchOrders = useCallback(async () => {
    const allOrders = await verifyToken('admin/orders/', user, history);
    setOrders(allOrders);
  }, [history, user]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div>
      <TopMenu />
      <div className="content-panel">
        {
          orders.length && orders && orders.map(({
            id,
            deliveryAddress,
            deliveryNumber,
            totalPrice,
            status,
          }, index) => (
            <div key={ id } className="order-card-container">
              <IconContext.Provider value={{size: "4em"}}>
                <TiShoppingCart />
              </IconContext.Provider>
              <Link
                to={ { pathname: `/admin/orders/${id}`, state: { id } } }
              >
                <div className="card-id-date">
                  <div data-testid={ `${index}-order-number` }>
                    {`Id do pedido: ${id}` }
                    <br />
                    { `Status: ${status}` }
                    <br />
                    { `Rua: ${deliveryAddress}, Numero: ${deliveryNumber}` }
                    { `TOTAL: ${formatedPrice(totalPrice)}` }
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

AdminOrders.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default AdminOrders;
