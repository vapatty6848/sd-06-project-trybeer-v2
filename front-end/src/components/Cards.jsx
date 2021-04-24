import React, { useContext, useEffect, useState } from 'react';
import contextTrybeer from '../Context/ContextAPI';
import api from '../services/api';
import '../styles/cards.css';

export default function Cards() {
  const [products, setProducts] = useState([]);
  const { setProductsCart } = useContext(contextTrybeer);
  const productsCart = JSON.parse(localStorage.getItem('productsCart'));

  const featchApiProduct = async () => {
    const allProducts = await api.fetchProducts();
    setProducts(allProducts);
  };

  const mapNewProduct = (cart, productFound, product) => (
    cart.map((item) => {
      if (item.id === product.id) {
        return productFound;
      }
      return item;
    })
  );

  const somarQtd = (product) => {
    if (productsCart) {
      if (productsCart.some((item) => item.id === product.id)) {
        let productFound = productsCart.find((item) => item.id === product.id);
        const newQty = productFound.qty + 1;
        productFound = { ...productFound, qty: newQty };
        const newProducts = mapNewProduct(productsCart, productFound, product);

        localStorage.setItem('productsCart', JSON.stringify(newProducts));
        setProductsCart(newProducts);
      } else {
        const productUpdated = { ...product, qty: 1 };
        const newProducts = productsCart.concat(productUpdated);
        localStorage.setItem('productsCart', JSON.stringify(newProducts));
        setProductsCart(newProducts);
      }
    } else {
      const productUpdated = { ...product, qty: 1 };
      const newProducts = [productUpdated];
      localStorage.setItem('productsCart', JSON.stringify(newProducts));
      setProductsCart(newProducts);
    }
  };

  function diminuirQtd(product) {
    if (productsCart && productsCart.some((item) => item.id === product.id)) {
      let productFound = productsCart.find((item) => item.id === product.id);
      if (productFound.qty === 1) {
        const newProduct = productsCart.filter((item) => item.id !== product.id);
        localStorage.setItem('productsCart', JSON.stringify(newProduct));
        setProductsCart(newProduct);
      } else if (productFound.qty > 0) {
        const newQty = productFound.qty - 1;
        productFound = { ...productFound, qty: newQty };
        const newProducts = mapNewProduct(productsCart, productFound, product);
        localStorage.setItem('productsCart', JSON.stringify(newProducts));
        setProductsCart(newProducts);
      }
    }
  }
  const numberTen = 10;

  useEffect(() => {
    featchApiProduct();
  }, []);

  return (
    <div className="main-container">
      {products.map((product, index) => (
        <div key={ product.id } className="card-container">
          <div className="title-container">
            <h4 data-testid={ `${index}-product-name` }>{product.name}</h4>
            <h5
              data-testid={ `${index}-product-price` }
            >
              {Number(product.price)
                .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </h5>
          </div>
          <div className="img-container">
            <img
              data-testid={ `${index}-product-img` }
              src={ product.urlImage }
              alt={ product.name }
            />
          </div>
          <div className="button-container">
            <button
              id={ `${index}-minus` }
              className="btn btn-danger"
              data-testid={ `${index}-product-minus` }
              type="button"
              onClick={ () => diminuirQtd(product) }
            >
              -
            </button>
            <span
              data-testid={ `${index}-product-qtd` }
              id={ index }
              style={ { margin: `${numberTen}px` } }
            >
              {productsCart && productsCart.some((item) => item.id === product.id)
                ? productsCart.find((item) => item.id === product.id).qty : 0}
            </span>
            <button
              id={ `${index}-plus` }
              className="btn btn-danger"
              data-testid={ `${index}-product-plus` }
              type="button"
              onClick={ () => somarQtd(product) }
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
