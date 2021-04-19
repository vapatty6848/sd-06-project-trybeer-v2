import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { getProducts } from '../../services/Products';
import DrinkCard from '../../components/DrinkCard/DrinkCard';
import { verifyUser } from '../../store/LocalStorage/actions';
import { getFullCartPrice, getCart } from '../../store/LocalStorage/provider';

// O botão 'Ver Carrinho' deverá conter a tag data-testid="checkout-bottom-btn"

// O valor total do carrinho deverá conter a tag data-testid="checkout-bottom-btn-value"

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cartSum, setCartSum] = useState(getFullCartPrice());

  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      verifyUser(history);
      const allProducts = await getProducts();
      setProducts(allProducts);
    };
    fetchProducts();
  }, [history]);

  const handleRedirect = () => {
    // history.push('/checkout'); !!!Adicionei passar a soma total como props
    history.push({
      pathname: '/checkout',
      state: { sum: cartSum },
    });
  };

  return (
    <div>
      <Header title="TryBeer" user="client" />
      {products.map((product, index) => (
        <DrinkCard
          product={ product }
          key={ product.id }
          index={ index }
          setCartSum={ setCartSum }
        />
      ))}
      <button
        data-testid="checkout-bottom-btn"
        onClick={ handleRedirect }
        type="button"
        disabled={ !getCart() || !getCart().length }
      >
        Ver Carrinho
        <p data-testid="checkout-bottom-btn-value">
          {cartSum || 'R$ 0,00'}
        </p>
      </button>
    </div>
  );
}
