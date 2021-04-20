import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import context from '../context/Context';

export default function CartItem(props) {
  const {
    index,
    quantity,
    name,
    price,
    setCart,
    unitPriceID,
    qtdID,
    removeButton,
  } = props;
  const { totalCart, setTotalCart } = useContext(context);
  const totalValue = price * quantity;

  const handleLocalStorage = () => {
    const productLocal = JSON.parse(localStorage.getItem('cart'));
    const prodIndex = productLocal.findIndex((prod) => prod.name === name);
    productLocal.splice(prodIndex, 1);
    localStorage.setItem('cart', JSON.stringify(productLocal));
    setCart(productLocal);
    const TOTALCART = totalCart - totalValue;
    setTotalCart(TOTALCART);
    localStorage.setItem('totalCart', JSON.stringify(TOTALCART.toFixed(2)));
  };
  return (
    <div className="checkout-card">
      <p data-testid={ `${index}-${qtdID}` }>{ quantity }</p>
      <p className="product-name" data-testid={ `${index}-product-name` }>{ name }</p>
      <p
        data-testid={ `${index}-product-total-value` }
      >
        { `R$ ${totalValue.toFixed(2).replace('.', ',')}` }
      </p>
      <p
        data-testid={ `${index}-${unitPriceID}` }
      >
        {unitPriceID !== 'order-unit-price'
          ? `(R$ ${price.replace('.', ',')} un)`
          : `(R$ ${price.replace('.', ',')})`}
      </p>
      {removeButton && (
        <button
          className="remove-btn"
          data-testid={ `${index}-removal-button` }
          type="button"
          onClick={ () => handleLocalStorage() }
        >
          X
        </button>
      )}
    </div>
  );
}

CartItem.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  setCart: PropTypes.func.isRequired,
  unitPriceID: PropTypes.number.isRequired,
  qtdID: PropTypes.number.isRequired,
  removeButton: PropTypes.bool.isRequired,
};
