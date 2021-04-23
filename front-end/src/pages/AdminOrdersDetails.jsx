import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import api from '../services/api';
import MenuTopAdmin from '../components/MenuTopAdmin';
import '../styles/adminOrdersDetails.css';

export default function AdminOrdersDetails() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [productsOfSale, setProductsOfSale] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');
  const [buttonPrepared, setButtonPrepared] = useState(null);

  const fetchApiProductOfSale = async (idFetch) => {
    const productDetails = await api.fetchSaleProduct(idFetch);
    setProductsOfSale(productDetails);
    setProducts(productDetails.products);
    setOrderStatus(productDetails.status);
    console.log(orderStatus);
  };

  useEffect(() => {
    fetchApiProductOfSale(id);
    console.log(productsOfSale);
    // console.log(products);
    // console.log(productsOfSale, products) -> estão chegando vazios;
    if (products.length !== 0 && orderStatus === 'Entregue') {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }

    if (products.length !== 0 && orderStatus === 'Preparando') {
      setButtonPrepared(true);
    } else {
      setButtonPrepared(false);
    }

  }, [id, buttonDisabled, buttonPrepared]);

  const handleClick = async (status) => {
    setOrderStatus(status);
    
    if (status === 'Preparando') {
      setButtonPrepared(true);
      await api.fetchChangeStatus(id, status);
      // window.location.reload();
  } 
      
    
    if (status === 'Entregue') {
      setButtonDisabled(false);
      await api.fetchChangeStatus(id, status);
      // window.location.reload();
    }
  };

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Redirect to="/login" />;

  const sumOfCart = (sum, prod) => sum + prod.salesProducts.quantity * prod.price;

  return (
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
              {productsOfSale.length !== 0 && productsOfSale.status}
            </h2>
          </div>
          <div>
            {products.map((produto, index) => (
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
            {products
              .reduce(sumOfCart, 0)
              .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </h2>
          <div className="button-register">
            {buttonDisabled && (orderStatus !== 'Entregue') && (
              <div>
                <button
                  className="btn btn-danger"
                  type="button"
                  data-testid="mark-as-delivered-btn"
                  onClick={ () => handleClick('Entregue') }
                >
                  Marcar como entregue
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  data-testid="mark-as-prepared-btn"
                  onClick={ () => handleClick('Preparando') }
                  disabled={ buttonPrepared }
                >
                  Preparar pedido
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
