import React, { useEffect, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TopMenu, ProductCard, Cart } from '../components';
import TrybeerContext from '../context/TrybeerContext';
import { verifyToken } from '../utils/verifications';
import './Products.scss';

function Products({ history }) {
  const [products, setProducts] = useState([]);
  const { user } = useContext(TrybeerContext);

  const fetchProducts = useCallback(async () => {
    const allProducts = await verifyToken('products', user, history);
    setProducts(allProducts);
  }, [user, history]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <TopMenu />
      <div className="products-container">
        {products && products.length > 0 && products
          .map(({ id, name, price, urlImage }, index) => (
            <ProductCard
              id={ id }
              key={ index }
              name={ name }
              price={ price }
              url_image={ urlImage }
              index={ index }
            />
          ))}
      </div>
      <Cart />
    </div>
  );
}

Products.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Products;
