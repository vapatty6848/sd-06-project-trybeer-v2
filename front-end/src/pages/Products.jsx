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

  useEffect(() => {
    async function fetchProducts() {
      const user = JSON.parse(localStorage.user);
      api.getAllProducts(user.token).then((response) => {
        if (response.message) return history.push('/login');
        setProducts(response);
      });
    }
    fetchProducts();
  }, [history]);

  return (
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
  );
}

Products.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default Products;
