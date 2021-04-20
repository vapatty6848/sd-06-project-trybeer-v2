import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MenuTop from '../components/MenuTop';
import { allSales } from '../services/salesServices';
import SaleCard from '../components/SaleCard';

function Orders() {
  const [sales, setSales] = useState([]);
  const history = useHistory();

  const findAllSales = async () => {
    const findSales = await allSales();
    setSales(findSales);
  };

  const auxFunc = async () => {
    const storageUser = JSON.parse(localStorage.getItem('user'));
    console.log(storageUser);

    if (!storageUser) {
      history.push('/login');
    }
  };

  useEffect(() => {
    findAllSales();
    auxFunc();
  }, []);

  return (
    <div>
      <MenuTop title="Meus Pedidos" />
      <div className="orders-container">
        {sales.map((sale, index) => (
          <SaleCard
            key={ index }
            index={ index }
            saleNumber={ sale.id }
            date={ sale.saleDate }
            value={ sale.totalPrice }
            status={ sale.status }
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;
