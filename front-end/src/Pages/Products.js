import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import Context from '../Context/Context';
import MenuTop from '../components/MenuTop';
import ProductCard from '../components/ProductCard';

export default function Products({ history }) {
  const { isFetching, allProducts, getAllProducts, TokenInvalido } = useContext(Context);

  useEffect(() => {
    getAllProducts();
    if (TokenInvalido) {
      history.push('/');
    }
  });

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
    </div>
  );
}

Products.defaultProps = {
  history: '/products',
};

Products.propTypes = {
  history: propTypes.shape(),
};
