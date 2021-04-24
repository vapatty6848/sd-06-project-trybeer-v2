import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import fetches from '../services/fetches';
import TopMenu from '../components/TopMenu';
import './SaleDetails.css';

export default function SaleDetails() {
  const tokenFromLocalStorage = localStorage.getItem('token');
  const location = useLocation();
  const [orderDetail, setOrderDetail] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const pathName = location.pathname;
    fetches.getSaleById(tokenFromLocalStorage, pathName)
      .then((response) => setOrderDetail(response.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirect = (token) => {
    if (!token) return history.push('/login');
  };

  const handleDate = () => {
    const five = 5;
    const three = 3;
    if (orderDetail.length) {
      const fullDate = orderDetail[0].sale_date.substr(five, five);
      const month = fullDate.substr(0, 2);
      const day = fullDate.substr(three);
      const saleDate = `${day}/${month}`;
      return saleDate;
    }
  };

  const handletotalValue = () => {
    if (orderDetail.length) {
      const totalPrice = orderDetail
        .reduce((accumulator, current) => accumulator
          + (Number(current.quantity) * Number(current.price)), 0);
      const totalOrderPrice = (totalPrice.toFixed(2)).replace('.', ',');
      return totalOrderPrice;
    }
  };

  return (
    <div>
      { handleRedirect(tokenFromLocalStorage) }
      <TopMenu pageTitle="Detalhes de Pedido" />
      <div className="order-data-container">
        <span data-testid="order-number">
          {orderDetail.length && `Pedido ${orderDetail[0].sale_id}`}
        </span>
        <span data-testid="order-date">
          {orderDetail.length && handleDate() }
        </span>
      </div>
      {orderDetail.length && orderDetail.map((order, index) => (
        <div key={ order.id } className="products-details-container">
          <span data-testid={ `${index}-product-qtd` }>{order.quantity}</span>
          <p data-testid={ `${index}-product-name` }>{order.name}</p>
          <span data-testid={ `${index}-product-total-value` }>
            {`R$ ${(Number(order.quantity) * Number(order.price))
              .toFixed(2).replace('.', ',')}`}
          </span>
        </div>
      ))}
      <div className="total-value-container">
        <span data-testid="order-total-value">{`Total: R$ ${handletotalValue()}`}</span>
      </div>
    </div>
  );
}
