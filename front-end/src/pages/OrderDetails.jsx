import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import api from '../services/api';
import MenuTop from '../components/MenuTop';
import '../styles/orderDetails.css';

export default function OrderDetails() {
  const { id } = useParams();
  const [productsOfSale, setProductsOfSale] = useState({});
  console.log(productsOfSale);
  const fetchApiProductOfSale = async (idFetch) => {
    const productDetails = await api.fetchSaleProduct(idFetch);
    console.log(productDetails);
    console.log(idFetch);
    setProductsOfSale(productDetails);
  };

  useEffect(() => {
    console.log('cheguei no fetch')
    fetchApiProductOfSale(id);
  }, [id]);

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Redirect to="/login" />;

  const seventeen = -17;
  const five = 5;
  const eigth = 8;
  const fourteen = -14;

  const formatDate = (date) => {
    const month = date.slice(five, seventeen);
    const day = date.slice(eigth, fourteen);
    return `${day}/${month}`;
  };

  const sumOfCart = (sum, product) => sum + product.salesProducts.quantity * product.price;

  return (
    <div>
      <div>
        <MenuTop title="Detalhes de Pedido" />
      </div>
      <div className="en-title">
        <h2 data-testid="order-number">{ `Pedido ${id}` }</h2>
        <h2 data-testid="order-date">
          {productsOfSale.length !== 0 && formatDate(productsOfSale.saleDate)}
        </h2>
      </div>
      <div className="main-container">
        {productsOfSale && productsOfSale.products.map((produto, index) => (
          <div className="cada-compra" key={ produto.id }>
            <div className="compra">
              <div data-testid={ `${index}-product-qtd` }>{produto.salesProducts.quantity}</div>
              <div data-testid={ `${index}-product-name` }>{produto.name}</div>
              <div data-testid={ `${index}-product-total-value` }>
                {(produto.price * produto.salesProducts.quantity).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 data-testid="order-total-value" className="total-price">
        {productsOfSale.products
          .reduce(sumOfCart, 0)
          .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </h2>
    </div>
  );
}
