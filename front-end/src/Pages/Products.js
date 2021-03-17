import React, { useContext, useEffect } from 'react';
import Context from '../Context/Context';
import MenuTop from '../components/MenuTop';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const { isFetching, allProducts, getAllProducts } = useContext(Context);

  useEffect(() => {
    // setIsFetching(true);
    getAllProducts();
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
