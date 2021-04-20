import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import Card from '../components/Card';
import MenuTop from '../components/MenuTop';
import getAllProducts from '../services/productsServices';
import context from '../context/Context';

function Products() {
  const [products, setProducts] = useState([]);
  const { totalCart, setTotalCart } = useContext(context);
  const [btnDisable, setBtnDisable] = useState(true);
  const history = useHistory();

  const findAllProducts = async () => {
    const allProducts = await getAllProducts();
    setProducts(allProducts);
  };

  const auxFunc = async () => {
    const storageUser = JSON.parse(localStorage.getItem('user'));

    if (!storageUser) {
      history.push('/login');
    }
  };

  useEffect(() => {
    const storageTotalCart = parseFloat(localStorage.getItem('totalCart'));
    if (storageTotalCart) {
      setTotalCart(storageTotalCart);
    }
    findAllProducts();
    auxFunc();
    if (!localStorage.getItem('cart')) localStorage.setItem('cart', '[]');
    console.log(localStorage.getItem('cart'));
  }, []);

  useEffect(() => {
    if (totalCart !== 0) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
    localStorage.setItem('totalCart', totalCart.toFixed(2));
  }, [totalCart]);

  return (
    <div className="product-page">
      <MenuTop title="TryBeer" />
      <div className="card-container">
        { products.map((product, index) => (
          <Card
            id={ product.id }
            key={ index }
            index={ index }
            name={ product.name }
            urlImage={ product.urlImage }
            price={ product.price }
          />)) }
      </div>
      <button
        className="checkout-btn-bottom btn-success"
        type="button"
        data-testid="checkout-bottom-btn"
        disabled={ btnDisable }
        onClick={ () => history.push('/checkout') }
      >
        Ver Carrinho
        <p className="checkout-price" data-testid="checkout-bottom-btn-value">
          {`R$ ${totalCart.toFixed(2).replace('.', ',')}`}
        </p>
      </button>
    </div>
  );
}

export default Products;
