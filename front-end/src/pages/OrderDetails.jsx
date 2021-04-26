import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import api from '../services/api';
import MenuTop from '../components/MenuTop';
import '../styles/orderDetails.css';

export default function OrderDetails() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [productsOfSale, setProductsOfSale] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formatedDate, setFormatedDate] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return <Redirect to="/login" />;

    api.fetchSaleProduct(id).then((response) => {
      setProductsOfSale(response);
      setProducts(response.products);

      response.products.reduce((acc, product) => {
        let total = 0;
        total = acc + product.salesProducts.quantity * product.price;
        setTotalPrice(total);
        console.log(total);
        return total;
      }, 0);

      const seventeen = -17; const five = 5; const eigth = 8; const fourteen = -14;
      const date = response.saleDate;
      const month = date.slice(five, seventeen);
      const day = date.slice(eigth, fourteen);
      const formatDate = `${day}/${month}`;
      setFormatedDate(formatDate);
    });
  }, [id]);

  return !productsOfSale ? <p>Carregando...</p> : (
    <div>
      <div>
        <MenuTop title="Detalhes de Pedido" />
      </div>
      <div className="en-title">
        <h2 data-testid="order-number">{ `Pedido ${id}` }</h2>
        <h2 data-testid="order-date">
          {productsOfSale.length !== 0 && formatedDate}
        </h2>
        <h2>{productsOfSale.status}</h2>
      </div>
      <div className="main-container">
        {products.map((produto, index) => (
          <div className="cada-compra" key={ produto.id }>
            <div className="compra">
              <div data-testid={ `${index}-product-qtd` }>{produto.quantity}</div>
              <div data-testid={ `${index}-product-name` }>{produto.name}</div>
              <div data-testid={ `${index}-product-total-value` }>
                {(produto.price * produto.salesProducts.quantity)
                  .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 data-testid="order-total-value" className="total-price">
        { totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
      </h2>
    </div>
  );
}
