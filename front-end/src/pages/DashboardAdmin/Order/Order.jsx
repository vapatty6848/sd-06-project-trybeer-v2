import React, { useEffect, useState } from 'react';
import { getSales } from '../../../services/Sales';
import Header from '../../../components/Header/Header';
import AdminOrderCard from '../../../components/AdminOrderCard/AdminOrderCard';

import './Order.css';

export default function Orders() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const allSales = await getSales();
      setSales(allSales);
    };
    fetchSales();
  }, []);

  return (
    <div>
      <Header title="TryBeer" user="admin" />
      {(sales.length && sales.map((sale, index) => (
        <AdminOrderCard
          sale={ sale }
          key={ sale.id }
          index={ index }
        />
      )))
      || (<span>Você não possui nenhum pedido :(</span>)}
    </div>
  );
}
