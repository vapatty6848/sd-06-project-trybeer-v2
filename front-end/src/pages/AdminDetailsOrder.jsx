import React, { useContext } from 'react';
import AdminSideBar from '../components/AdminSideBar';
import BeerContext from '../context/BeerContext';
import ProductCardAdmin from '../components/ProductCardAdmin';
import { changeStatus } from '../api/index';
import '../css/AdminOrders.css';
import '../css/General.css';

function AdminDetailsOrder() {
  const { saleDetail, setSaleDetail } = useContext(BeerContext);
  const { sale, products } = saleDetail;

  // const handleClick = () => {
  //   async function getSaleDetail() {
  //     await changeStatus(sale.id);
  //   }
  //   getSaleDetail();
  // };

  return (
    <div className="admin-container">
      <AdminSideBar />
      <div className="admin-container-detail">
        <div>
          <h1>Detalhes do pedido</h1>
        </div>
        { !saleDetail ? <p>Loading</p> : (
          <div className="admin-order-details">
            <div className="larger-text">
              <span data-testid={`${sale.id}-order-number`}>{`Pedido ${sale.id} - `}</span>
              <span data-testid="order-status">{`${sale.status}`}</span>
            </div>
            <section className="orders-list">
              { products && products
                .map((prod, index) => (<ProductCardAdmin
                  key={ index }
                  product={ prod }
                  index={ index }
                />
                ))}
            </section>
            <p
              data-testid="order-total-value"
              className="larger-text"
            >
              {`Total: R$ ${sale.totalPrice.toString().replace('.', ',')}`}
            </p>
            { (sale.status !== 'Entregue') ? (
              <div>
                <button
                type="button"
                onClick={ async () => await changeStatus(setSaleDetail, sale.id, 'Entregue') }
                data-testid="mark-as-delivered-btn"
                className="mark-as-delivered-btn"
              >
                Marcar como entregue
              </button>
              <button
                type="button"
                onClick={ async () => await changeStatus(setSaleDetail, sale.id, 'Preparando') }
                data-testid="mark-as-prepared-btn"
                className="mark-as-delivered-btn"
              >
                Preparar pedido
              </button>
              </div>
            ): ''}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDetailsOrder;
