import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router';
import ProductCard from '../components/Products/ProductCard';
import Cart from '../components/Products/Cart';
import TopBar from '../components/SideBarClient/TopBar';
import { getAllProducts } from '../services/api';
import TrybeerContext from '../context/TrybeerContext';

import './Products.css';

function Products() {
  const {
    products, setProducts, cart, setCart,
  } = useContext(TrybeerContext);
  const loggedUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    getAllProducts()
      .then((product) => setProducts(product));

    const localStorageCart = JSON.parse(localStorage.getItem('cart'));
    if (localStorageCart) setCart(localStorageCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    loggedUser
      ? (
        <div className="mainDivProducts">
          <TopBar title="TryBeer" />
          <div className="divFilha">
            { products.map((product, index) => {
              const { id, name, price, urlImage } = product;
              return (
                <div className="divCards" key={ index }>
                  <ProductCard
                    key={ id }
                    name={ name }
                    price={ price }
                    urlImage={ urlImage }
                    index={ index }
                  />
                </div>
              );
            }) }
          </div>
          <Cart />
        </div>
      )
      : (
        <Redirect to="/login" />
      )
  );
}

export default Products;
