import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { TopMenu, ProductCard, Cart } from '../components';
import TrybeerContext from '../context/TrybeerContext';
import { verifyToken } from '../utils/verifications';

function Products({ history }) {
  const [products, setProducts] = useState([]);
  const { user } = useContext(TrybeerContext);

  const fetchProducts = async () => {
    const allProducts = await verifyToken('products', user, history);
    setProducts(allProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <TopMenu />
      <div className="products-container">
        {products && products.map(({ id, name, price, url_image: urlImage }, index) => (
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
