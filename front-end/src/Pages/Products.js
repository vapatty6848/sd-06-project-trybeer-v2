import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import MenuTop from '../components/MenuTop';
import ProductCard from '../components/ProductCard';
import { sumTotal } from '../services/TotalPrice';

export default function Products({ history }) {
  const {
    cart,
    isFetching,
    allProducts,
    getAllProducts,
    tokenInvalid,
    setTotalPrice,
  } = useContext(Context);
  const [disable, setDisable] = useState(true);

  const totalSum = sumTotal(cart.map((element) => element.price));

  useEffect(() => {
    getAllProducts();
    if (tokenInvalid) {
      history.push('/');
    }
  });

  useEffect(() => {
    setTotalPrice(totalSum);
    if (totalSum > 0) return setDisable(false);
    if (totalSum === '0,00') return setDisable(true);
  }, [totalSum]);

  return (
    <div>
      <MenuTop title="TryBeer" />
      <div className="d-flex justify-content-sm-around flex-sm-wrap">
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
      <div>
        <button
          onClick={ () => history.push('/checkout') }
          type="button"
          disabled={ disable }
        >
          {`Ver Carrinho R$ ${totalSum}`}
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
