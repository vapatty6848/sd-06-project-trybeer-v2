import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import productsContext from '../context/productsContext';

export default function OrderCard() {
  const { orders } = useContext(productsContext);

  const formatDate = (date) => {
    const dateInMiliseconds = 60000;
    const indexDate = -2;
    const newDateInBrazilTimeZone = new Date(date.valueOf() - date.getTimezoneOffset()
    * dateInMiliseconds);
    const day = `0${newDateInBrazilTimeZone.getDate()}`;
    const month = `0${newDateInBrazilTimeZone.getMonth() + 1}`;
    const newDate = `${day.slice(indexDate)}/${month.slice(indexDate)}`;
    return newDate;
  };

  const formatTotalPrice = (price) => {
    const newPrice = price.replace('.', ',');
    return `R$ ${newPrice}`;
  };

  return (
    <div className="order-card-container">
      { orders.length && orders.map((order, index) => (
        <Link key={ order.id } to={ `/orders/${order.id}` }>
          <div
            className="order-card"
            data-testid={ `${index}-order-card-container` }
          >
            <div data-testid={ `${index}-order-number` }>{`Pedido ${order.id}`}</div>
            <div
              data-testid={ `${index}-order-date` }
            >
              { formatDate(new Date(order.sale_date)) }
            </div>
            <div data-testid={ `${index}-order-total-value` }>
              {formatTotalPrice(order.total_price)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
