import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import { TotalPrice } from '../services';
import { MenuTop, ProductCard } from '../components';

export default function Products({ history }) {
  const { cart, isFetching, allProducts, validateToken,
    getAllProducts, setTotalValue } = useContext(Context);
  const [disable, setDisable] = useState(true);

  const allPrices = cart.map((element) => element.totalPrice);
  const totalSum = TotalPrice(allPrices);

  useEffect(() => {
    validateToken(history);
    getAllProducts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTotalValue(totalSum);
    if (totalSum > 0) return setDisable(false);
    if (totalSum === 0) return setDisable(true);
    // eslint-disable-next-line
  }, [totalSum]);

  return (
    <div className="products-main-div">
      <MenuTop title="TryBeer" />
      <div
        className="d-flex flex-column align-items-center flex-sm-wrap pb-5"
      >
        {isFetching
          ? <h2>Loading</h2>
          : allProducts.map((product, index) => (
            <ProductCard
              indexId={ index }
              key={ index }
              price={ product.price }
              name={ product.name }
              img={ product.url_image }
              id={ product.id }
            />
          ))}
      </div>
      <div className="w-50 p-1 fixed-bottom text-center mx-auto">
        <button
          onClick={ () => history.push('/checkout') }
          type="button"
          disabled={ disable }
          data-testid="checkout-bottom-btn"
          className="w-100 p-1 border-0 text-light bg-success rounded"
        >
          <p
            data-testid="checkout-bottom-btn-value"
            className="font-weight-bold text-monospace my-1"
          >
            {`Ver Carrinho R$ ${totalSum.toFixed(2).replace('.', ',')}`}
          </p>
        </button>
      </div>
    </div>
  );
}

Products.defaultProps = {
  history: '/products',
};

Products.propTypes = {
  history: propTypes.shape(),
};
