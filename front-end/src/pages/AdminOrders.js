import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import TrybeerContext from '../context/TrybeerContext';
import { getAllSales } from '../services/api';
import SideBarAdmin from '../components/SideBarAdmin/SideBarAdmin';
// import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router';

import './Admin.css';

function AdminOrders() {
  const { sales, setSales } = useContext(TrybeerContext);
  const history = useHistory();

  useEffect(() => {
    getAllSales()
      .then((salesAPI) => setSales(salesAPI));
  }, []);

  function redirectDetails(id) {
    history.push(`/admin/orders/${id}`);
  }

  return (
    <div className="div-main">
      <SideBarAdmin />
      <div className="div-filha">
        <h1 className="title">Admin Orders</h1>
        { sales.map((sale, index) => (
          <div key={ index }>
            <button
              className="buttonPedidos"
              type="button"
              onClick={ () => redirectDetails(sale.id) }
            >
              <h2 data-testid={ `${index}-order-number` }>
                {`Pedido ${sale.id}`}
              </h2>
              <p data-testid={ `${index}-order-address` }>
                {`${sale.delivery_address}, ${sale.delivery_number}`}
              </p>
              <h3 data-testid={ `${index}-order-total-value` }>
                {`R$ ${sale.total_price.replace('.', ',')}`}
              </h3>
              <h3 data-testid={ `${index}-order-status` }>
                {sale.status}
              </h3>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
