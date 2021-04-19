import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TopMenuAdmin from '../components/TopMenuAdmin';
import fetches from '../services/fetches';

export default function AdminOrders() {
  const tokenFromLocalStorage = localStorage.getItem('token');
  const [allSales, setAllSales] = useState([]);

  useEffect(() => {
    fetches.getAllSales(tokenFromLocalStorage)
      .then((response) => setAllSales(response.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div><TopMenuAdmin pageTitle="TryBeer" /></div>
      <div>
        {allSales.map((sale, index) => (
          <Link key={ sale.id } to={ `/admin/orders/${sale.id}` }>
            <div data-testid={ `${index}-order-number` }>
              {`Pedido ${sale.id}`}
            </div>
            <div data-testid={ `${index}-order-address` }>
              {`${sale.delivery_address}, ${sale.delivery_number}`}
            </div>
            <div data-testid={ `${index}-order-total-value` }>
              {`R$ ${Number(sale.total_price).toFixed(2).replace('.', ',')}`}
            </div>
            <div data-testid={ `${index}-order-status` }>
              {`${sale.status}`}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
