import React, { useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';
import { SideBar, AdminSaleCard } from '../components';

function AdminOrders({ history }) {
  const { validateToken, getAllSales,
    allSales, isFetching, setIsFetching } = useContext(Context);

  useEffect(() => {
    validateToken(history);
    getAllSales();
    // eslint-disable-next-line
  }, []);

  function handleSales() {
    if (allSales.length === 0) {
      return <h2>Não há pedidos!</h2>;
    }
    return allSales.map((sale, index) => (
      <Link key={ index } to={ `/admin/orders/${sale.saleId}` }>
        <AdminSaleCard
          key={ index }
          indexId={ index }
          saleId={ sale.saleId }
          street={ sale.street }
          number={ sale.number }
          totalValue={ sale.totalValue }
          status={ sale.status }
        />
      </Link>
    ));
  }

  useEffect(() => {
    if (allSales.length > 0) {
      setIsFetching(false);
    } else {
      handleSales();
    }
    // eslint-disable-next-line
  }, [allSales]);

  return (
    <div>
      <SideBar title="Pedidos" />
      <div className="adm-body">
        {isFetching ? <h3>Loading</h3> : handleSales()}
      </div>
    </div>
  );
}

AdminOrders.defaultProps = {
  history: '/admin/orders',
};

AdminOrders.propTypes = {
  history: propTypes.shape(),
};

export default AdminOrders;
