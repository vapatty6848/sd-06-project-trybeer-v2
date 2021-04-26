import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import api from '../services/api';
import MenuTopAdmin from '../components/MenuTopAdmin';
import '../styles/adminOrdersDetails.css';

export default function AdminOrdersDetails() {
  const { id } = useParams();
  const [productsOfSale, setProductsOfSale] = useState([]);
  const [status, setStatus] = useState('Pendente');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return <Redirect to="/login" />;

    api.fetchSaleProduct(id).then((response) => {
      setProductsOfSale(response);

      response.products.reduce((acc, product) => {
        let total = 0;
        total = acc + product.salesProducts.quantity * product.price;
        setTotalPrice(total);
        return total;
      }, 0);
    });
  }, [id]);

  const handleClick = async (newStatus) => {
    setStatus(newStatus);
    await api.fetchChangeStatus(id, newStatus);
  };

  useEffect(() => {
    const statusOrder = productsOfSale && productsOfSale.status;
    if (statusOrder === 'Entregue') setStatus('Entregue');
    if (statusOrder === 'Preparando') setStatus('Preparando');
  }, [productsOfSale]);

  return !productsOfSale ? <p>Carregando...</p> : (
    <div className="main-container-adm">
      <div className="menu-top-adm">
        <MenuTopAdmin />
      </div>
      <div className="page-body-adm">
        <div className="page-title-adm">
          <h1 data-testid="top-title">Detalhes de Pedido</h1>
        </div>
        <div className="main-page-adm">
          <div className="title-adm-details">
            <h2 data-testid="order-number">{`Pedido ${id}`}</h2>
            <h2 data-testid="order-status">
              {status}
            </h2>
          </div>
          <div>
            {productsOfSale.products && productsOfSale.products.map((produto, index) => (
              <div key={ produto.id } className="cada-venda-adm">
                <div className="venda-adm">
                  <div data-testid={ `${index}-product-qtd` }>{produto.quantity}</div>
                  <div data-testid={ `${index}-product-name` }>{produto.name}</div>
                  <div data-testid={ `${index}-product-total-value` }>
                    {(produto.price * produto.salesProducts.quantity)
                      .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    <div data-testid={ `${index}-order-unit-price` }>
                      (
                      {Number(produto.price).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                      )
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h2 data-testid="order-total-value" className="total-price">
            { totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
          </h2>
          <div className="button-register">
            <button
              className="btn btn-danger"
              type="button"
              data-testid="mark-as-delivered-btn"
              onClick={ () => handleClick('Entregue') }
              hidden={ status === 'Entregue' }
            >
              Marcar como entregue
            </button>
            <button
              className="btn btn-danger"
              type="button"
              data-testid="mark-as-prepared-btn"
              onClick={ () => handleClick('Preparando') }
              hidden={ status === 'Entregue' }
            >
              Preparar pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
