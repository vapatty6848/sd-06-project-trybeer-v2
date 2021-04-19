import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../css/ShowCart.css';

export default function ShowCart(props) {
  const [activeBtn, setActiveBtn] = useState(false);
  const { total } = props;

  useEffect(() => {
    if (total === '0.00' || !total) {
      setActiveBtn(false);
    } else {
      setActiveBtn(true);
    }
  }, [total]);

  return (
    <div>
      <Link to="/checkout">
        <button
          className="checkout-button"
          data-testid="checkout-bottom-btn"
          type="button"
          disabled={ !activeBtn }
        >
          Ver Carrinho
          <span data-testid="checkout-bottom-btn-value">
            {
              total
                ? ` R$ ${total.toString().replace('.', ',')}`
                : ' R$ 0,00'
            }
          </span>
        </button>
      </Link>
    </div>
  );
}

ShowCart.propTypes = {
  total: PropTypes.number.isRequired,
};
