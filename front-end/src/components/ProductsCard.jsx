import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './componentsCSS/ProductCard.css';
import productsContext from '../context/productsContext';

export default function ProductsCard() {
  const { products, cartProducts, setCartProducts } = useContext(productsContext);
  const history = useHistory();

  const MINUSONE = -1;
  const ONE = 1;

  // Garante que ao atualizar a página o carrinho do contexto global é populado novamente.
  useEffect(() => {
    const cartLS = JSON.parse(localStorage.getItem('cartProducts'));
    if (!cartLS) return;
    setCartProducts(cartLS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTotalPrice = () => {
    if (cartProducts.length) {
      const totalPrices = cartProducts
        .reduce((accumulator, current) => accumulator + current.subTotal, 0);

      return (totalPrices.toFixed(2)).replace('.', ',');
    }
    return '0,00';
  };

  const isCartWithoutProducts = () => {
    if (cartProducts.length) {
      return false;
    }
    return true;
  };

  const showQuantity = (index) => {
    if (cartProducts.length > 0) {
      const productExists = cartProducts
        .find((product) => Number(product.id) === Number(index));
      if (productExists) {
        return productExists.quantityItem;
      }
    }
    return 0;
  };

  const handleChangeQuantityButton = (event, unity) => {
    const productId = event.target.id;
    const productExists = cartProducts
      .find((product) => parseInt(product.id, 10) === parseInt(productId, 10));

    if (cartProducts.length && productExists) {
      return setCartProducts([...cartProducts.map((product) => {
        if (product.id !== Number(productId)) {
          return product;
        }
        product.quantityItem += unity;
        if (product.quantityItem <= 0) {
          product.quantityItem = 0;
        }
        product.subTotal = Number(product.quantityItem * product.price);
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        return product;
      })]);
    }
    const newCartProduct = [...cartProducts, {
      id: parseInt(productId, 10),
      name: products[productId].name,
      price: products[productId].price,
      url: products[productId].url_image,
      quantityItem: unity > 0 ? unity : unity = 0,
      subTotal: Number(products[productId].price),
    }];
    setCartProducts(newCartProduct);
    localStorage.setItem('cartProducts', JSON.stringify(newCartProduct));
  };

  return (
    <div className="products-container">
      { products.length && products.map((product, index) => (
        <div
          className="product-card"
          key={ product.id }
        >
          <div className="card-body">
            <p data-testid={ `${index}-product-price` }>
              { `R$ ${(product.price).replace('.', ',')}` }
            </p>
            <img
              data-testid={ `${index}-product-img` }
              src={ product.url_image }
              alt="Imagem do produto"
              width="50px"
            />
            <h5 className="card-title" data-testid={ `${index}-product-name` }>
              { product.name }
            </h5>
            <div className="quantity-control">
              <button
                className="button"
                type="button"
                data-testid={ `${index}-product-plus` }
                onClick={ (e) => handleChangeQuantityButton(e, ONE) }
                value="Plus"
                id={ index }
              >
                +
              </button>
              <span
                data-testid={ `${index}-product-qtd` }
              >
                { showQuantity(index) }
              </span>
              <button
                className="button"
                type="button"
                data-testid={ `${index}-product-minus` }
                onClick={ (e) => handleChangeQuantityButton(e, MINUSONE) }
                value="Minus"
                id={ index }
              >
                -
              </button>
            </div>
          </div>
        </div>))}
      <div>
        <button
          className="btn btn-primary"
          type="button"
          data-testid="checkout-bottom-btn"
          disabled={ isCartWithoutProducts() }
          onClick={ () => { history.push('/checkout'); } }
        >
          Ver Carrinho
        </button>
        <span data-testid="checkout-bottom-btn-value">
          { `R$ ${handleTotalPrice()}` }
        </span>
      </div>
    </div>
  );
}
