import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ParseCurrency from '../utils/parseCurrencyToBRL';

function OrderCardAdm({ orderInfo, index }) {
  const {
    id,
    deliveryAddress: house,
    deliveryNumber: numberHouse,
    totalPrice,
    status,
  } = orderInfo;

  const history = useHistory();

  return (
    <button
      type="button"
      onClick={ () => history.push(`/admin/orders/${id}`) }
      className="card-order-adm"
    >
      <div>
        <p className="order-number" data-testid={ `${index}-order-number` }>
          {`Pedido ${id}`}
        </p>
        <p className="shipping-adress" data-testid={ `${index}-order-address` }>
          {`${house}, ${numberHouse}`}
        </p>
      </div>
      <div className="price-status">
        <div data-testid={ `${index}-order-total-value` }>
          {ParseCurrency(totalPrice)}
        </div>
        <div data-testid={ `${index}-order-status` }>{status}</div>
      </div>
    </button>
  );
}

OrderCardAdm.propTypes = {
  orderInfo: PropTypes.shape({
    id: PropTypes.number,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.number,
    totalPrice: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default OrderCardAdm;
