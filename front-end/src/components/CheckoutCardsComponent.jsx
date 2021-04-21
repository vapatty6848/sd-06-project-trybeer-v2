import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import BeersAppContext from '../context/BeersAppContext';
import formatPrice from '../service/formatPrice';
import '../style/CheckoutCard.css';

function CheckoutCardsComponent({ element, index }) {
  const {
    user: { token },
    productQuantity,
    setProductQuantity,
    setAmount,
    amount,
  } = useContext(BeersAppContext);

  const { id, qnt } = element;

  const [products, setProducts] = useState({});

  useEffect(() => {
    const url = `/products/${id}`;
    fetch(
      `http://localhost:3001${url}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      },
    ).then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const totalProductPrice = (parseFloat(qnt) * parseFloat(products.price))
    .toFixed(2);

  const deleteItem = () => {
    const productQuantityObjectRemoved = productQuantity
      .filter((objQuantity) => {
        if (objQuantity.id === id) {
          const priceTotal = parseFloat(amount) - parseFloat(totalProductPrice);
          setAmount(Number(priceTotal.toFixed(2)));
          return false;
        }
        return true;
      });
    setProductQuantity(productQuantityObjectRemoved);
  };

  return (
    <div className="checkout_card">
      <p data-testid={ `${index}-product-qtd-input` }>{qnt}</p>
      <p data-testid={ `${index}-product-name` }>{products.name}</p>
      <p data-testid={ `${index}-product-total-value` }>
        {`R$ ${formatPrice(totalProductPrice)}`}
      </p>
      <p data-testid={ `${index}-product-unit-price` }>
        {`(R$ ${formatPrice(products.price)} un)`}
      </p>
      <button
        type="button"
        data-testid={ `${index}-removal-button` }
        onClick={ deleteItem }
      >
        X
      </button>
    </div>
  );
}

CheckoutCardsComponent.propTypes = {
  index: PropTypes.number.isRequired,
  element: PropTypes.shape({
    id: PropTypes.number.isRequired,
    qnt: PropTypes.number.isRequired,
  }).isRequired,
};

export default CheckoutCardsComponent;
