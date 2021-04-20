import React, { useContext, useEffect } from 'react';

import ProductsContext from '../../context/ProductsContext';
import CartContext from '../../context/CartContext';
import ProductCard from './ProductCard';

const ProductsList = () => {
  const { products } = useContext(ProductsContext);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    const storage = JSON.stringify(cart);
    localStorage.cart = storage;
  }, [cart]);

  const plusItemCart = (product) => {
    const currentProduct = cart.find((item) => item.id === product.id) || {
      ...product,
      quantity: 0,
    };

    currentProduct.quantity += 1;

    setCart([...cart]);

    const productIndex = cart.findIndex((item) => item.id === product.id);

    if (!cart[productIndex]) setCart([...cart, currentProduct]);
  };

  const minusItemCart = (product) => {
    const currentProduct = cart.find((item) => item.id === product.id) || {
      ...product,
      quantity: 0,
    };

    if (currentProduct.quantity > 0) {
      const productIndex = cart.findIndex((item) => item.id === product.id);
      cart[productIndex].quantity -= 1;
      setCart([...cart]);
    }

    setCart(cart.filter((item) => item.quantity > 0));
  };

  const handleQuantity = (product) => {
    const currentProduct = cart.find((item) => item.id === product.id) || {
      ...product,
      quantity: 0,
    };

    return currentProduct.quantity;
  };

  return products.map((product, index) => (
    <ProductCard
      key={ index }
      index={ index }
      product={ product }
      plusItemCart={ plusItemCart }
      minusItemCart={ minusItemCart }
      handleQuantity={ handleQuantity }
    />
  ));
};

export default ProductsList;
