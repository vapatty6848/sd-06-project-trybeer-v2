import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BeerContext from '../context/BeerContext';
import { getSalesProductsBySaleId } from '../api/index';
import '../css/OrderCardAdmin.css';

function OrderCardAdmin(props) {
  const { order, index } = props;
  const total = order.total_price.replace('.', ',');
  const { setSaleDetail } = useContext(BeerContext);

  const handleClick = () => {
    async function setInfoProvider() {
      await getSalesProductsBySaleId(setSaleDetail, order.id);
    }
    setInfoProvider();
  };

  return (
    <Link to={ `/admin/orders/${order.id}` } className="admin-order-card">
      <a
        href="/admin/orders/:id"
        onClick={ () => handleClick() }
      >
        <div data-testid={ `${index}-order-card-container` } className="lol">
          <p
            data-testid={ `${index}-order-number` }
            className="admin-order-number"
          >
            {`Pedido ${order.id}`}
          </p>
          <p
            data-testid={ `${index}-order-address` }
            className="admin-order-address"
          >
            {`${order.delivery_address}, ${order.delivery_number}`}
          </p>
          <div className="total-and-status">
            <p
              data-testid={ `${index}-order-total-value` }
              className="admin-order-value"
            >
              {`R$ ${total}`}
            </p>
            <p
              data-testid={ `${index}-order-status` }
              className="admin-order-status"
            >
              {`${order.status}`}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
}

OrderCardAdmin.propTypes = {
  order: PropTypes.objectOf(PropTypes.number, PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default OrderCardAdmin;
