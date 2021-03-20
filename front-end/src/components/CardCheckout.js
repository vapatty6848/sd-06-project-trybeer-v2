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
    <div className="d-flex flex-sm-column justify-content-sm-between mx-5">
      <div className="border border-bottom rounded my-3 shadow-sm btn-group">
        <div
          className="d-flex flex-fill flex-sm-row justify-content-sm-between m-2 btn-group mr-2"
        >
          <p data-testid={ `${indexId}-product-name` }>{name}</p>
          <p data-testid={ `${indexId}-product-qtd-input` }>{qtd}</p>
          <p data-testid={ `${indexId}-product-unit-price` }>
            {`(R$ ${changedPrice} un)`}
          </p>
          <p data-testid={ `${indexId}-product-total-value` }>
            {`R$ ${totalPrice.toFixed(2).replace('.', ',')}`}
          </p>
        </div>
        <button
          data-testid={ `${indexId}-removal-button` }
          type="button"
          onClick={ onClick }
          className="btn btn-danger"
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
