import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import '../css/OrderCard.css';
import { Link } from 'react-router-dom';
import BeerContext from '../context/BeerContext';
import { getproductsBySaleId } from '../api/index';

function CheckoutCard(props) {
  const { order, index } = props;
  const firstPositionMonth = 6;
  const firstPositionDay = 9;
  const length = 2;

  const {
    setProductsOrder,
    setSaleIdOrder,
    setDateOrder,
    setTotalprice,
  } = useContext(BeerContext);

  const date = JSON.stringify(order.sale_date);
  const formattedDate = `${date
    .substr(firstPositionDay, length)}/${date.substr(firstPositionMonth, length)}`;

  const handleClick = () => {
    async function setInfoProvider() {
      await getproductsBySaleId(setProductsOrder, order.id);
      setSaleIdOrder(order.id);
      setDateOrder(formattedDate);
      setTotalprice(order.total_price.toString().replace('.', ','));
    }
    setInfoProvider();
  };

  return (
    <div
      className="order-card-container"
      data-testid={ `${index}-order-card-container` }
    >
      <Link to={ `orders/${order.id}` }>
        <a
          href="orders/:id"
          data-testid={ `${index}-order-number` }
          onClick={ () => handleClick() }
        >
          { `Pedido ${JSON.stringify(order.id)}` }
        </a>
      </Link>
      <p data-testid={ `${index}-order-date` }>
        {`Data: ${formattedDate}`}
      </p>
      <p data-testid={ `${index}-order-total-value` }>
        Preço: R$
        {' '}
        { order.total_price.toString().replace('.', ',') }
      </p>
    </div>
  );
}

CheckoutCard.propTypes = {
  order: PropTypes.objectOf(PropTypes.number, PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default CheckoutCard;
