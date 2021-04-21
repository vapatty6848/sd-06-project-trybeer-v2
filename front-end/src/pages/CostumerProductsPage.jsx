import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { HeaderComponent, ProductsCardsComponent } from '../components';
import formatPrice from '../service/formatPrice';
import BeersAppContext from '../context/BeersAppContext';

import '../style/CostumerProducts.css';

function CostumerProductsPage() {
  const history = useHistory();
  const {
    user: { token },
    amount,
  } = useContext(BeersAppContext);

  if (!token) history.push('/login');

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = '/products';
    fetch(
      `http://localhost:3001${url}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      },
    ).then((response) => response.json()
      .then((data) => {
        setProducts(data);
      }));
  }, []);

  const clickRedirect = () => history.push('/checkout');

  return (
    <div className="product-page">
      <HeaderComponent text="TryBeer" id="top-title" />
      <div className="product-list">
        {products.map((element, index) => (
          <div key={ element.id }>
            <ProductsCardsComponent
              element={ element }
              index={ index }
            />
          </div>
        ))}
      </div>
      <div>
        <button
          type="button"
          onClick={ clickRedirect }
          data-testid="checkout-bottom-btn"
          disabled={ Math.trunc(amount * 100) === 0 }
          className="product-bottom"
        >
          Ver Carrinho
          {' '}
          <span
            data-testid="checkout-bottom-btn-value"
            className="value-product"
          >
            { `R$ ${formatPrice(amount)}` }
          </span>
        </button>
      </div>
    </div>
  );
}

export default CostumerProductsPage;
