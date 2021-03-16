import React, { useContext, useEffect } from 'react';
import Context from '../Context/Context';
import MenuTop from '../components/MenuTop';
import ProductCard from '../components/ProductCard';
import productsFetch from '../services/ProductsService';

export default function Products() {
  const { isFetching, setIsFetching, allProducts, setAllProducts } = useContext(Context);

  async function getAllProducts() {
    const products = await productsFetch();
    setIsFetching(true);
    setAllProducts(products);
    console.log(products);
    console.log(allProducts[0].url_image);
    setIsFetching(false);
  }

  useEffect(() => {
    setIsFetching(true);
    getAllProducts();
  }, []);

  return (
    <div>
      <MenuTop title="TryBeer" />
      <div>
        {isFetching
          ? <h2>Loading</h2>
          : allProducts.map((product, index) => (
            index > 0 ? <ProductCard
              indexId={ index }
              key={ index }
              price={ product.price }
              name={ product.name }
              qtd="5"
              img={ product.url_image }
            />
              : null
          ))}
      </div>
    </div>
  );
}
