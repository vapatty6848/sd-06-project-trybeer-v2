import React, { useEffect, useState } from 'react';
import api from '../../../axios';
import CartButton from './CartButton';
import ProductCard from './ProductCard';

function Gallery() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get('/products').then((response) => {
      const { data } = response;
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col space-y-2">
      { !loading && (
        <div className="grid md:grid-cols-4 gap-4 align-baseline">
          { products.map((product, index) => (
            <ProductCard index={ index } product={ product } key={ index } />
          ))}
        </div>
      )}
      { loading && <span>Waiting data</span> }
      <CartButton />
    </div>
  );
}

export default Gallery;
