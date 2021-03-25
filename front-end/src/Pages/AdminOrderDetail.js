import React, { useEffect, useContext } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import { SideBar, AdminDetailCard } from '../components';
import '../App.css';

function AdminOrderDetail({ history, match }) {
  const { validateToken, isFetching, getAdminDetails,
    saleDetails, handleStatus, status } = useContext(Context);
  const { id } = match.params;

  useEffect(() => {
    validateToken(history);
    getAdminDetails(id);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getAdminDetails(id);
    // eslint-disable-next-line
  }, [status]);

  return (
    <div>
      <SideBar title="Detalhes de Pedido" />
      <div className="adm-body">
        <div>
          <h3 data-testid="order-number">{`Pedido ${id}`}</h3>
          {saleDetails.length > 0 && (
            <h3 data-testid="order-status">{saleDetails[0].status}</h3>)}
        </div>
        {isFetching
          ? <h2>Loading...</h2>
          : saleDetails.map((detail, index) => (
            <AdminDetailCard
              key={ index }
              indexId={ index }
              quantity={ detail.quantity }
              name={ detail.name }
              unitPrice={ detail.unitPrice }
            />
          ))}
        {saleDetails.length > 0 && (
          <h4 data-testid="order-total-value">
            {`Total R$ ${saleDetails[0].totalValue.replace('.', ',')}`}
          </h4>
        )}
        <button
          type="button"
          data-testid="mark-as-delivered-btn"
          onClick={ () => handleStatus(id) }
          hidden={ saleDetails.length > 0 && saleDetails[0].status === 'Entregue' }
        >
          Marcar como entregue
        </button>
      </div>
    </div>
  );
}

AdminOrderDetail.defaultProps = {
  history: '/admin/orders',
};

AdminOrderDetail.propTypes = {
  history: propTypes.shape(),
  match: propTypes.shape().isRequired,
};

export default AdminOrderDetail;
