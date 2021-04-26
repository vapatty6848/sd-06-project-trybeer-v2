import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { concludeOrder, tokenExists } from '../../services/index';
import '../../css/CheckoutButton.css';

function CheckoutButton(props) {
  const history = useHistory();
  const { total, address, items } = props;
  const [activeBtn, setActiveBtn] = useState(false);
  const [activeText, setActiveText] = useState(false);
  const [showSucessMessage, setShowSucessMessage] = useState(true);

  useEffect(() => {
    if (parseInt(total, 10) > 0 && address.address !== '' && address.number !== '') {
      setActiveBtn(true);
    } else setActiveBtn(false);
    if (parseInt(total, 10) > 0) {
      setActiveText(true);
    } else setActiveText(false);
  }, [total, address]);

  useEffect(() => {
    const TIMEOUT_DURATION = 2000;

    setTimeout(() => {
      setShowSucessMessage(true);

      if (!showSucessMessage) {
        history.push('/products');
      }
    }, TIMEOUT_DURATION);
  }, [history, showSucessMessage]);

  useEffect(() => {
    tokenExists(history);
  }, [history]);

  return (
    <div>
      <button
        data-testid="checkout-finish-btn"
        className="checkout-finish-button"
        type="button"
        disabled={ !activeBtn }
        onClick={ () => concludeOrder(total, address, setShowSucessMessage, items) }
      >
        Finalizar Pedido
      </button>
      <p hidden={ activeText }>Não há produtos no carrinho</p>
      <p hidden={ showSucessMessage }>Compra realizada com sucesso!</p>
    </div>
  );
}

CheckoutButton.propTypes = {
  total: PropTypes.number.isRequired,
  address: PropTypes.objectOf(PropTypes.string).isRequired,
  items: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default CheckoutButton;
