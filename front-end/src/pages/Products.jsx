import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ProductsList from '../components/products/ProductsList';
import CheckoutCart from '../components/checkout/CheckoutCart';
import MenuTop from '../components/menuClient/MenuTop';

import ProductsContext from '../context/ProductsContext';
import CartContext from '../context/CartContext';
import '../css/products.css';
import api from '../services/api';

function Products({ history }) {
  const initialCart = JSON.parse(localStorage.cart || []);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(initialCart);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.user);
    api.getAllProducts(user.token).then((response) => {
      if (response.message) history.push('/login');
      else {
        setProducts(response);
        setIsLoading(true);
      }
    });
  }, [history]);

  return (
    isLoading
      ? (
        <ProductsContext.Provider value={ { products } }>
          <CartContext.Provider value={ { cart, setCart, history } }>
            <MenuTop name="TryBeer" />
            <div className="main-content-prod">
              <div className="coluna-left" />
              <div className="coluna-rigth" />

              <div className="movie-list">
                <ProductsList />
              </div>
            </div>
            <CheckoutCart />
          </CartContext.Provider>
        </ProductsContext.Provider>
      ) : true
  );
}

Products.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default Products;
