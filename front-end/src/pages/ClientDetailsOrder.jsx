import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BeerContext from '../context/BeerContext';
import ControllerHeader from '../components/Header-SideBar/ControllerHeader';
import CardClientDetailsOrder from '../components/ClientDetailsOrder/CardClientOrder';
import { tokenExists } from '../services/index';
import '../css/ClientDetailsOrder.css';

function ClientDetailsOrder() {
  const history = useHistory();
  const {
    productsOrder,
    saleIdOrder,
    dateOrder,
    totalPriceOrder,
  } = useContext(BeerContext);
  const [products, setProducts] = useState(false);

  useEffect(() => {
    tokenExists(history);
    setProducts(productsOrder);
  }, [productsOrder, history]);

  return (
    <div>
      <ControllerHeader />
      <section className="order-card-container">
        <p
          data-testid="order-number"
          className="larger-text"
        >
          {`Pedido ${saleIdOrder}`}
        </p>
        <section className="client-card-list">
          { products && products
            .map((obj, index) => (
              <CardClientDetailsOrder key={ index } product={ obj } index={ index } />
            ))}
        </section>
        <p data-testid="order-date">{`Data: ${dateOrder}`}</p>
        <p data-testid="order-total-value">{`Total: R$ ${totalPriceOrder}`}</p>
      </section>
    </div>
  );
}

export default ClientDetailsOrder;
