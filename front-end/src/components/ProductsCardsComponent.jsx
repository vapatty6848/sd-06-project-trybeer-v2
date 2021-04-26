import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import BeersAppContext from '../context/BeersAppContext';
import formatPrice from '../service/formatPrice';
import '../style/ProductCard.css';

function ProductsCardsComponent({ element, index }) {
  const {
    productQuantity,
    setProductQuantity,
    amount,
    setAmount,
  } = useContext(BeersAppContext);

  const { name, urlImage, price, id } = element;

  const storageInitialState = () => {
    const objQuantity = productQuantity
      .find((objStoraged) => objStoraged.id === id);
    if (objQuantity) return objQuantity.qnt;
    return 0;
  };

  const [qnt, setQnt] = useState(storageInitialState());

  useEffect(() => {
    const ola = productQuantity
      .filter((objStoraged) => objStoraged.id !== id);
    if (qnt !== 0) setProductQuantity([...ola, { id, qnt }]);
    else setProductQuantity(ola);
  }, [qnt]);

  const clickPlus = () => {
    setQnt(qnt + 1);
    const priceTotal = parseFloat(amount) + parseFloat(price);
    setAmount(Number(priceTotal.toFixed(2)));
  };

  const clickMinus = () => {
    if (qnt > 0) {
      setQnt(qnt - 1);
      const priceTotal = parseFloat(amount) - parseFloat(price);
      setAmount(Number(priceTotal.toFixed(2)));
    }
  };

  return (
    <div className="productCards">
      <img
        src={ urlImage }
        data-testid={ `${index}-product-img` }
        alt="beer"
      />
      <div className="productCards_title">
        <h3
          className="txt-productCards"
          data-testid={ `${index}-product-price` }
        >
          { `R$ ${formatPrice(price)}` }
        </h3>
        <p data-testid={ `${index}-product-name` }>{ name }</p>
      </div>
      <div className="productCards-qtt">
        <button
          type="button"
          data-testid={ `${index}-product-minus` }
          onClick={ clickMinus }
        >
          -
        </button>
        <p data-testid={ `${index}-product-qtd` }>{ qnt }</p>
        <button
          type="button"
          data-testid={ `${index}-product-plus` }
          onClick={ clickPlus }
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductsCardsComponent.propTypes = {
  element: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    id: PropTypes.number,
    urlImage: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ProductsCardsComponent;
