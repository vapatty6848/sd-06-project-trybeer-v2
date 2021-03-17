import React, { useContext, useEffect } from 'react';
import Context from '../Context/Context';
import MenuTop from '../components/MenuTop';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const { isFetching, setIsFetching, allProducts, getAllProducts } = useContext(Context);

  useEffect(() => {
    setIsFetching(true);
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              qtd="5"
              img={ product.url_image }
            />
          ))}
      </div>
    </div>
  );
}
