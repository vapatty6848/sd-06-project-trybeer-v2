import React, { useContext, useEffect } from 'react';
import productsContext from '../context/productsContext';
import './componentsCSS/Checkout.css';

export default function CheckoutProductsCard() {
  const { cartProducts, setCartProducts } = useContext(productsContext);

  useEffect(() => {
    const cartLS = JSON.parse(localStorage.getItem('cartProducts'));
    if (!cartLS) return;
    setCartProducts(cartLS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeProductFromCart = (event) => {
    const productId = event.target.id;

    cartProducts.splice(productId, 1);
    const newCartProduct = cartProducts;
    localStorage.setItem('cartProducts', JSON.stringify(newCartProduct));
    window.location.reload();
  };

  return (

    <div className="cart-products-container">
      { !cartProducts.length
        ? <h1>Não há produtos no carrinho</h1>
        : cartProducts.length && cartProducts.map((product, index) => (
          <div
            className="cart-products"
            key={ product.id }
          >
            <p data-testid={ `${index}-product-qtd-input` }>
              { product.quantityItem }
            </p>
            <h5 data-testid={ `${index}-product-name` }>
              { product.name }
            </h5>
            <span
              data-testid={ `${index}-product-total-value` }
            >
              { `R$ ${String((product.subTotal).toFixed(2)).replace('.', ',')}` }
            </span>
            <span data-testid={ `${index}-product-unit-price` }>
              { `(R$ ${(product.price).replace('.', ',')} un)` }
            </span>
            <button
              data-testid={ `${index}-removal-button` }
              type="submit"
              onClick={ (event) => removeProductFromCart(event) }
              id={ index }
            >
              X
            </button>
          </div>
        )) }
    </div>
  );
}
