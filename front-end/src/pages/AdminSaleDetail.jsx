import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import fetches from '../services/fetches';
import TopMenuAdmin from '../components/TopMenuAdmin';
import './AdminSaleDetail.css';

export default function AdminSaleDetail() {
  const tokenFromLocalStorage = localStorage.getItem('token');
  const location = useLocation();
  const [orderDetail, setOrderDetail] = useState([]);
  const SIX = 6;
  const pathName = location.pathname;
  const adminPathName = pathName.substr(SIX);
  const history = useHistory();

  useEffect(() => {
    fetches.getSaleById(tokenFromLocalStorage, adminPathName)
      .then((response) => setOrderDetail(response.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirect = (token) => {
    if (!token) return history.push('/login');
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

  const handleChangeStatusButton = () => {
    fetches.updateSale(tokenFromLocalStorage, adminPathName);
    window.location.reload();
  };

  return (
    <div>
      { handleRedirect(tokenFromLocalStorage) }
      <TopMenuAdmin pageTitle="TryBeer" />
      <div className="order-data-container">
        <div data-testid="order-number">
          {orderDetail.length && `Pedido ${orderDetail[0].sale_id}`}
        </div>
        <span data-testid="order-status">
          {orderDetail.length && orderDetail[0].status }
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
          <span data-testid={ `${index}-order-unit-price` }>
            {`(R$ ${(Number(order.price)).toFixed(2).replace('.', ',')})`}
          </span>
        </div>
      ))}
      <div className="total-value-container">
        <span data-testid="order-total-value">{`Total: R$ ${handletotalValue()}`}</span>
      </div>
      <button
        className={ orderDetail.length && orderDetail[0].status }
        data-testid="mark-as-delivered-btn"
        type="button"
        onClick={ handleChangeStatusButton }
      >
        Marcar como entregue
      </button>
    </div>
  );
}
