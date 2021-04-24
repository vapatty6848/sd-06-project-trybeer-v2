import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import OrderCard from '../components/OrderCard';
import TopMenu from '../components/TopMenu';
import fetches from '../services/fetches';
import productsContext from '../context/productsContext';

export default function Orders() {
  const { setOrders } = useContext(productsContext);
  const tokenFromLocalStorage = localStorage.getItem('token');
  const history = useHistory();

  useEffect(() => {
    const fetch = async () => {
      const allOrders = await fetches.getSales(tokenFromLocalStorage);
      setOrders(allOrders.data);
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirect = (token) => {
    if (!token) return history.push('/login');
  };

  return (
    <div>
      <TopMenu pageTitle="Meus Pedidos" />
      <OrderCard />
      { handleRedirect(tokenFromLocalStorage) }
    </div>
  );
}
