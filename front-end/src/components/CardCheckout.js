import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
// import Context from '../Context/Context';

function CardCheckout({ indexId, price, name, qtd, onClick }) {
  const [totalPrice, setTotalPrice] = useState(0);

  const changedPrice = price.replace('.', ',');

  useEffect(() => {
    const sumPrices = () => {
      const result = Number(price) * Number(qtd);
      setTotalPrice(result);
    };
    sumPrices();
  }, [price, qtd]);

  return (
    <div>
      <div>
        <p data-testid={ `${indexId}-product-name` }>{name}</p>
        <p data-testid={ `${indexId}-product-qtd-input` }>{qtd}</p>
        <p data-testid={ `${indexId}-product-unit-price` }>{`(R$ ${changedPrice} un)`}</p>
        <p data-testid={ `${indexId}-product-total-value` }>
          {totalPrice.toFixed(2).replace('.', ',')}
        </p>
        <button
          data-testid={ `${indexId}-removal-button` }
          type="button"
          onClick={ onClick }
        >
          X
        </button>
      </div>
    </div>
  );
}

CardCheckout.propTypes = {
  indexId: propTypes.number.isRequired,
  price: propTypes.string.isRequired,
  qtd: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};

export default CardCheckout;
