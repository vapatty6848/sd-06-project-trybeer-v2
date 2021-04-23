import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../styles/cardOrders.css';
import api from '../services/api';

export default function CardOrders() {
  const [sales, setSales] = useState([]);
  const fetchApiSales = async () => {
    const allSales = await api.fetchSales();
    const salesOrder = allSales.sort((a, b) => a.id - b.id);

    setSales(salesOrder);
  };

  useEffect(() => {
    fetchApiSales();
  }, []);

  const seventeen = -17;
  const five = 5;
  const eigth = 8;
  const fourteen = -14;

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Redirect to="login" />;

  const formatDate = (date) => {
    const month = date.slice(five, seventeen);
    const day = date.slice(eigth, fourteen);

    return `${day}/${month}`;
  };

  return (
    <div className="main-container">
      {sales.map((sale, index) => (
        <Link to={ `/orders/${sale.id}` } key={ sale.id }>
          <div className="cada-compra">
            <div data-testid={ `${index}-order-card-container` } className="compra">
              <h4 data-testid={ `${index}-order-number` }>{`Pedido ${sale.id}`}</h4>
              <h4 data-testid={ `${index}-order-date` }>{formatDate(sale.saleDate)}</h4>
              <h4 data-testid={ `${index}-order-total-value` }>
                {Number(sale.totalPrice).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </h4>
              <h4>{sales[index].status}</h4>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
