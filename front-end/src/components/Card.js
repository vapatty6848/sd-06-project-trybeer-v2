import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import context from '../context/Context';

function Card(props) {
  const [quantity, setQuantity] = useState(0);
  const { totalCart, setTotalCart } = useContext(context);
  const { id, index, name, price, urlImage } = props;
  const fixedUrl = urlImage.replace('images/', '');

  const MINUSONE = -1;

  const handleQuantity = () => {
    const productLocal = JSON.parse(localStorage.getItem('cart'));
    if (productLocal) {
      const prodIndex = productLocal.findIndex((prod) => prod.name === name);
      if (prodIndex !== MINUSONE) {
        setQuantity(productLocal[prodIndex].quantity);
      }
    }
  };

  useEffect(() => {
    handleQuantity();
  }, []);

  const handleLocalStorage = (qtd) => {
    const productLocal = JSON.parse(localStorage.getItem('cart'));
    const prodIndex = productLocal.findIndex((prod) => prod.name === name);
    if (prodIndex !== MINUSONE && qtd !== 0) {
      productLocal[prodIndex].quantity = qtd;
      localStorage.setItem('cart', JSON.stringify(productLocal));
    } else if (prodIndex !== MINUSONE && qtd === 0) {
      productLocal.splice(prodIndex, 1);
      localStorage.setItem('cart', JSON.stringify(productLocal));
    } else {
      const obj = { id, name, quantity: qtd, price };
      productLocal.push(obj);
      localStorage.setItem('cart', JSON.stringify(productLocal));
    }
  };

  const handleClickPlus = async () => {
    await setQuantity(quantity + 1);
    await setTotalCart(totalCart + parseFloat(price));
    handleLocalStorage(quantity + 1);
  };

  const handleClickMinus = async () => {
    if (quantity > 0) {
      await setQuantity(quantity - 1);
      await setTotalCart(totalCart - parseFloat(price));
      handleLocalStorage(quantity - 1);
    }
  };

  return (
    <div className="card">
      <p
        className="btn-success price-card"
        data-testid={ `${index}-product-price` }
      >
        {`R$ ${price.replace('.', ',')}`}
      </p>
      <img
        width="111px"
        data-testid={ `${index}-product-img` }
        src={ fixedUrl }
        alt="product"
      />
      <h4
        className="product-name-size"
        data-testid={ `${index}-product-name` }
      >
        { name }
      </h4>
      <div className="button-value-card">
        <button
          className="btn-success btn-card"
          type="button"
          onClick={ handleClickMinus }
          data-testid={ `${index}-product-minus` }
        >
          -
        </button>
        <span
          className="quantity-card"
          data-testid={ `${index}-product-qtd` }
        >
          { quantity }
        </span>
        <button
          className="btn-success btn-card"
          type="button"
          onClick={ handleClickPlus }
          data-testid={ `${index}-product-plus` }
        >
          +
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
};

export default Card;
